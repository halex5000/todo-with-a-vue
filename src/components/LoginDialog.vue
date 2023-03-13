<template>
  <v-dialog fullscreen transition="dialog-top-transition">
    <v-sheet class="mx-auto">
      <v-form @submit.prevent>
        <v-toolbar-title class="text-h5">Login</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-container>
          <v-row v-if="!store.user">
            <v-col cols="12" md="12">
              <v-text-field v-model="username" label="Username"></v-text-field>

              <v-text-field
                v-model="password"
                label="Password"
                :type="secret ? 'password' : 'text'"
                :append-icon="secret ? 'mdi-eye-off' : 'mdi-eye'"
                counter
                persistent-hint
                hint="Password is just for display"
                @click:append="secret = !secret"
              >
              </v-text-field>
              <v-btn
                type="submit"
                color="primary"
                block
                class="mt-2"
                @click="login(toggleLoginDialog)"
              >
                Login
              </v-btn>
            </v-col></v-row
          ></v-container
        >
      </v-form>
    </v-sheet>
  </v-dialog>
</template>

<script setup>
import { useAppStore } from "@/store/app";
import { ref } from "vue";
import { useLDClient } from "launchdarkly-vue-client-sdk";

defineProps({
  toggleLoginDialog: Function,
});

const username = ref();
const password = ref();
const secret = ref(true);

const store = useAppStore();

const client = useLDClient();

const login = (toggleLoginDialog) => {
  client.identify({
    anonymous: false,
    key: username.value,
  });
  if (toggleLoginDialog) toggleLoginDialog();
  setTimeout(() => {
    store.login({ username: username.value });
    username.value = null;
    password.value = null;
  }, 100);
};
</script>
