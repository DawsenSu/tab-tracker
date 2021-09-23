<template>
  <panel title="Songs">
    <div
      v-for="song in songs"
      :key="song.id"
    >
      <v-card class="mt-2 mb-2">
        <v-container>
          <v-row>
            <v-col cols="6">
              <div class="display-1 blue-grey--text mb-4 mt-4">
                {{ song.title }}
              </div>
              <div class="body-1">
                {{ song.artist }}
              </div>
              <div class="body-1">
                {{ song.genre }}
              </div>
              <v-btn
                class="blue-grey white--text mt-4"
                @click="navigateTo({
              name: 'songs',
              params: {
                songId: song.id
              }
            })"
              >
                View</v-btn>
            </v-col>
            <v-col cols="6">
              <img
                width="200"
                height="200"
                :src="song.albumImageUrl"
              >
            </v-col>
          </v-row>
        </v-container>
      </v-card>

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
  async mounted () {
    this.songs = (await SongService.index()).data
  },
  methods: {
    navigateTo(route) {
      this.$router.push(route)
    }
  },
}
</script>
<style>
</style>