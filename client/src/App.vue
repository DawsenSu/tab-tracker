<template>
  <v-app>
    <v-navigation-drawer      
      v-model="drawer" app>
      <!-- -->
    </v-navigation-drawer>

    <v-app-bar        
        app>
      <!-- -->
      <v-app-bar-nav-icon 
        @click.stop="drawer = !drawer">
      </v-app-bar-nav-icon>

      <v-toolbar-title>Tab-tracker</v-toolbar-title>
      <v-btn 
        plain
        :to = "{name: 'Songs'}">
        <v-icon left>mdi-music-box</v-icon>
        Browser
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn 
        plain
        :to = "{name: 'About'}">
        <v-icon left>mdi-magnify</v-icon>
        About
      </v-btn>
      <v-btn 
        plain
        :to = "{name: ''}">
        <v-icon left>mdi-home</v-icon>
        Home
      </v-btn>
      <v-btn
        plain
        v-if="!$store.state.isUserLoggedIn"
        :to = "{name: 'Login'}">
        <v-icon left>mdi-login</v-icon>
        Login
      </v-btn>
      <v-btn
        plain
        v-if="!$store.state.isUserLoggedIn"
        :to = "{name: 'Register'}">
        <v-icon left>mdi-account-plus</v-icon>
        Register
      </v-btn>
      <v-btn
        plain
        v-if="$store.state.isUserLoggedIn"
        @click="logout">
        <v-icon left>mdi-logout</v-icon>
        Logout
      </v-btn>
    </v-app-bar>

    <!-- Sizes your content based upon application components -->
    <v-main>

      <!-- Provides the application the proper gutter -->
      <v-container fluid>

        <!-- If using vue-router -->
        <router-view></router-view>
      </v-container>
    </v-main>

    <v-footer app>
      <!-- -->
    </v-footer>
  </v-app>
</template>
<script>

export default ({
  data() {
    return {
      drawer: false,
      
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$router.push('/')
    }
  },
})
</script>


<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
