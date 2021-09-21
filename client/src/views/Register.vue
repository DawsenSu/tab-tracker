<template>
  <v-layout column>
    <panel title="Register">
      <v-text-field
        v-model="email"
        :rules="rules"
        hint="Enter your email"
        label="Email"
      >
      </v-text-field>
      <v-text-field
        v-model="password"
        :rules="rules"
        type="password"
        hint="Enter your password"
        label="Password"
      >
      </v-text-field>
      <br>
      <div
        class="font-weight-medium red--text"
        v-html="errorMsg"
      >
      </div>
      <br v-if="!!errorMsg">
      <v-btn
        color="primary"
        @click="register"
      >
        Register
      </v-btn>
    </panel>
  </v-layout>
</template>

<script>
import AuthenticationService from "../services/AuthenticationSerivce"

export default {
  name: 'Register',
  components: {
  },
  data () {
    return {
      email: '',
      password: '',
      rules: [
        value => !!value || 'Require.'
      ],
      errorMsg: null
    }
  },
  methods: {
    async register () {
      try {
        const response = await AuthenticationService.register({
          email: this.email,
          password: this.password
        })
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        this.errorMsg = null
      } catch (err) {
        this.errorMsg = err.response.data.error
      }

    }
  },
  // watch: {
  //   email (value) {
  //     console.log('email has changed', value)
  //   }
  // },
  // mounted() {
  //   setTimeout( () => {
  //     this.email = 'Hello word'
  //   },1000)
  // },  
}
</script>
