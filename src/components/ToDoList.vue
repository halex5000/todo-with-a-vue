<template>
  <v-container class="fill-height">
    <v-responsive class="d-flex fill-height">
      <div class="text-body-2 font-weight-light text-center mb-n1">
        Welcome to
      </div>
      <h1 class="text-h2 font-weight-bold text-center">ToDo List with a Vue</h1>
      <div class="py-2" />
      <v-card class="mx-auto" max-width="600" elevation="20">
        <v-toolbar color="primary">
          <v-toolbar-title>ToDo List</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon v-if="isCreateToDoItemEnabled">
            <v-icon>mdi-note-plus</v-icon>
            <v-menu
              v-model="dialog"
              activator="parent"
              :close-on-content-click="false"
            >
              <v-sheet width="500" class="mx-auto">
                <v-form @submit.prevent>
                  <v-toolbar color="secondary">
                    <v-toolbar-title class="text-h4">New ToDo</v-toolbar-title>
                    <v-spacer></v-spacer
                  ></v-toolbar>
                  <v-container>
                    <v-row>
                      <v-col cols="12" md="12">
                        <v-text-field
                          v-model="title"
                          persistent-placeholder
                          placeholder="Learn how to use Feature Flags to ship faster"
                          label="Title*"
                        ></v-text-field>
                        <v-textarea
                          placeholder="Let's start by using feature flags in our Vue application using the LaunchDarkly Vue SDK"
                          persistent-placeholder
                          label="Description*"
                          v-model="description"
                          counter
                        ></v-textarea>
                        <v-btn type="submit" block class="mt-2" @click="save()">
                          Save
                        </v-btn>
                      </v-col></v-row
                    ></v-container
                  >
                </v-form>
              </v-sheet>
            </v-menu>
          </v-btn>
        </v-toolbar>
        <v-list lines="three" select-strategy="classic">
          <v-list-item v-for="todo in store.sortedTodos" :key="todo.title">
            <template v-slot:prepend>
              <v-list-item-action>
                <v-checkbox-btn
                  @click.stop="completeToDo(todo.id)"
                  :model-value="todo.isComplete"
                ></v-checkbox-btn>
              </v-list-item-action>
            </template>
            <template v-slot:append>
              <v-list-item-action end v-if="isDeleteToDoItemEnabled">
                <v-btn @click.stop="deleteToDo(todo.id)" color="error" icon>
                  <v-icon>mdi-trash-can</v-icon>
                  <v-tooltip
                    location="bottom"
                    :text="`Delete ${todo.id}`"
                    activator="parent"
                  >
                  </v-tooltip>
                </v-btn>
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
import { ref } from "vue";
import { useLDFlag } from "launchdarkly-vue-client-sdk";
const isCreateToDoItemEnabled = useLDFlag("create-to-do-item");
const isDeleteToDoItemEnabled = useLDFlag("delete-to-do-item");

const store = useAppStore();
const dialog = ref(false);
const description = ref();
const title = ref();

const deleteToDo = (id) => {
  store.removeToDo(id);
};

const save = () => {
  store.addTodo({
    title: title.value,
    description: description.value,
  });
  description.value = "";
  title.value = "";
  dialog.value = false;
};
</script>
