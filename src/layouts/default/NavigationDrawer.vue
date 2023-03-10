<template>
  <v-navigation-drawer
    expand-on-hover
    :rail="!dialog && !mobile"
    v-if="isLoginEnabled || isToDoListEnabled"
  >
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
        v-if="isLoginEnabled"
        :prepend-icon="store.user ? 'mdi-account-cancel' : 'mdi-account-box'"
        :title="store.user ? 'Welcome' : 'Login'"
        :subtitle="
          store.user
            ? `Logged in as ${store.user.username}`
            : 'Login to unlock features!'
        "
      >
        <v-menu
          v-model="dialog"
          activator="parent"
          :close-on-content-click="false"
          location="end"
        >
          <v-sheet :width="store.user ? -1 : 500" class="mx-auto">
            <v-form @submit.prevent>
              <v-toolbar color="primary" v-if="!store.user">
                <v-toolbar-title class="text-h5">"Login"</v-toolbar-title>
                <v-spacer></v-spacer
              ></v-toolbar>
              <v-container>
                <v-row v-if="store.user"
                  ><v-col>
                    <v-btn
                      type="submit"
                      color="warning"
                      class="mt-2"
                      @click="logout()"
                    >
                      Logout
                    </v-btn></v-col
                  ></v-row
                >
                <v-row v-if="!store.user">
                  <v-col cols="12" md="12">
                    <v-text-field
                      v-model="username"
                      label="Username"
                    ></v-text-field>
                    <v-text-field
                      v-model="password"
                      label="Password"
                      :type="secret ? 'password' : 'text'"
                      :append-icon="secret ? 'mdi-eye-off' : 'mdi-eye'"
                      counter
                      @click:append="secret = !secret"
                    ></v-text-field>
                    <v-btn
                      type="submit"
                      color="primary"
                      block
                      class="mt-2"
                      @click="login()"
                    >
                      Login
                    </v-btn>
                  </v-col></v-row
                ></v-container
              >
            </v-form>
          </v-sheet>
        </v-menu>
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
import { useAppStore } from "@/store/app";
import { useDisplay } from "vuetify";
import { useRouter } from "vue-router";
import { ref } from "vue";

const { mobile } = useDisplay();
const isToDoListEnabled = useLDFlag("to-do-list");
const isLoginEnabled = useLDFlag("login");
const router = useRouter();
const dialog = ref(false);
const username = ref();
const password = ref();
const secret = ref(true);

const store = useAppStore();
const login = () => {
  dialog.value = false;
  setTimeout(() => {
    store.login({ username: username.value });
    username.value = null;
    password.value = null;
  }, 100);
};

const logout = () => {
  dialog.value = false;
  setTimeout(() => {
    store.logout();
  }, 100);
};
</script>
