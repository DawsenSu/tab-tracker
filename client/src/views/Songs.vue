<template>
  <panel title="Songs">
    <div slot="action">
      <v-btn
        fab
        color="info"
        medium
        absolute
        top
        right
        class="mt-12"
        :to = "{name: 'create-song'}"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </div>
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
                :to = "{
              name: 'view-song', 
              params: {
                songId: song.id
              }
            }"
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
import SongService from '../services/SongService'

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
  },
}
</script>
<style>
</style>