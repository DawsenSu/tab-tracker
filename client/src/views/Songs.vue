<template>
  <v-container fluid>
    <v-row no-gutters>
      <v-col cols="12">
        <panel title="Search">
          <v-text-field
            name="search"
            label="Search by song title, artist, album or genre"
            v-model="search"
          ></v-text-field>
        </panel>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="12">
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
              :to="{name: 'create-song'}"
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
                      :to="{
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
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import SongService from '../services/SongService'

const _ = require('lodash')
export default {
  data () {
    return {
      songs: [],
      search: ''
    }
  },
  // async mounted () {
  //   this.songs = (await SongService.index()).data
  // },
  methods: {
  },
  watch: {
    '$route.query.search': {
      immediate: true,
      async handler (value) {
        this.search = value
        this.songs = (await SongService.index(value)).data
      }
    },
    search: _.debounce(async function (value) {
      const route = {
        name: 'songs'
      }
      if (value !== '') {
        route.query = {
          search: value
        }
      }
      this.$router.push(route)
    }, 700)
  },
}
</script>
<style>
</style>