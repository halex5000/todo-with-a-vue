<template>
  <v-app-bar elevation="24">
    <v-app-bar-nav-icon @click.stop="clickHandler()"></v-app-bar-nav-icon>
    <v-app-bar-title> </v-app-bar-title>
    <theme-switcher />
  </v-app-bar>
</template>

<script setup>
import ThemeSwitcher from "@/components/ThemeSwitcher.vue";
defineProps({
  clickHandler: Function,
});
</script>
