<template>
  <v-container class="fill-height">
    <v-responsive class="d-flex text-center fill-height">
      <div class="text-body-2 font-weight-light mb-n1">Welcome to</div>

      <h1 class="text-h2 font-weight-bold">ToDo List with a Vue</h1>

      <div class="py-14" />

      <v-row class="d-flex align-center justify-center">
        <v-col cols="auto">
          <v-list lines="two">
            <v-list-item
              v-for="todo in todos"
              :key="todo.title"
              :title="todo.title"
              :subtitle="todo.description"
            >
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
    </v-responsive>
  </v-container>
</template>

<script setup>
  import {ref} from 'vue'
  const todos = ref([
    {
      title: 'something',
      description: 'something else'
    }
  ])
</script>
