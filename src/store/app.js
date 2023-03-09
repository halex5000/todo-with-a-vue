// Utilities
import { defineStore } from "pinia";

const starterTodos = [
  {
    title: "Create a Vue ToDo Application",
    description: "We need a new Vue application to keep track of ToDos",
    isComplete: true,
    index: 0,
  },
  {
    title: "Capture browser info",
    description:
      "To support debugging and advanced targeting, we need to be able to capture browser info",
    isComplete: true,
    index: 2,
  },
  {
    title: "Create a base list of ToDos",
    description: "Our project roadmap should be in our ToDo list",
    isComplete: true,
    index: 1,
  },
  {
    title: "Provide the ability to Login",
    description:
      "To support delivering features to specific users, we need them to be able to login",
    isComplete: false,
    index: 3,
  },
  {
    title: "Support ToDo item creation",
    description: "Users will need to be able to add their own ToDo list items",
    isComplete: true,
    index: 4,
  },
  {
    title: "Support ToDo item deletion",
    description: "Users may want to delete ToDo items at times",
    isComplete: true,
    index: 5,
  },
  {
    title: "Validate input when creating a ToDo item",
    description:
      "To get meaningful data, we'll need some validation on user input",
    isComplete: false,
    index: 7,
  },
  {
    title: "Support local storage of ToDo list",
    description:
      "Users want persistent ToDo lists and local storage could help support this",
    isComplete: false,
    index: 6,
  },
  {
    title: "Support remote storage of ToDo List",
    description:
      "Users may want persistent ToDo lists across their devices and to support mobile, we'll need a remote storage facility for ToDo items",
    isComplete: false,
    index: 9,
  },
  {
    title: "Migrate to trusted auth provider",
    description:
      "A trusted auth provider will give us a common mechanism for login and allow us to partition users' lists from one another",
    isComplete: false,
    index: 8,
  },
];

export const useAppStore = defineStore("app", {
  state: () => ({
    browser: null,
    engine: null,
    operatingSystem: null,
    device: null,
    cpu: null,
    userAgent: null,
    count: 0,
    todos: [...starterTodos],
  }),
  getters: {
    sortedTodos: (state) =>
      state.todos.sort((todoA, todoB) => {
        if (todoA.index > todoB.index) return 1;
        if (todoA.index < todoB.index) return -1;
        return 0;
      }),
    allState: (state) => {
      const stateEntries = Object.entries(state);
      const entries = stateEntries
        .filter((entry) => {
          const [key, value] = entry;
          return (
            typeof value !== "function" &&
            key.match(/^[a-zA-Z0-9]/i) &&
            !key.startsWith("allState")
          );
        })
        .map((entry) => {
          const [key, value] = entry;
          return {
            key,
            value,
          };
        });
      // console.debug('non-function entries', entries);
      return entries;
    },
  },
  actions: {
    addBrowserInfo(browserInfo) {
      const { browser, engine, ua, os, device, cpu } = browserInfo;
      this.browser = browser;
      this.engine = engine;
      this.userAgent = ua;
      this.operatingSystem = os;
      this.device = device;
      this.cpu = cpu;
    },
    increment() {
      this.count++;
      console.log("updated count is", this.count);
    },
    randomizeCounter() {
      this.count = Math.round(100 * Math.random());
    },
    removeToDo(index) {
      this.todos = this.todos.filter((todo) => todo.index !== index);
    },
    addTodo(todo) {
      let index = 0;
      if (this.todos && this.todos.length) {
        index = this.sortedTodos[this.todos.length - 1].index + 1;
      }
      this.todos.push({
        ...todo,
        isComplete: false,
        index,
      });
    },
  },
});
