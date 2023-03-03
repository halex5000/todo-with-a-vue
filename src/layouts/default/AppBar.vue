<template>
  <v-app-bar>
    <v-app-bar-title v-if="props.isLaunchDarklyReady">
      <v-icon icon="mdi-flag" />
      Powered by LaunchDarkly
    </v-app-bar-title>
    <v-app-bar-title v-else>
      <v-icon icon="mdi-bus-alert" />
      LaunchDarkly is not initialized
    </v-app-bar-title>
  </v-app-bar>
</template>

<script setup>
  const props = defineProps(['isLaunchDarklyReady'])
</script>
