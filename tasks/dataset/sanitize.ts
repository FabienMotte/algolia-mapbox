import csv from 'csvtojson'
import { promises as fs } from 'fs'

interface SanitizeOptions {
  inputCsvPath: string
  inputJsonPath: string
  outputPath: string
}

const csvToJson = (path: string) => {
  return csv({
    delimiter: 'auto',
    colParser: {
      objectID: 'number',
      reviews_count: 'number',
      stars_count: 'number',
    },
  }).fromFile(path)
}

const mergeObjectsByKey = (array1: any[], array2: any[], key: string) => {
  return array1.map((a) => ({
    ...a,
    ...array2.find((b) => b[key] === a[key]),
  }))
}

const updateObjectsKey = (objects: any, key: string, cb: () => any) => {
  objects.forEach((object: any) => {
    object[key] = cb()
  })
}

const deleteObjectsKeys = (objects: any[], keys: string[]) => {
  objects.forEach((object) => {
    keys.forEach((key) => delete object[key])
  })
}

const sanitize = async ({
  inputCsvPath,
  inputJsonPath,
  outputPath,
}: SanitizeOptions) => {
  const inputCsvToJsonData = await csvToJson(inputCsvPath)
  const inputJsonBuffer = await fs.readFile(inputJsonPath, 'utf8')
  const inputJsonData = JSON.parse(inputJsonBuffer)

  const objects = mergeObjectsByKey(
    inputCsvToJsonData,
    inputJsonData,
    'objectID',
  )

  deleteObjectsKeys(objects, [
    'mobile_reserve_url',
    'phone',
    'postal_code',
    'state',
    'country',
    'phone_number',
    'neighborhood',
    'price',
  ])

  updateObjectsKey(
    objects,
    'image_url',
    () => `https://source.unsplash.com/500x500/?restaurant${Math.random()}`,
  )

  await fs.writeFile(outputPath, JSON.stringify(objects, null, 2), 'utf8')

  console.log('Dataset sanitized')

  return objects
}

export default sanitize
