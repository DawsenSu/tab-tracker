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
      <v-spacer></v-spacer>
      <v-btn icon
        @click="navigateTo('about')">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-btn icon
        @click="navigateTo('/')">
        <v-icon>mdi-home</v-icon>
      </v-btn>
      <v-btn icon
        @click="navigateTo('Login')">
        <v-icon>mdi-login</v-icon>
      </v-btn>
      <v-btn icon
        @click="navigateTo('Register')">
        <v-icon>mdi-account-plus</v-icon>
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
    navigateTo(route) {
      this.$router.push(route)
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
