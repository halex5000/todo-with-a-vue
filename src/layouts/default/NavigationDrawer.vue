<template>
  <v-navigation-drawer
    expand-on-hover
    rail
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
        prepend-icon="mdi-account-box"
        title="Login"
        subtitle="Login to unlock features!"
      >
        <v-menu
          v-model="dialog"
          activator="parent"
          :close-on-content-click="false"
        >
          <v-sheet width="500" class="mx-auto">
            <v-form @submit.prevent>
              <v-toolbar color="primary">
                <v-toolbar-title class="text-h5">Login</v-toolbar-title>
                <v-spacer></v-spacer
              ></v-toolbar>
              <v-container>
                <v-row>
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
                      @click="save()"
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
import { useRouter } from "vue-router";
import { ref } from "vue";

const isToDoListEnabled = useLDFlag("to-do-list");
const isLoginEnabled = useLDFlag("login");
const router = useRouter();
const dialog = ref(false);
const username = ref();
const password = ref();
const secret = ref(true);

const login = () => {};
</script>
