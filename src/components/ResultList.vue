<template>
  <section class="relative gradient-overflow">
    <div class="h-full p-8 overflow-auto flex flex-col" ref="scrollEl">
      <ResultStats class="ml-4 mb-2" />

      <transition-group
        name="result-list"
        tag="ol"
        class="grid grid-cols-1 gap-6 relative"
      >
        <li
          v-for="(item, i) in items"
          :key="item.objectID"
          class="inline-block transition-all ease-in-out"
          :style="`--item-position: ${getItemPosition(i)}`"
          :ref="(el) => setItemRef(el, item)"
        >
          <ResultItem :item="item" />
        </li>
      </transition-group>

      <Pagination class="mt-5" />
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue'
import { SearchResults } from 'algoliasearch-helper'
import { getAlgoliaHelper } from '@/services/algolia'
import ResultItem, { IResultItem } from '@/components/ResultItem.vue'
import ResultStats from '@/components/ResultStats.vue'
import Pagination from '@/components/Pagination.vue'
import MapStore from '@/store/MapStore'

export default defineComponent({
  name: 'ResultList',

  components: {
    ResultItem,
    ResultStats,
    Pagination,
  },

  setup() {
    const algoliaHelper = getAlgoliaHelper()

    const items = ref<IResultItem[]>([])
    const scrollEl = ref<Element>()

    const itemRefs: Record<string, Element> = {}
    const setItemRef = (el: Element, item: IResultItem) => {
      itemRefs[item.objectID] = el
    }

    const getHits = ({ results }: { results: SearchResults }) => {
      items.value = results.hits
      scrollToTop()
    }

    const getItemPosition = (index: number) => {
      const row = Math.floor(index / 3) + 1
      const column = (index % 3) + 1
      return `${row} / ${column} / ${row} / ${column}`
    }

    const scrollToTop = () => {
      scrollEl.value?.scrollTo({ top: 0, behavior: 'smooth' })
    }

    watch(
      () => MapStore.getState().currentObjectID,
      (currentObjectID) => {
        if (currentObjectID) {
          itemRefs[currentObjectID].scrollIntoView({
            block: 'start',
            behavior: 'smooth',
          })
        }
      },
    )

    onMounted(() => {
      algoliaHelper.on('result', getHits)
    })

    return { items, getItemPosition, scrollEl, setItemRef }
  },
})
</script>

<style lang="postcss">
.result-list-enter-from,
.result-list-leave-to {
  opacity: 0;
}

.result-list-leave-active {
  position: absolute;
  grid-area: var(--item-position);
  width: 100%;
}
</style>