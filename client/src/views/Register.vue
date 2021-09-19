<template>
  <v-layout column>
    <v-card
      xs4
      cyan
      elevation="5"
      outlined
      title>
      <v-card-title>Register</v-card-title>
        <input 
          type="email"
          name="email"
          v-model="email"
          placeholder="enter your email"/>
        <br>
        <input
          type="password"
          name="password"
          v-model="password"
          placeholder="enter your password"/>
        <br>
        <v-btn 
          color="primary" 
          @click="register" >
          Register
        </v-btn>
    </v-card>
  </v-layout>
</template>

<script>
import AuthenticationService from "../../services/AuthenticationSerivce"

export default {
  name: 'Home',
  components: {
  },
  data() {
    return {
      email: 'ste',
      password: '1212'
    }
  },
  methods: {
    async register() {
      const response = await AuthenticationService.register({
        email: this.email,
        password: this.password
      })
      console.log(response.data)
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
