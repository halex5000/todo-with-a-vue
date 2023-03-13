// Utilities
import { defineStore } from "pinia";
import { nanoid } from "nanoid";

const starterTodos = [
  {
    title: "Create a Vue ToDo Application",
    description: "We need a new Vue application to keep track of ToDos",
    isComplete: true,
    ordinalNumber: 0,
    id: nanoid(),
  },
  {
    title: "Capture browser info",
    description:
      "To support debugging and advanced targeting, we need to be able to capture browser info",
    isComplete: true,
    ordinalNumber: 2,
    id: nanoid(),
  },
  {
    title: "Create a base list of ToDos",
    description: "Our project roadmap should be in our ToDo list",
    isComplete: true,
    ordinalNumber: 1,
    id: nanoid(),
  },
  {
    title: "Provide the ability to Login",
    description:
      "To support delivering features to specific users, we need them to be able to login",
    isComplete: true,
    ordinalNumber: 3,
    id: nanoid(),
  },
  {
    title: "Support ToDo item creation",
    description: "Users will need to be able to add their own ToDo list items",
    isComplete: true,
    ordinalNumber: 4,
    id: nanoid(),
  },
  {
    title: "Support ToDo item deletion",
    description: "Users may want to delete ToDo items at times",
    isComplete: true,
    ordinalNumber: 5,
    id: nanoid(),
  },
  {
    title: "Validate input when creating a ToDo item",
    description:
      "To get meaningful data, we'll need some validation on user input",
    isComplete: false,
    ordinalNumber: 7,
    id: nanoid(),
  },
  {
    title: "Support local storage of ToDo list",
    description:
      "Users want persistent ToDo lists and local storage could help support this",
    isComplete: false,
    ordinalNumber: 6,
    id: nanoid(),
  },
];

const generateId = () => nanoid();

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
    user: null,
    debugAllowList: [],
  }),
  getters: {
    sortedTodos: (state) =>
      state.todos.sort((todoA, todoB) => {
        if (todoA.ordinalNumber > todoB.ordinalNumber) return 1;
        if (todoA.ordinalNumber < todoB.ordinalNumber) return -1;
        return 0;
      }),
    allState: (state) => {
      const stateEntries = Object.entries(state);
      const entries = stateEntries
        .filter((entry) => {
          const [key, value] = entry;
          return (
            state.debugAllowList.includes(key) &&
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
    login({ username }) {
      console.log("logging in as", username);
      this.user = {
        username,
      };
    },
    logout() {
      this.user = null;
    },
    removeToDo(id) {
      this.todos = this.todos.filter((todo) => todo.id !== id);
    },
    toggleToDoComplete(id) {
      this.todos = this.todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            isComplete: !todo.isComplete,
          };
        }
        return todo;
      });
    },
    addTodo(todo) {
      let index = 0;
      if (this.todos && this.todos.length) {
        index = this.sortedTodos[this.todos.length - 1].ordinalNumber + 1;
      }
      this.todos.push({
        ...todo,
        id: generateId(),
        isComplete: false,
        ordinalNumber: index,
      });
    },
    updateAllowList(allowList) {
      this.debugAllowList = allowList;
    },
  },
});
