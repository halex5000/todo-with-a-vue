<template>
  <v-container class="fill-height">
    <v-responsive class="d-flex align-center text-center fill-height">
      <v-img
        contain
        :height="mobile ? 100 : 300"
        :src="theme.global.name.value === 'dark' ? darkModeLogo : lightModeLogo"
      />
      <br />
      <div class="text-body-2 font-weight-light mb-n1">Welcome to</div>

      <h1 class="text-h2 font-weight-bold">Dark Launching with a Vue</h1>

      <h4>{{ store?.user?.username }}</h4>

      <div class="py-14" />

      <v-row
        v-if="carouselItems && carouselItems.length"
        class="d-flex align-center justify-center"
      >
        <link-carousel />
      </v-row>
      <v-row v-else class="d-flex align-center justify-center">
        <v-col cols="auto">
          <v-btn
            href="https://docs.launchdarkly.com/sdk/client-side"
            min-width="164"
            rel="noopener noreferrer"
            target="_blank"
            variant="text"
          >
            <v-icon icon="mdi-code-braces-box" size="xx-large" start />

            SDKs
          </v-btn>
        </v-col>

        <v-col cols="auto">
          <v-btn
            color="primary"
            href="https://academy.launchdarkly.com/"
            min-width="228"
            rel="noopener noreferrer"
            size="x-large"
            target="_blank"
            variant="flat"
          >
            <v-icon icon="mdi-school" size="xx-large" start />

            LaunchDarkly Academy
          </v-btn>
        </v-col>

        <v-col cols="auto">
          <v-btn
            href="https://docs.launchdarkly.com/home"
            min-width="164"
            rel="noopener noreferrer"
            target="_blank"
            variant="text"
          >
            <v-icon icon="mdi-text-box-search" size="xx-large" start />

            Docs
          </v-btn>
        </v-col>
      </v-row>
    </v-responsive>
  </v-container>
</template>

<script setup>
import { useAppStore } from "@/store/app";
import { useLDFlag } from "launchdarkly-vue-client-sdk";
import { useDisplay } from "vuetify/lib/framework.mjs";
import { useTheme } from "vuetify/lib/framework.mjs";
import LinkCarousel from "./LinkCarousel.vue";
import darkModeLogo from "@/assets/dark-mode-logo.png";
import lightModeLogo from "@/assets/light-mode-logo.png";

const { mobile } = useDisplay();
const theme = useTheme();

const store = useAppStore();

const carouselItems = useLDFlag("carousel-items");
</script>
