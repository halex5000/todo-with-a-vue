<template>
  <div></div>
</template>

<script setup>
import UAParser from "ua-parser-js";
import { useAppStore } from "@/store/app";
import { watch } from "vue";
import { useLDFlag } from "launchdarkly-vue-client-sdk";

const debugAllowList = useLDFlag("debug-panel-allow-list");
watch(debugAllowList, async (newList) => {
  store.updateAllowList(newList);
});

const parser = new UAParser();
const browserInfo = parser.getResult();
const store = useAppStore();
store.addBrowserInfo(browserInfo);

// store.updateAllowList();
// console.debug("captured browser info", browserInfo);
</script>
