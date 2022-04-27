<style>
@import "https://pro.fontawesome.com/releases/v5.9.0/css/all.css";
@import "@/assets/css/game_selection/style.css";
</style>

<script>

import Memory from '@/views/Memory.vue'
import Hangman from '@/views/vue/Hangman.vue'
import Wordle from '@/views/Wordle.vue'

import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';

import { runOnReady, ResCarouselSize } from '@/assets/js/game_selection/main.js';
import GameHeader from './GameHeader.vue';
import { PhTicket } from 'phosphor-vue';
import { nextTick } from 'vue';

let game = ""
let games = [
  {
    "title": "Memory",
    "component": "Memory",
    "color": ""
  },
  {
    "title": "L'impiccato",
    "component": "Hangman",
    "color": ""
  },
  {
    "title": "Wordle",
    "component": "Wordle",
    "color": ""
  }
]

export default {
  components: {
    Wordle,
    Hangman,
    Memory,
    Carousel,
    Slide,
    Pagination,
    Navigation,
    GameHeader
  },
  data() {
    return {
      component: game,
      games: games,
      expanded: true,
      settings: {
        itemsToShow: 2,
        snapAlign: 'center',
      },
      // breakpoints are mobile first
      // any settings not specified will fallback to the carousel settings
      breakpoints: {
        // 350px and up
        350: {
          itemsToShow: 1.5,
          snapAlign: 'center',
        },
        // 700px and up
        700: {
          itemsToShow: 3.5,
          snapAlign: 'center',
        },
        // 1024 and up
        1024: {
          itemsToShow: 5,
          snapAlign: 'center',
        },
      },
    }
  },
  methods: {
    changeGame: function (g) {
      this.component = g
      Vue.nextTick(() => {
        runOnReady()
      })
    },
    goback: function () {
      this.component = ""
    },
    getCurr: function () {
      return this.component
    },
    ResCarouselSize: ResCarouselSize
  },
}

</script>

<template>
  <main class="container">
    <GameHeader class="mb-3"/>
    <div v-if="component">
      <div class="row">
        <div class="col mx-auto">
          <h2>
            <i @click="goback" id="go-back" class="fa fa-angle-left pl-5"></i>
          </h2>
        </div>
      </div>
      <keep-alive>
        <component :getCurr="getCurr" v-bind:is="component" />
      </keep-alive>
      <!-- <vueper-slides>
      <vueper-slide v-for="i in 5" :key="i" :title="i.toString()" />
      </vueper-slides>-->
      <div class="row mb-5 mt-4">
        <b-button
          @click="ResCarouselSize"
          class="col col-lg-8 col-md-8 col-sm-8 mx-auto"
          v-b-toggle.collapse-1
          variant="primary"
        >Altri giochi</b-button>
        <b-collapse id="collapse-1" class="mt-2">
          <!-- <Carousel :autoplay="5000" :wrap-around="false" :settings="settings">
            <Slide
              v-on:click="changeGame(g)"
              v-for="g in games"
              :key="g"
              class="mx-auto slide__item"
            >
              <div class="carousel__item">{{ g }}</div>
            </Slide>

            <template #addons>
              <Pagination />
              <Navigation />
            </template>
          </Carousel>-->
          <div class="row">
            <div
              class="MultiCarousel col col-lg-8 col-md-8 col-sm-8 mx-auto"
              data-items="1,2,3,4,5,6"
              data-slide="1"
              id="MultiCarousel"
              data-interval="1000"
            >
              <div class="MultiCarousel-inner">
                <div class="item" v-for="game in games">
                  <div class="">
                    <h4>{{game.title}}</h4>
                    <div class="btn btn-primary" v-on:click="changeGame(game.component)">Gioca ora!</div>
  
                  </div>
                </div>
              </div>
              <button class="btn btn-primary leftLst">&lt;</button>
              <button class="btn btn-primary rightLst">&gt;</button>
            </div>
          </div>
        </b-collapse>
      </div>
    </div>
    <div v-else>
      <div class="row">
        <h1 class="col mx-auto text-center">Giochi</h1>
      </div>
      <div id="game-list-container" class="row">
        <div v-for="game in games" :key="game" class="col-lg-4 col-md-4 col-sm-4 col-xs-2">
          <div class="box-part text-center">
            <i class="fa fa-instagram" aria-hidden="true"></i>

            <div class="title">
              <h4>{{ game.title }}</h4>
            </div>

            <div class="text">
              <span></span>
            </div>

            <div class="btn btn-primary" v-on:click="changeGame(game.component)">Gioca ora!</div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
