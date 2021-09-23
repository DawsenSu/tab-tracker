<template>
  <panel title="Songs">
    <div
      v-for="song in songs"
      :key="song.id"
    >
      {{ song.title }} -
      {{ song.artist }}
    </div>
  </panel>
</template>

<script>
import SongService from '../services/SongSerivce'

export default {
  data () {
    return {
      songs: []
    }
  },
  async mounted() {
    this.songs = (await SongService.index()).data
  },
}
</script>
<style>
</style>