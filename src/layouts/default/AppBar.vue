<template>
  <v-app-bar elevation="24" dense class="bg-black" density="compact">
    <v-app-bar-nav-icon v-if="mobile"></v-app-bar-nav-icon>
    <v-app-bar-title>
      <code class="text-green">Let's Go Build</code>
    </v-app-bar-title>
  </v-app-bar>
</template>

<script setup>
import { useDisplay } from "vuetify";
import { useAppStore } from "@/store/app";
const store = useAppStore();

const { mobile } = useDisplay();
</script>
