import algoliaSearch from 'algoliasearch/lite'
import algoliaSearchHelper from 'algoliasearch-helper'

const algoliaClient = algoliaSearch(
  import.meta.env.VITE_ALGOLIA_APP_ID as string,
  import.meta.env.VITE_ALGOLIA_SEARCH_API_KEY as string,
)

const algoliaHelper = algoliaSearchHelper(
  algoliaClient,
  import.meta.env.VITE_ALGOLIA_INDEX_NAME as string,
  {
    disjunctiveFacets: [
      'food_type',
      'dining_style',
      'price_range',
      'stars_count',
    ],
    hitsPerPage: 9,
    maxValuesPerFacet: 20,
    attributesToRetrieve: [
      'image_url',
      'name',
      'stars_count',
      'price_range',
      'reviews_count',
      'reserve_url',
      'food_type',
      'address',
      'city',
      '_geoloc',
    ],
  },
)

export const getAlgoliaClient = () => algoliaClient
export const getAlgoliaHelper = () => algoliaHelper
