<template>
  <div class="home">
    <div v-if="error" class="error">
      Coult not fetch the data
    </div>
    <div v-if="documents">
      <ListView :playlists="documents" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

import getCollection from "../composables/getCollection";
import ListView from "../components/ListView";

export default {
  name: 'Home',
  setup() {
    const {error, documents} = getCollection('playlists')
    console.log(documents)
    return {error, documents}
  },
  components: {
    ListView
  }
}
</script>
