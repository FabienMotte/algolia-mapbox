import { resolve } from 'path'

import sanitize from './sanitize'
import upload from './upload'

const p = async () => {
  const inputPath = resolve(__dirname, 'input')
  const outputPath = resolve(__dirname, 'output')

  const objects = await sanitize({
    inputCsvPath: resolve(inputPath, 'restaurants.csv'),
    inputJsonPath: resolve(inputPath, 'restaurants.json'),
    outputPath: resolve(outputPath, 'restaurants.json'),
  })

  await upload({
    appId: process.env.ALGOLIA_APP_ID,
    adminApiKey: process.env.ALGOLIA_ADMIN_API_KEY,
    indexName: process.env.ALGOLIA_INDEX_NAME,
    objects,
  })
}

p()
