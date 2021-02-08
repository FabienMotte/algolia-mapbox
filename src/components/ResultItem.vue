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
          <div
            class="text-lg font-medium highlight"
            v-html="item._highlightResult.name.value"
          ></div>
          <div
            class="text-base highlight"
            v-html="item._highlightResult.food_type.value"
          ></div>
        </div>

        <div class="flex items-center text-yellow-500 space-x-2 text-sm">
          <span
            class="w-6 h-6 flex items-center justify-center bg-yellow-50 rounded-lg"
          >
            <StarIcon class="w-3 h-3" />
          </span>
          <span
            class="font-medium"
            :class="{ 'text-yellow-500': item.stars_count >= 4 }"
            >{{ item.stars_count }}</span
          >

          <div class="w-0.5 h-0.5 bg-yellow-500 rounded-full"></div>

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

    return { loaded, onClick }
  },
})
</script>