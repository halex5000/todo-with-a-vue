<template>
  <v-app v-if="isLaunchDarklyReady">
    <default-bar />
    <default-drawer />
    <default-view />
    <debug-drawer />
    <user-agent />
    <powered-by-footer :is-LaunchDarklyReady="isLaunchDarklyReady" />
  </v-app>
</template>

<script setup>
import { useLDReady } from "launchdarkly-vue-client-sdk";
import DefaultBar from "./AppBar.vue";
import DefaultView from "./ViewLayout.vue";
import DefaultDrawer from "./NavigationDrawer.vue";
import DebugDrawer from "./DebugDrawer.vue";
import UserAgent from "@/components/UserAgent.vue";
import PoweredByFooter from "./PoweredByFooter.vue";
const isLaunchDarklyReady = useLDReady();
</script>
