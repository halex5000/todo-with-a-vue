<template>
  <v-navigation-drawer
    expand-on-hover
    rail
    v-if="isLoginEnabled || isToDoListEnabled"
  >
    <v-list>
      <v-list-item
        v-if="isLoginEnabled"
        prepend-icon="mdi-account-box"
        title="Login"
        subtitle="Login to unlock features!"
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
  </v-navigation-drawer>
</template>

<script setup>
import { useLDFlag } from "launchdarkly-vue-client-sdk";
import { useRouter } from "vue-router";
const isToDoListEnabled = useLDFlag("to-do-list");
const isLoginEnabled = useLDFlag("login");
const router = useRouter();
</script>
