<template>
  <v-bottom-navigation elevation="24" mode="grow">
    <div v-if="props.isLaunchDarklyReady" class="text-h6">
      <v-icon icon="mdi-flag" />
      Powered by LaunchDarkly
    </div>
    <div v-else class="text-h6">
      <v-icon icon="mdi-bus-alert" />
      LaunchDarkly is not initialized
    </div>
  </v-bottom-navigation>
</template>

<script setup>
const props = defineProps(["isLaunchDarklyReady"]);
</script>
