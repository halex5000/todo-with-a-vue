<template>
  <v-navigation-drawer
    :location="mobile ? 'bottom' : 'left'"
    temporary
    v-if="isLoginEnabled || isToDoListEnabled"
  >
    <navigation-list
      :toggleDebugDrawer="toggleDebugDrawer"
      :toggleLoginDialog="toggleLoginDialog"
      :displayLoginDialog="displayLoginDialog"
    />
  </v-navigation-drawer>
</template>

<script setup>
import { useLDFlag } from "launchdarkly-vue-client-sdk";
import { useDisplay } from "vuetify/lib/framework.mjs";
import NavigationList from "@/components/NavigationList.vue";

defineProps({
  toggleDebugDrawer: Function,
  toggleLoginDialog: Function,
  displayLoginDialog: Boolean,
});

const isToDoListEnabled = useLDFlag("to-do-list");
const isLoginEnabled = useLDFlag("login");
const { mobile } = useDisplay();
</script>
