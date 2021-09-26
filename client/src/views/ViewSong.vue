<template>
  <panel title="Song Metadata">
    <v-container fluid>
      <v-row no-gutters>
        <v-col cols="6">
          <v-card class="ma-1">
            <v-card-title
              primary-title
              class="light-green white--text"
            >
              Basic Information
            </v-card-title>
            <v-container fluid>
              <v-row
                no-gutters
                align="center"
                justify="center"
              >
                <v-col
                  cols="6"
                  no-gutters
                >
                  <div class="display-1 blue-grey--text mb-4">
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
                            name: 'edit-song', 
                            params: {
                              songId: song.id
                            }
                          }"
                  >Edit</v-btn>
                </v-col>
                <v-col
                  cols="6"
                  no-gutters
                >
                  <img
                    width="200"
                    height="200"
                    :src="song.albumImageUrl"
                  >
                  <div class="body-2">
                    {{ song.album }}
                  </div>
                </v-col>
              </v-row>
            </v-container>

          </v-card>
          <v-card class="ma-1">
            <v-card-title
              primary-title
              class="light-green white--text"
            >
              Lyrics
            </v-card-title>
            <v-textarea
              rows="10"
              class="mx-2"
              label="Lyrics"
              v-model="song.lyrics"
            ></v-textarea>
          </v-card>
        </v-col>
        <v-col cols="6">
          <v-card class="ma-1">
            <v-card-title
              primary-title
              class="light-green white--text"
            >
              Youtube Display
            </v-card-title>
            <youtube
              class="mt-1"
              @ready="ready"
              :video-id="song.youtubeId"
            />
          </v-card>
          <v-card class="ma-1">
            <v-card-title
              primary-title
              class="light-green white--text"
            >
              Tabs
            </v-card-title>
            <v-textarea
              rows="10"
              class="mx-2"
              label="Tab"
              v-model="song.tab"
            ></v-textarea>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </panel>
</template>

<script>
import SongService from '../services/SongService'

export default {
  data () {
    return {
      song: {}
    }
  },
  async mounted () {
    const songId = this.$store.state.route.params.songId
    this.song = (await SongService.show(songId)).data
  },
  methods: {
    ready (event) {
      this.player = event.target
    }
  },
}
</script>
<style>
</style>