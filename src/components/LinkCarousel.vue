<template>
  <v-carousel cycle height="400" hide-delimiter-background show-arrows="hover">
    <v-carousel-item v-for="(item, i) in carouselItems" :key="i">
      <v-sheet
        elevation="12"
        max-width="600"
        rounded="lg"
        width="100%"
        class="pa-4 text-center mx-auto"
      >
        <v-icon
          class="mb-5"
          color="success"
          :icon="item.icon"
          size="112"
        ></v-icon>

        <h2 class="text-h5 mb-6">{{ item.title }}</h2>

        <p class="mb-4 text-medium-emphasis text-body-1">
          {{ item.subtitle }}
        </p>

        <v-divider class="mb-4"></v-divider>

        <div class="text-end">
          <v-btn
            :href="item.link"
            min-width="164"
            rel="noopener noreferrer"
            target="_blank"
          >
            {{ item.label }}
          </v-btn>
        </div>
      </v-sheet>
    </v-carousel-item>
  </v-carousel>
</template>

<script setup>
import { useLDFlag } from "launchdarkly-vue-client-sdk";

const carouselItems = useLDFlag("carousel-items");
</script>
