<template>
  <panel title="Login">
    <form>
      <v-text-field
        v-model="email"
        :rules="rules"
        hint="Enter your email"
        label="Email"
        @keyup.enter.native="login"
        autocomplete="username"
      >
      </v-text-field>
      <v-text-field
        v-model="password"
        :rules="rules"
        type="password"
        hint="Enter your password"
        label="Password"
        @keyup.enter.native="login"
        autocomplete="current-password"
      >
      </v-text-field>
      <br>
    </form>
    <v-snackbar
      color="error"
      v-model="snackbar"
      timeout="2000"
    >
      {{ errorMsg }}
    </v-snackbar>
    <v-btn
      color="primary"
      @click="login"
    >
      Login
    </v-btn>
  </panel>
</template>

<script>
import AuthenticationService from "../services/AuthenticationSerivce"

export default {
  name: 'Login',
  components: {
  },
  data () {
    return {
      email: '',
      password: '',
      rules: [
        value => !!value || 'Require.'
      ],
      snackbar: false,
      errorMsg: null
    }
  },
  methods: {
    async login () {
      try {
        const response = await AuthenticationService.login({
          email: this.email,
          password: this.password
        })
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        this.errorMsg = null
        this.$router.push('/songs')
      } catch (err) {
        this.errorMsg = err.response.data.error
        this.snackbar = true
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
