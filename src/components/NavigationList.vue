<template>
  <v-list>
    <v-list-item
      v-if="isLoginEnabled"
      :prepend-icon="store.user ? 'mdi-account-circle' : 'mdi-account-box'"
      :title="store.user ? 'Logged in as' : 'Login'"
      :subtitle="
        store.user ? ` ${store.user.username}` : 'Login to unlock features!'
      "
    >
      <template v-slot:append>
        <v-btn color="error" v-if="store.user" @click="logout()">Logout</v-btn>
        <v-btn color="primary" v-if="!store.user" @click="toggleLoginDialog()"
          >Login</v-btn
        >
      </template>
    </v-list-item>
  </v-list>
  <v-divider></v-divider>
  <v-list>
    <v-list-item
      prepend-icon="mdi-home"
      subtitle="There's no place like home!"
      title="Home"
      @click="router.push('/')"
    >
    </v-list-item>
  </v-list>
  <v-list>
    <v-list-item
      prepend-icon="mdi-clipboard-list"
      subtitle="Your handy ToDo List"
      title="ToDo List"
      v-if="isToDoListEnabled"
      @click="router.push('todo-list')"
    >
    </v-list-item>
  </v-list>
  <v-divider></v-divider>
  <v-list title="Dev Tools">
    <v-list-item
      v-if="isDebugEnabled"
      prepend-icon="mdi-bug"
      title="Debug Panel"
      @click="toggleDebugDrawer()"
    >
    </v-list-item>
  </v-list>
</template>

<script setup>
import { useLDFlag } from "launchdarkly-vue-client-sdk";
import { useAppStore } from "@/store/app";
import { useRouter } from "vue-router";

defineProps({
  toggleDebugDrawer: Function,
  toggleLoginDialog: Function,
  displayLoginDialog: Boolean,
});

const isDebugEnabled = useLDFlag("debug-panel");
const isToDoListEnabled = useLDFlag("to-do-list");
const isLoginEnabled = useLDFlag("login");
const router = useRouter();

const store = useAppStore();

const logout = () => {
  setTimeout(() => {
    store.logout();
  }, 100);
};
</script>
