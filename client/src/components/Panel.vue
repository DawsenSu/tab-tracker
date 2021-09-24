<template>
  <v-card
    class="mx-2 my-2"
    elevation="5"
    outlined
    title
  >
    <v-sheet
      color="primary"
      height="60"
    >
      <v-card-title class="white--text">{{ title }}</v-card-title>
    </v-sheet>
    <v-card-text>
      <slot name="action" />
      <slot />
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'Panel',
  props: [
    'title'
  ]
}
</script>

<style>
</style>