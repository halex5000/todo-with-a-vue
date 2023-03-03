// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/DefaultLayout.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/HomeView.vue'),
      },
      {
        path: 'todo-list',
        name: 'ToDo List with a Vue',
        component: () => import(/* webpackChunkName: 'todo-list' */ '@/views/ToDoList.vue')
      },
      {
        path: '/:pathMatch(.*)*',
        name: 'Not Found',
        component: () => import(/* webpackChunkName: 'not-found' */ '@/views/NotFound.vue')
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
