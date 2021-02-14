import algoliasearch from 'algoliasearch'

interface UploadOptions {
  appId: string | undefined
  adminApiKey: string | undefined
  indexName: string | undefined
  objects: ReadonlyArray<Readonly<Record<string, any>>>
}

const upload = async ({
  appId,
  adminApiKey,
  indexName,
  objects,
}: UploadOptions) => {
  if (!appId || !adminApiKey || !indexName) {
    console.error(
      'Upload failed: app ID, admin API key or index name is missing',
    )
    return
  }

  const client = algoliasearch(appId, adminApiKey)
  const index = client.initIndex(indexName)

  index
    .replaceAllObjects(objects)
    .then(({ objectIDs }) => {
      console.log('Upload succeed: dataset saved to Algolia')
    })
    .catch((err) => {
      console.log(err)
    })
}

export default upload
