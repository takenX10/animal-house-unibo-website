import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/vue/HomeView.vue'

export const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/vue/AboutView.vue')
  },
  {
    path: '/memory',
    name: 'memory',
    component: () => import('../views/vue/Memory.vue')
  },
  {
    path: '/wordle',
    name: 'wordle',
    component: () => import('../views/vue/Wordle.vue')
  },
  {
    path: '/hangman',
    name: 'hangman',
    component: () => import('../views/vue/Hangman.vue')
  },
  {
    path: '/memory',
    name: 'memory',
    component: () => import('../views/vue/Memory.vue')
  },
  {
    path: '/games',
    name: 'games',
    component: () => import('../views/vue/GameSelectionView.vue')
  },
  {
    path: '/slider',
    name: 'slider',
    component: () => import('../views/vue/Slider.vue')
  }
]

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})


