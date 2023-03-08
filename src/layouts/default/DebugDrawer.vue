<template>
  <v-navigation-drawer
    theme="dark"
    v-if="isDebugEnabled"
    v-model="drawer"
    location="bottom"
    :rail="rail"
    @click="rail = false"
    permanent
    class="bg-black"
  >
    <v-card class="d-flex justify-center" title="Debug Panel">
      <template v-slot:append>
        <v-btn
          variant="text"
          icon="mdi-chevron-down"
          v-if="!rail"
          @click.stop="rail = !rail"
        ></v-btn>
      </template>
    </v-card>
    <v-container>
      <v-toolbar elevation="5" color="blue-grey" dark>
        <v-toolbar-title class="text-center">Items in State</v-toolbar-title>
      </v-toolbar>
      <v-divider class="my-2"></v-divider>
      <v-item-group :items="stateItems">
        <v-row>
          <v-col v-for="item in stateItems" :key="item.key">
            <v-item>
              <v-card
                width="300"
                :title="item.key"
                variant="outlined"
                append-icon="mdi-state-machine"
              >
                <v-card-text>
                  <VueJsonPretty :data="item.value"></VueJsonPretty>
                </v-card-text>
              </v-card>
            </v-item>
          </v-col>
        </v-row>
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
