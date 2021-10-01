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
                  <div
                    class="mt-4"
                    align="center"
                  >
                    <v-btn
                      class="blue-grey white--text"
                      :to="{
                            name: 'edit-song', 
                            params() {
                              return {
                                songId : song.id
                              }
                            }
                          }"
                    >Edit</v-btn>
                    <v-btn
                      v-if="isUserLoggedIn"
                      icon
                      class="mx-4"
                      color="success"
                      @click="setBookmark"
                    >
                      <v-icon>{{ bookmarkIconName }}</v-icon>
                    </v-btn>
                  </div>
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
import Panel from '../components/Panel.vue'
import SongService from '../services/SongService'
import BookmarkSerivce from '../services/BookmarkService'
import { mapState } from 'vuex'

export default {
  components: { Panel },
  data () {
    return {
      song: {},
      bookmarkIconName: null,
      bookmark: null
    }
  },
  async mounted () {
    const songId = this.$store.state.route.params.songId
    this.song = (await SongService.show(songId)).data
  },
  computed: {
    ...mapState([
      'isUserLoggedIn'
    ])
  },
  watch: {
    song: async function () {
      if (!this.isUserLoggedIn) {
        return
      }
      try {
        const userId = this.$store.state.user.id
        const songId = this.$store.state.route.params.songId

        this.bookmark = (await BookmarkSerivce.index({
          songId: songId,
          userId: userId
        })).data
      } catch (error) {
        console.log(error)
      }
    },
    bookmark: function () {
      this.bookmarkIconName = this.bookmark ? "mdi-bookmark-check" : "mdi-bookmark-minus"
    }
  },
  methods: {
    ready (event) {
      this.player = event.target
    },
    async setBookmark () {
      const userId = this.$store.state.user.id
      const songId = this.$store.state.route.params.songId

      try {
        if (!this.bookmark) {
          this.bookmark = (await BookmarkSerivce.post({
            songId: songId,
            userId: userId
          })).data
        } else {
          await BookmarkSerivce.delete(this.bookmark.id)
          this.bookmark = null
        }
      } catch (error) {
        return { errorMsg: error }
      }
    }
  },
}
</script>
<style>
</style>