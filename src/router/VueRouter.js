// Author : Gianmaria Rovelli

import { createRouter, createWebHistory } from 'vue-router'
import { createApp } from 'vue'
import AppVue from '@/App.vue'
import VueCarousel from 'vue-carousel';
import { createPinia } from "pinia"
import BootstrapVue3 from 'bootstrap-vue-3';
import BalmUI from 'balm-ui'; // Official Google Material Components
import BalmUIPlus from 'balm-ui-plus'; // BalmJS Team Material Components
import 'balm-ui-css';

export const VueRoutes = [
    {
        path: '/games/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (About.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('../views/vue/AboutView.vue')
    },
    {
        path: '/games/memory',
        name: 'memory',
        component: () => import('../views/vue/games/Memory.vue')
    },
    {
        path: '/games/wordle',
        name: 'wordle',
        component: () => import('../views/vue/games/Wordle.vue')
    },
    {
        path: '/games/hangman',
        name: 'hangman',
        component: () => import('../views/vue/games/Hangman.vue')
    },
    {
        path: '/games',
        name: 'games',
        component: () => import('../views/vue/games/GameSelectionView.vue')
    },
    {
        path: '/games/slider',
        name: 'slider',
        component: () => import('../views/vue/games/Slider.vue')
    }
]

export function isInVueRoutes() {
    let p = window.location.pathname;
    for (var i = 0; i < VueRoutes.length; i++) {
        if (p == VueRoutes[i].path)
            return true;
    }
    return false;
}

export const VueRouter = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: VueRoutes
})

export const CreateVueApp = () => {
    const app = createApp(AppVue)
    app.use(createPinia())
    app.use(BootstrapVue3)
    app.use(VueRouter)
    app.use(BalmUI);
    app.use(BalmUIPlus);
    app.use(VueCarousel)
    app.mount('#app')
};


