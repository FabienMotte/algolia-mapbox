<template>
  <div class="relative flex flex-col space-y-3">
    <div class="flex items-center justify-between">
      <h2 class="text-xl font-medium" v-html="facetNameMap[facet.name]"></h2>

      <transition name="fade">
        <button
          type="reset"
          title="Reset the filter choices"
          class="flex justify-center items-center mr-3.5 focus:outline-none"
          @click="onResetClick"
          v-if="refinementsCount > 0"
        >
          <CloseIcon class="w-5 h-5 fill-current text-gray-800" />
        </button>
      </transition>
    </div>

    <transition-group name="list" tag="ul" class="ml-1.5 flex flex-col">
      <li
        v-for="facetValue in facetValues.slice(0, maxFacetValues)"
        :key="facetValue.name"
        class="transition-all inline-block"
      >
        <label
          class="cursor-pointer flex items-center justify-between space-x-4 px-3 py-2 rounded-xl transition-colors group hover:bg-gray-100"
        >
          <div>
            <span>{{ facetValue.name }}</span>
            <span
              class="ml-3 bg-gray-100 group-hover:bg-white transition-colors rounded-md px-2 py-0.5 text-xs font-light"
              >{{ facetValue.count }}</span
            >
          </div>
          <input
            type="checkbox"
            :value="facetValue.name"
            class="appearance-none cursor-pointer w-6 h-6 border flex-shrink-0 border-gray-300 rounded-md form-checked transition-colors focus:outline-none"
            :checked="facetValue.isRefined"
            @click="toggleFacetRefinement(facetValue.name)"
          />
        </label>
      </li>
    </transition-group>

    <Button
      class="ml-4.5 mr-3"
      :title="showMoreLessText"
      @click="onShowMoreLessClick"
      v-if="showMoreLessVisible"
      >{{ showMoreLessText }}</Button
    >
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from 'vue'
import { SearchResults } from 'algoliasearch-helper'
import { getAlgoliaHelper } from '@/services/algolia'
import CloseIcon from '@/components/icons/CloseIcon.vue'
import Button from '@/components/Button.vue'

const facetNameMap: Record<string, string> = {
  food_type: 'Cuisine <span class="font-light">Type</span>',
  stars_count: 'Star <span class="font-light">Rating</span>',
  dining_style: 'Dining <span class="font-light">Style</span>',
  price_range: 'Price <span class="font-light">Range</span>',
}

const DEFAULT_MAX_FACET_VALUES = 5

export default defineComponent({
  name: 'RefinementList',

  components: {
    CloseIcon,
    Button,
  },

  props: {
    facet: {
      type: Object as PropType<SearchResults.Facet>,
      required: true,
    },

    facetValues: {
      type: Object as PropType<SearchResults.FacetValue[]>,
      required: true,
    },
  },

  setup(props) {
    const refinementsCount = ref(0)
    const maxFacetValues = ref(DEFAULT_MAX_FACET_VALUES)
    const showMore = ref(true)
    const showMoreLessVisible = computed(
      () => props.facetValues.length > DEFAULT_MAX_FACET_VALUES,
    )
    const showMoreLessText = computed(
      () => `Show ${showMore.value ? 'more' : 'less'}`,
    )

    const algoliaHelper = getAlgoliaHelper()

    const updateRefinementsCount = () => {
      const refinements = algoliaHelper.getRefinements(props.facet.name)
      refinementsCount.value = refinements.length
    }

    const toggleFacetRefinement = (facetName: string) => {
      algoliaHelper.toggleFacetRefinement(props.facet.name, facetName).search()

      updateRefinementsCount()
    }

    const onResetClick = () => {
      algoliaHelper.clearRefinements(props.facet.name).search()

      updateRefinementsCount()
    }

    const onShowMoreLessClick = () => {
      maxFacetValues.value =
        maxFacetValues.value === DEFAULT_MAX_FACET_VALUES
          ? props.facetValues.length
          : DEFAULT_MAX_FACET_VALUES
      showMore.value = maxFacetValues.value === DEFAULT_MAX_FACET_VALUES
    }

    return {
      refinementsCount,
      facetNameMap,
      toggleFacetRefinement,
      onResetClick,
      onShowMoreLessClick,
      showMoreLessVisible,
      showMoreLessText,
      maxFacetValues,
    }
  },
})
</script>
