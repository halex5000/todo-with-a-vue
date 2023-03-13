<template>
  <v-app v-if="isLaunchDarklyReady">
    <login-dialog
      v-model="displayLoginDialog"
      :toggleLoginDialog="toggleLoginDialog"
    />
    <default-bar :clickHandler="toggleNavigation" />
    <default-drawer
      v-model="navigation"
      :toggleDebugDrawer="toggleDebugDrawer"
      :toggleLoginDialog="toggleLoginDialog"
    />
    <default-view />
    <debug-drawer v-model="debugPanel" :toggleDebugDrawer="toggleDebugDrawer" />
    <user-agent />
    <v-container class="d-flex align-center text-center fill-height">
      <v-row>
        <v-col>
          <v-chip
            class="ma-2"
            closable
            color="primary"
            close-icon="mdi-delete"
            prepend-icon="mdi-checkbox-marked-circle"
            :model-value="true"
          >
            Feature Flags Powered by LaunchDarkly Vue SDK
          </v-chip></v-col
        ></v-row
      >
    </v-container>
  </v-app>
</template>

<script setup>
import { useLDReady } from "launchdarkly-vue-client-sdk";
import { ref } from "vue";
import DefaultBar from "./AppBar.vue";
import DefaultView from "./ViewLayout.vue";
import DefaultDrawer from "./NavigationDrawer.vue";
import DebugDrawer from "./DebugDrawer.vue";
import UserAgent from "@/components/UserAgent.vue";
import LoginDialog from "@/components/LoginDialog.vue";
const isLaunchDarklyReady = useLDReady();
const navigation = ref(false);
const debugPanel = ref(false);
const displayLoginDialog = ref(false);

const toggleDebugDrawer = () => {
  if (navigation.value) navigation.value = false;
  debugPanel.value = !debugPanel.value;
};

const toggleLoginDialog = () => {
  console.log("toggling login dialog");
  if (navigation.value) navigation.value = false;
  displayLoginDialog.value = !displayLoginDialog.value;
};

const toggleNavigation = () => {
  navigation.value = !navigation.value;
};
</script>
