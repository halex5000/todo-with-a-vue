<template>
  <v-bottom-navigation density="compact" elevation="24">
    <div v-if="props.isLaunchDarklyReady" :class="mobile ? null : 'text-h6'">
      <v-icon icon="mdi-flag" />
      Powered by LaunchDarkly
    </div>
    <div v-else :class="mobile ? null : 'text-h6'">
      <v-icon icon="mdi-bus-alert" />
      LaunchDarkly is not initialized
    </div>
  </v-bottom-navigation>
</template>

<script setup>
import { useDisplay } from "vuetify";

const { mobile } = useDisplay();
const props = defineProps(["isLaunchDarklyReady"]);
</script>
