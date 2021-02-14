<template>
  <div>
    <figure
      class="w-full h-auto rounded-xl overflow-hidden aspect-w-16 aspect-h-8 shadow-md bg-gray-100"
      :class="{ 'animate-pulse': !loaded }"
    >
      <img
        :src="item.image_url"
        :alt="item.name"
        class="object-cover w-full h-full opacity-0 transition-opacity"
        :class="{ 'opacity-100': loaded }"
        @load="loaded = true"
      />
    </figure>

    <div class="text-sm font-medium mt-4">{{ item.name }}</div>
    <div class="text-xs text-gray-400 mt-2">
      {{ item.address }}, {{ item.city }}
    </div>

    <a
      :href="item.reserve_url"
      target="_blank"
      rel="noopener"
      class="border border-gray-300 rounded-lg w-full block py-3 text-center text-xs mt-4 font-medium transition-colors hover:bg-gray-100 focus:outline-none"
      >See details</a
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import { IResultItem } from './ResultItem.vue'

export default defineComponent({
  props: {
    item: {
      type: Object as PropType<IResultItem>,
      required: true,
    },
  },

  setup() {
    const loaded = ref(false)

    return {
      loaded,
    }
  },
})
</script>
