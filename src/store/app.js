// Utilities
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    browser: null,
    engine: null,
    operatingSystem: null,
    device: null,
    cpu: null,
    userAgent: null,
    count: 0,
  }),
  getters: {
    allState: (state) => {
      const stateEntries = Object.entries(state)
      const entries = stateEntries.filter(entry => {
        const [key, value] = entry;
        return typeof value !== 'function' && key.match(/^[a-zA-Z0-9]/i) && !key.startsWith('allState')
      }).map(entry => {
        const [key, value] = entry;
        return {
          key,
          value
        }
      })
      console.log('non-function entries', entries);
      return entries;
    }
  },
  actions: {
    addBrowserInfo(browserInfo) {
      const {browser, engine, ua, os, device, cpu} = browserInfo;
      console.log('captured browser info', browserInfo)
      this.browser = browser;
      this.engine = engine;
      this.userAgent = ua;
      this.operatingSystem = os;
      this.device = device;
      this.cpu = cpu;
    },
    increment() {
      this.count++
      console.log('updated count is', this.count);
    },
    randomizeCounter() {
      this.count = Math.round(100 * Math.random())
    },
  }
})
