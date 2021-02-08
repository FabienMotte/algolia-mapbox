<template>
  <aside class="relative gradient-overflow border-r border-gray-100">
    <div class="h-full overflow-auto p-8 pr-5 space-y-10">
      <RefinementList
        v-for="(facet, i) in facets"
        :key="facet.name"
        :facet="facet"
        :facet-values="facetsValues[i]"
      />
    </div>
  </aside>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { SearchResults } from 'algoliasearch-helper'
import { getAlgoliaHelper } from '@/services/algolia'
import RefinementList from '@/components/RefinementList.vue'

const facetValuesSortMap: Record<string, string[]> = {
  stars_count: ['isRefined:desc', 'name:desc'],
  price_range: ['isRefined:desc', 'name:desc'],
}

export default defineComponent({
  name: 'Refinements',

  components: {
    RefinementList,
  },

  setup() {
    const algoliaHelper = getAlgoliaHelper()

    const facets = ref<SearchResults.Facet[]>([])
    const facetsValues = ref<SearchResults.FacetValue[][]>([])

    const getFacets = ({ results }: { results: SearchResults }) => {
      facetsValues.value = []

      facets.value = results.facets.concat(results.disjunctiveFacets)
      facets.value.map((facet) => {
        const facetValues = results.getFacetValues(facet.name, {
          sortBy: facetValuesSortMap[facet.name] || [
            'isRefined:desc',
            'name:asc',
          ],
        }) as SearchResults.FacetValue[]

        if (facetValues) {
          facetsValues.value.push(facetValues)
        }
      })
    }

    onMounted(() => {
      algoliaHelper.on('result', getFacets)
    })

    return { facets, facetsValues }
  },
})
</script>
