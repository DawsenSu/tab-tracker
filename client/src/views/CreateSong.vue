<template>
  <div class="text-center">
    <v-container dense full>
      <v-row no-gutters>
        <v-col cols="12" no-gutters>
          <v-form
            ref="form"
            v-model="valid"
          >
            <v-container no-gutters>
              <v-row no-gutters>
                <v-col cols="6">
                  <panel title="Song Metadata">
                    <v-text-field
                      label="title"
                      required
                      :rules="[required]"
                      v-model="song.title"
                    ></v-text-field>
                    <v-text-field
                      label="Artist"
                      v-model="song.artist"
                      required
                      :rules="[required]"
                    ></v-text-field>
                    <v-text-field
                      label="Genre"
                      v-model="song.genre"
                      required
                      :rules="[required]"
                    ></v-text-field>
                    <v-text-field
                      label="Album"
                      v-model="song.album"
                      required
                      :rules="[required]"
                    ></v-text-field>
                    <v-text-field
                      label="Album Image Url"
                      v-model="song.albumImageUrl"
                      required
                      :rules="[required]"
                    ></v-text-field>
                    <v-text-field
                      label="YouTube ID"
                      v-model="song.youtubeId"
                      required
                      :rules="[required]"
                    ></v-text-field>
                  </panel>
                </v-col>
                <v-col cols="6">
                  <panel title="Song Structure">
                    <v-textarea
                      label="Tab"
                      required
                      :rules="[required]"
                      v-model="song.tab"
                    ></v-textarea>
                    <v-textarea
                      label="Lyrics"
                      v-model="song.lyrics"
                      required
                      :rules="[required]"
                    ></v-textarea>
                  </panel>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-col>
      </v-row>
      <v-row
        justify="center"
        no-gutters
      >
        <v-btn
          color="primary"
          @click="createsong"
        >Create</v-btn>
      </v-row>
    </v-container>
    <v-snackbar
      color="error"
      v-model="snackbar"
      timeout="2000"
    >
      {{ error }}
    </v-snackbar>
  </div>
</template>

<script>
import SongSerivce from '../services/SongSerivce'

export default {
  components: {},
  data () {
    return {
      song: {
        title: null,
        artist: null,
        genre: null,
        album: null,
        albumImageUrl: null,
        youtubeId: null,
        lyrics: null,
        tab: null
      },
      snackbar: false,
      valid: false,
      error: null,
      required: (value) => !!value || 'required.'

    }
  },
  methods: {
    async createsong () {
      this.error = null

      // const areAllFieldsFilledIn = Object
      //   .keys(this.song)
      //   .every(key => !!this.song[key])
      this.snackbar = !this.valid
      if (!this.valid) {
        this.error = "Please fill in all the required fields"
        return
      }

      try {
        await SongSerivce.post(this.song)
        this.$router.push({
          name: 'songs'
        })
      } catch (err) {
        console.log(err)
        this.error = err
      }
    }
  },
}
</script>

<style>
</style>