// Utilities
import { defineStore } from "pinia";
import { nanoid } from "nanoid";

const starterTodos = [
  {
    title: "Create a Vue ToDo Application",
    description: "We need a new Vue application to keep track of ToDos",
    isComplete: true,
    ordinalNumber: 0,
    id: "1234",
  },
  {
    title: "Capture browser info",
    description:
      "To support debugging and advanced targeting, we need to be able to capture browser info",
    isComplete: true,
    ordinalNumber: 2,
    id: "2345",
  },
  {
    title: "Create a base list of ToDos",
    description: "Our project roadmap should be in our ToDo list",
    isComplete: true,
    ordinalNumber: 1,
    id: "3456",
  },
  {
    title: "Provide the ability to Login",
    description:
      "To support delivering features to specific users, we need them to be able to login",
    isComplete: true,
    ordinalNumber: 3,
    id: "4567",
  },
  {
    title: "Support ToDo item creation",
    description: "Users will need to be able to add their own ToDo list items",
    isComplete: true,
    ordinalNumber: 4,
    id: "5678",
  },
  {
    title: "Support ToDo item deletion",
    description: "Users may want to delete ToDo items at times",
    isComplete: true,
    ordinalNumber: 5,
    id: "6789",
  },
  {
    title: "Validate input when creating a ToDo item",
    description:
      "To get meaningful data, we'll need some validation on user input",
    isComplete: false,
    ordinalNumber: 7,
    id: "7891",
  },
  {
    title: "Support local storage of ToDo list",
    description:
      "Users want persistent ToDo lists and local storage could help support this",
    isComplete: false,
    ordinalNumber: 6,
    id: "8910",
  },
  {
    title: "Support remote storage of ToDo List",
    description:
      "Users may want persistent ToDo lists across their devices and to support mobile, we'll need a remote storage facility for ToDo items",
    isComplete: false,
    ordinalNumber: 9,
    id: "9101",
  },
  {
    title: "Migrate to trusted auth provider",
    description:
      "A trusted auth provider will give us a common mechanism for login and allow us to partition users' lists from one another",
    isComplete: false,
    ordinalNumber: 8,
    id: "1011",
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
  },
});
