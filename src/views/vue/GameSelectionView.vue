<style scoped>
@import "@/assets/css/game_selection/style.css";
.carousel__slide > .carousel__item {
  transform: scale(1);
  opacity: 0.5;
  transition: 0.5s;
}
.carousel__slide--visible > .carousel__item {
  opacity: 1;
  transform: rotateY(0);
}
.carousel__slide--next > .carousel__item {
  transform: scale(0.9) translate(-10px);
}
.carousel__slide--prev > .carousel__item {
  transform: scale(0.9) translate(10px);
}
.carousel__slide--active > .carousel__item {
  transform: scale(1.1);
}

.slide__item {
  max-height: 150px !important;
}

@media screen and (max-width: 768px) {
  .carousel__item {
    max-width: 80%;
  }
}

@media screen and (min-width: 768px) {
  .carousel__item {
    max-width: 60%;
  }
}

.carousel__item {
  cursor: pointer;
}
</style>

<script>

import Memory from '@/views/Memory.vue'
import Hangman from '@/views/Hangman.vue'
import Wordle from '@/views/Wordle.vue'

import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';

import '@/assets/js/game_selection/main.js';
import GameHeader from './GameHeader.vue';

let game = "Wordle"

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
      games: [
        "Memory",
        "Hangman",
        "Wordle"
      ],
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
    },
    getCurr: function () {
      return this.component
    }
  },
}

</script>

<template>
  <main class="container">
    <GameHeader />
    <!-- <vueper-slides>
      <vueper-slide v-for="i in 5" :key="i" :title="i.toString()" />
    </vueper-slides>-->
    <Carousel :autoplay="5000" :wrap-around="false" :settings="settings">
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
    </Carousel>
    <keep-alive>
      <component :getCurr="getCurr" v-bind:is="component" />
    </keep-alive>
  </main>
</template>
