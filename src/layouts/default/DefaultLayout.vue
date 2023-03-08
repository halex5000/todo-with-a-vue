<template>
  <v-app v-if="isLaunchDarklyReady">
    <default-bar :is-LaunchDarklyReady="isLaunchDarklyReady" />
    <default-drawer />
    <default-view />
    <debug-drawer />
    <user-agent />
  </v-app>
</template>

<script setup>
import { useLDReady } from "launchdarkly-vue-client-sdk";
import DefaultBar from "./AppBar.vue";
import DefaultView from "./ViewLayout.vue";
import DefaultDrawer from "./NavigationDrawer.vue";
import DebugDrawer from "./DebugDrawer.vue";
import UserAgent from "@/components/UserAgent.vue";
const isLaunchDarklyReady = useLDReady();
</script>
