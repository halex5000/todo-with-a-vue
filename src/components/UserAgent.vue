<template>
  <div></div>
</template>

<script setup>
import UAParser from "ua-parser-js";
import { useAppStore } from "@/store/app";
const parser = new UAParser();
const browserInfo = parser.getResult();
const store = useAppStore();
store.addBrowserInfo(browserInfo);
console.debug("captured browser info", browserInfo);
</script>
