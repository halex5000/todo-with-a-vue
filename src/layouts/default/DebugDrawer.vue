<template>
  <v-navigation-drawer
    theme="dark"
    v-if="isDebugEnabled"
    v-model="drawer"
    location="right"
    width="600"
    rail-width="50"
    :rail="rail"
    @click="rail = false"
    permanent
  >
    <span style="writing-mode: vertical-rl" class="text-h6 ma-2" v-if="rail"
      >Debug Panel</span
    >
    <v-card class="d-flex justify-center" title="Debug Panel" v-if="!rail">
      <template v-slot:append>
        <v-btn
          variant="text"
          icon="mdi-chevron-right"
          v-if="!rail"
          @click.stop="rail = !rail"
        ></v-btn>
      </template>
    </v-card>
    <v-container v-if="!rail">
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
import { ref } from "vue";
import { useLDFlag } from "launchdarkly-vue-client-sdk";
import { useAppStore } from "@/store/app";
import { storeToRefs } from "pinia";
import VueJsonPretty from "vue-json-pretty";
import "vue-json-pretty/lib/styles.css";

const isDebugEnabled = useLDFlag("debug-panel");
const store = useAppStore();
const { allState: stateItems } = storeToRefs(store);
let drawer = true;
let rail = ref(true);
</script>
