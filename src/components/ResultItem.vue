<template>
  <button
    class="w-full hover:bg-gray-100 transition-colors rounded-xl p-4 focus:outline-none"
    @click="onClick"
  >
    <div class="flex flex-col text-left">
      <figure
        class="h-auto w-full rounded-xl overflow-hidden aspect-w-16 aspect-h-10 shadow-md bg-gray-100"
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

      <div class="mt-5 flex flex-col space-y-1">
        <div>
          <div class="text-lg font-medium highlight">
            {{ item._highlightResult.name.value }}
          </div>

          <span
            v-if="item._highlightResult?.dining_style?.value"
            class="text-md font-small highlight"
          >
            ({{ item._highlightResult?.dining_style?.value }} )
          </span>

          <div
            v-if="item._highlightResult?.food_type?.value"
            class="text-base highlight"
          >
            {{ item._highlightResult?.food_type?.value }}
          </div>
        </div>

        <div class="flex items-center space-x-2 text-sm">
          <span
            class="w-6 h-6 flex items-center justify-center text-cyan-dark bg-cyan-light rounded-lg"
          >
            <StarIcon class="w-3 h-3" />
          </span>
          <span class="font-medium" :class="{ 'text-cyan-dark': stars >= 4 }">{{
            stars
          }}</span>

          <div class="w-0.5 h-0.5 bg-black rounded-full"></div>

          <div>
            {{ item.reviews_count }} review{{
              item.reviews_count > 1 ? 's' : ''
            }}
          </div>
        </div>

        <div class="text-sm text-gray-400">{{ item.price_range }}</div>
      </div>
    </div>
  </button>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import StarIcon from '@/components/icons/StarIcon.vue'
import MapStore from '@/store/MapStore'

export interface IResultItem {
  objectID: string
  image_url: string
  name: string
  stars_count: number
  price_range: string
  reviews_count: number
  reserve_url: string
  food_type: string
  address: string
  city: string
  _highlightResult: any
}

export default defineComponent({
  name: 'ResultItem',

  components: {
    StarIcon,
  },

  props: {
    item: {
      type: Object as PropType<IResultItem>,
      required: true,
    },
  },

  setup(props) {
    const loaded = ref(false)

    const onClick = () => {
      MapStore.updateObjectID(props.item.objectID)
    }

    const stars = props.item.stars_count

    return {
      loaded,
      onClick,
      stars,
    }
  },
})
</script>
