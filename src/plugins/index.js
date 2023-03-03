/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import { loadFonts } from './webfontloader'
import vuetify from './vuetify'
import pinia from '../store'
import router from '../router'
import { LDPlugin as LaunchDarkly } from 'launchdarkly-vue-client-sdk'

const launchDarklyClientSideID = import.meta.env.VITE_LAUNCHDARKLY_CLIENT_SDK_KEY

export function registerPlugins (app) {
  loadFonts()
  app
    .use(vuetify)
    .use(router)
    .use(pinia)
    .use(LaunchDarkly, {clientSideID: launchDarklyClientSideID})
}
