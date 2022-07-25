// Author : Gianmaria Rovelli

<style>
@import "https://pro.fontawesome.com/releases/v5.9.0/css/all.css";
@import "@/assets/css/game_selection/style.css";
</style>

<script>

import Memory from '@/views/vue/games/Memory.vue'
import Hangman from '@/views/vue/games/Hangman.vue'
import Wordle from '@/views/vue/games/Wordle.vue'
import Slider from '@/views/vue/games/Slider.vue'

import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';

import { runOnReady, ResCarouselSize } from '@/assets/js/game_selection/main.js';
import GameHeader from './GameHeader.vue';
import { useToast } from 'balm-ui/plugins/toast';
const $toast = useToast();

const BACKEND_SERVER = 'http://192.168.1.8:8000'

let game = ""
let games = [
  {
    "title": "Memory",
    "component": "Memory",
    "color": ""
  },
  {
    "title": "Hangman",
    "component": "Hangman",
    "color": ""
  },
  {
    "title": "Wordle",
    "component": "Wordle",
    "color": ""
  },
  {
    "title": "Slider",
    "component": "Slider",
    "color": ""
  }
]

export default {
  components: {
    Wordle,
    Hangman,
    Memory,
    Slider,
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
      this.component = g;
      location.hash = "#" + g;
      this.updateScoreboard(g);
      this.showRandomFact();
      if (!g) {
        this.getFunnyVideos();
      }
    },
    goback: function () {
      this.component = ""
      location.hash = "#"
    },
    updateScoreboard: function (g) {
      if (!g) return
      fetch(`${BACKEND_SERVER}/api/scoreboard/${String(g)}`)
        .then((data) => data.json()).then((data) => {
          this.scoreboards = data.data;
          console.log(this.scoreboards)
          this.$forceUpdate();
        })
    },
    showRandomFact: function () {
      fetch(`${BACKEND_SERVER}/api/randomfact`)
        .then((data) => data.json()).then((data) => {
          // $toast({ message: "Random fact : " + data.text, timeoutMs: 3500 })
          this.random_fact = data.text;
          this.$forceUpdate();
        })
    },
    getFunnyVideos: function () {
      fetch(`${BACKEND_SERVER}/api/funnyvideo`)
        .then((data) => data.json())
        .then((data) => {
          console.log(data.urls[0])
          this.funnyvideo = data.urls[0];
          this.$forceUpdate();
        })
    },
    getCurr: function () {
      return this.component
    },
    ResCarouselSize: ResCarouselSize
  },
  created() {
    let game = location.hash.slice(1);
    this.changeGame(game);
  },
}

</script>

<template>
  <main class="container-fluid">
    <GameHeader class="mb-3" />
    <div v-if="component">
      <div class="row">
        <div class="col-1 mx-auto text-start">
          <i
            style="font-size: x-large; vertical-align: middle;"
            @click="goback"
            id="go-back"
            class="fa fa-angle-left pl-5"
          ></i>
        </div>
        <div class="col mx-auto text-center">
          <h1>{{ component }}</h1>
        </div>
      </div>
      <keep-alive>
        <component :getCurr="getCurr" v-bind:is="component" />
      </keep-alive>
      <!-- <vueper-slides>
      <vueper-slide v-for="i in 5" :key="i" :title="i.toString()" />
      </vueper-slides>-->
      <div v-if="scoreboards" class="row mb-5 mt-4 mx-5">
        <ui-divider></ui-divider>
        <b-button
          class="col col-lg-8 col-md-8 col-sm-8 mx-auto"
          v-b-toggle.collapse-1
          variant="primary"
        >Scoreboard</b-button>
        <b-collapse id="collapse-1" class="mt-2">
          <ui-list single-selection>
            <ui-item v-for="(user, i) in scoreboards" :key="index">
              <ui-item-first-content>
                <i v-if="i == 0" class="fa fa-trophy"></i>
                <i v-if="i == 1 || i == 2" class="fa fa-medal"></i>
                <br />
                {{ user.score }}
              </ui-item-first-content>
              <ui-item-text-content>{{ user.username }}</ui-item-text-content>
            </ui-item>
            <hr />
          </ui-list>
        </b-collapse>
      </div>
    </div>
    <div v-else>
      <!-- <ui-grid class="game-list-container text-center">
        <ui-grid-cell v-for="game in games" :key="game">
          <div class="title">
            <h4>{{ game.title }}</h4>
          </div>

          <div class="text">
            <span></span>
          </div>

          <div class="btn btn-primary" v-on:click="changeGame(game.component)">Play now!</div>
        </ui-grid-cell>
      </ui-grid>-->
      <ui-grid v-if="funnyvideo">
        <ui-grid-cell columns="12">
          <div class="text-center fw-bold section_header">In case you're a bit sad 🤣</div>
        </ui-grid-cell>
        <ui-grid-cell columns="12">
          <iframe
            width="100%"
            height
            :src="funnyvideo"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </ui-grid-cell>
      </ui-grid>
      <ui-grid v-if="random_fact">
        <ui-grid-cell columns="12">
          <ui-grid-cell columns="12">
            <div class="text-center fw-bold section_header">🧠 Did you know that ...</div>
          </ui-grid-cell>
          <ui-grid-cell columns="12">
            <div class="text-center fw-bold">{{ random_fact }}</div>
          </ui-grid-cell>
        </ui-grid-cell>
      </ui-grid>
    </div>
    <div class="games-area mb-5">
      <div class="fw-bold text-center section_header">Are you getting bored?</div>
      <carousel :items-to-show="3" style="margin: 0 10px 0 10px;">
        <slide class="item" v-for="game in games" :key="game">
          <div>
            <!-- <h4>{{ game.title }}</h4> -->
            <!-- <ui-icon-button>videogame_asset</ui-icon-button> -->
            <ui-button raised @click="changeGame(game.component)">{{ game.title }}</ui-button>
          </div>
        </slide>

        <template #addons>
          <navigation />
          <!-- <pagination class="margin-left: -20px !important" /> -->
        </template>
      </carousel>
    </div>
  </main>
</template>
