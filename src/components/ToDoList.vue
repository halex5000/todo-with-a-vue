<template>
  <v-container class="fill-height">
    <v-responsive class="d-flex fill-height">
      <div class="text-body-2 font-weight-light text-center mb-n1">
        Welcome to
      </div>
      <h1 class="text-h2 font-weight-bold text-center">ToDo List with a Vue</h1>
      <div class="py-2" />
      <v-card class="mx-auto" max-width="400">
        <v-toolbar color="primary">
          <v-toolbar-title>ToDo List</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-list lines="three" select-strategy="classic">
          <v-list-item v-for="todo in store.todos" :key="todo.title">
            <template v-slot:prepend="{ isActive }">
              <v-list-item-action start>
                <v-checkbox-btn :model-value="isActive"></v-checkbox-btn>
              </v-list-item-action>
            </template>
            <v-list-item-title>{{ todo.title }}</v-list-item-title>
            <v-list-item-subtitle>{{ todo.description }}</v-list-item-subtitle>
          </v-list-item>
          <v-divider></v-divider>
        </v-list>
      </v-card>
    </v-responsive>
  </v-container>
</template>

<script setup>
import { useAppStore } from "@/store/app";

const store = useAppStore();
</script>
