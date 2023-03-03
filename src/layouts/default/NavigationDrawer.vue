<template>
  <v-navigation-drawer expand-on-hover rail>
    <v-list>
      <v-list-item
        v-if="isLoginEnabled"
        prepend-icon="mdi-account-box"
        title="Login"
      >
      </v-list-item>
    </v-list>
    <v-list>
      <v-list-item
        prepend-icon="mdi-clipboard-list"
        subtitle="Your handy dandy ToDo List"
        title="ToDo List"
        v-if="isToDoListEnabled"
      >
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
  import { useLDFlag } from 'launchdarkly-vue-client-sdk'
  const isToDoListEnabled = useLDFlag('to-do-list')
  const isLoginEnabled = useLDFlag('login')
</script>
