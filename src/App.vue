<template>
  <Container>
    <SearchBar />

    <div class="w-full h-full flex overflow-hidden">
      <Refinements class="w-3/12" />
      <Map class="w-6/12" />
      <ResultList class="w-3/12" />
    </div>
  </Container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import Container from '@/components/Container.vue'
import SearchBar from '@/components/SearchBar.vue'
import Refinements from '@/components/Refinements.vue'
import ResultList from '@/components/ResultList.vue'
import Map from '@/components/Map.vue'

export default defineComponent({
  name: 'App',

  components: {
    Container,
    SearchBar,
    Refinements,
    ResultList,
    Map,
  },
})
</script>
