import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

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
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/memory',
    name: 'memory',
    component: () => import('../views/Memory.vue')
  },
  {
    path: '/wordle',
    name: 'wordle',
    component: () => import('../views/Wordle.vue')
  },
  {
    path: '/hangman',
    name: 'hangman',
    component: () => import('../views/Hangman.vue')
  },
  {
    path: '/memory',
    name: 'memory',
    component: () => import('../views/Memory.vue')
  },
  {
    path: '/games',
    name: 'games',
    component: () => import('../views/Games.vue')
  }
]

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})


