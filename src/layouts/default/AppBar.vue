<template>
  <v-app-bar>
    <v-app-bar-title v-if="isLaunchDarklyReady">
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
  import { useLDReady } from 'launchdarkly-vue-client-sdk'
  const isLaunchDarklyReady = useLDReady()
</script>
