<template>
  <v-navigation-drawer
    location="bottom"
    :width="600"
    permanent
    density="compact"
  >
    <v-card class="d-flex justify-center" title="Debug Panel">
      <template v-slot:append>
        <v-btn @click="toggleDebugDrawer()" icon="mdi-chevron-down"></v-btn>
      </template>
    </v-card>
    <v-container>
      <v-toolbar elevation="5" dark>
        <v-toolbar-title class="text-center">Items in State</v-toolbar-title>
      </v-toolbar>
      <v-divider class="my-2"></v-divider>
      <v-item-group :items="stateItems">
        <v-col v-for="item in stateItems" :key="item.key">
          <v-item>
            <v-expansion-panels>
              <v-expansion-panel
                :title="item.key"
                variant="outlined"
                append-icon="mdi-state-machine"
              >
                <v-expansion-panel-text>
                  <VueJsonPretty :data="item.value"></VueJsonPretty>
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-item>
        </v-col>
      </v-item-group>
    </v-container>
  </v-navigation-drawer>
</template>

<script setup>
import { useAppStore } from "@/store/app";
import { storeToRefs } from "pinia";
import VueJsonPretty from "vue-json-pretty";
import "vue-json-pretty/lib/styles.css";

defineProps({
  toggleDebugDrawer: Function,
});

const store = useAppStore();
const { allState: stateItems } = storeToRefs(store);
</script>
