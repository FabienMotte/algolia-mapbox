<template>
  <div
    class="h-28 border-b border-gray-100 focus-within:border-gray-300 focus-within:bg-gray-50 hover:border-gray-300 transition-colors"
  >
    <form
      action=""
      role="search"
      class="w-full h-full relative"
      @submit.prevent
    >
      <input
        class="w-full h-full pl-32 bg-transparent outline-none text-3xl placeholder-gray-300"
        type="search"
        placeholder="Search for restaurants"
        autocomplete="off"
        autocorrect="off"
        autocapitalize="off"
        spellcheck="false"
        maxlength="100"
        autofocus
        v-model="query"
      />
      <button
        type="submit"
        title="Submit the search query"
        class="icon-btn left-0"
      >
        <SearchIcon class="icon" />
      </button>

      <button
        type="reset"
        title="Reset the search query"
        class="icon-btn right-0"
        @click="query = ''"
      >
        <CloseIcon class="icon" />
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue'

import SearchIcon from '@/components/icons/SearchIcon.vue'
import CloseIcon from '@/components/icons/CloseIcon.vue'
import { getAlgoliaHelper } from '@/services/algolia'

export default defineComponent({
  name: 'SearchBar',

  components: {
    SearchIcon,
    CloseIcon,
  },

  setup() {
    const algoliaHelper = getAlgoliaHelper()
    const query = ref('')

    onMounted(() => {
      watch(
        query,
        () => {
          algoliaHelper.setQuery(query.value).search()
        },
        { immediate: true },
      )
    })

    return {
      query,
    }
  },
})
</script>

<style lang="postcss" scoped>
.icon-btn {
  @apply absolute top-1/2 w-28 h-full flex justify-center items-center transform -translate-y-1/2 hover:bg-gray-100 transition-colors focus:outline-none;
}

.icon {
  @apply w-6 h-6 fill-current text-gray-400;
}
</style>
