// Author : Gianmaria Rovelli

<style>
@import "https://pro.fontawesome.com/releases/v5.9.0/css/all.css";
@import "@/assets/css/game_selection/style.css";
</style>

<script>
import { defineAsyncComponent } from "vue";

// import Memory from '@/views/vue/games/Memory.vue'
const Memory = defineAsyncComponent(() =>
  import("@/views/vue/games/Memory.vue")
);
// import Hangman from '@/views/vue/games/Hangman.vue'
const Hangman = defineAsyncComponent(() =>
  import("@/views/vue/games/Hangman.vue")
);
// import Wordle from '@/views/vue/games/Wordle.vue'
const Wordle = defineAsyncComponent(() =>
  import("@/views/vue/games/Wordle.vue")
);
// import Slider from '@/views/vue/games/Slider.vue'
const Slider = defineAsyncComponent(() =>
  import("@/views/vue/games/Slider.vue")
);

import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";

import GameHeader from "./GameHeader.vue";
//import $toast from "balm-ui/plugins/toast";
import { useEvent } from "balm-ui";

let game = "";
let games = [
 // {
   // title: "Memory",
    //component: "Memory",
    //color: "",
 // },
  {
    title: "Hangman",
    component: "Hangman",
    color: "",
  },
  {
    title: "Wordle",
    component: "Wordle",
    color: "",
  },
  {
    title: "Slider",
    component: "Slider",
    color: "",
  },
];

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
    GameHeader,
  },
  data() {
    return {
      component: game,
      games: games,
      funnyvideo: "",
      random_fact: "",
      dog_breed_loading: false,
      dog_breed_guesses: [],
      cat_breed_loading: false,
      cat_breed_guesses: [],
      balmUI: useEvent(),
      files: [],
    };
  },
  methods: {
    refreshPage: function () {
      this.$forceUpdate();
    },
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
      this.component = "";
      location.hash = "#";
    },
    updateScoreboard: async function (g) {
      if (!g) return;
      let res = await fetch(
        `${this.BACKEND_SERVER}/api/scoreboard/${String(g)}`
      );
      let data = await res.json();
      if (data.status == "ok") {
        this.scoreboards = data.data;
        this.refreshPage();
      }
    },
    showRandomFact: async function () {
      let res = await fetch(`${this.BACKEND_SERVER}/api/randomfact`);
      let data = await res.json();
      if (data.status == "ok") {
        // $toast({ message: "Random fact : " + data.text, timeoutMs: 3500 })
        this.random_fact = data.text;
        this.refreshPage();
      }
    },
    getFunnyVideos: async function () {
      let res = await fetch(`${this.BACKEND_SERVER}/api/funnyvideo`);
      let data = await res.json();
      if (data.status == "ok") {
        this.funnyvideo = data.urls[0];
      }
    },
    uploadImageDogBreedRecognition: async function () {
      this.dog_breed_loading = true;
      this.dog_breed_guesses = [];
      this.refreshPage();

      let form = new FormData();
      form.append("dog", this.files[0].sourceFile);
      let res = await fetch(`${this.BACKEND_SERVER}/api/dogbreedrec`, {
        body: form,
        method: "POST",
      });
      let data = await res.json();
      if (data.status == "ok") {
        console.log(data);
        this.dog_breed_guesses = data.data;
        this.dog_breed_loading = false;
        this.refreshPage();
      }
    },
    uploadImageCatBreedRecognition: async function () {
      this.cat_breed_loading = true;
      this.cat_breed_guesses = [];
      this.refreshPage();

      let form = new FormData();
      var binaryData = [];
      binaryData.push(this.files[0].sourceFile); //My blob
      this.img_your_cat = URL.createObjectURL(new Blob(binaryData, {type:"image/*"}));
      form.append("cat", this.files[0].sourceFile);
      let res = await fetch(`${this.BACKEND_SERVER}/api/catbreedrec`, {
        body: form,
        method: "POST",
      });
      let data = await res.json();
      if (data.status == "ok") {
        console.log(data.data.results[0])
        this.cat_breed_guesses = data.data.results;
        this.cat_breed_loading = false;
        this.img_cat_breed = `${this.BACKEND_SERVER}/${data.data.results[0].img_name}`
        this.refreshPage();
      }
    },
    getCurr: function () {
      return this.component;
    },
  },
  created() {
    let game = location.hash.slice(1);
    this.changeGame(game);
  },
};
</script>

<template>
  <main class="container-fluid">
    <GameHeader class="mb-3" />
    <div v-if="component">
      <div class="row">
        <div class="col-1 mx-auto text-start">
          <i
            style="font-size: x-large; vertical-align: middle"
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
          >Scoreboard</b-button
        >
        <b-collapse id="collapse-1" style="width:100% !important; margin:0px auto !important;" class="mt-2 mx-auto text-center">
          <ui-list single-selection>
            <ui-item v-for="(user, i) in scoreboards" style="width:100% !important;" class="text-center mx-auto" :key="index">
            <span style="width: 100% !important;" >
              <ui-item-first-content>
                <i v-if="i == 0" class="fa fa-trophy"></i>
                <i v-if="i == 1 || i == 2" class="fa fa-medal"></i>
                <br />
                {{ user.score }}
              </ui-item-first-content>
              <ui-item-text-content> {{ user.username }}</ui-item-text-content>
              </span>
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
      <ui-grid class="text-center" id="funnyvideo_container" v-if="funnyvideo">
        <ui-grid-cell columns="12">
          <div class="fw-bold section_header">In case you're a bit sad 🤣</div>
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

      <ui-grid class="text-center" id="dogbreedai-container">
        <ui-grid-cell columns="12">
          <div class="text-center fw-bold section_header">
            Do you want to find out what breed your dog is? 🧪👨🏼‍💻
          </div>
        </ui-grid-cell>

        <ui-grid-cell v-if="dog_breed_loading" columns="12" class="mx-auto">
          <ui-spinner active></ui-spinner>
        </ui-grid-cell>

        <ui-grid-cell
          v-if="dog_breed_guesses.length > 0"
          columns="12"
          class="mx-auto"
        >
          <div class="text-center fw-bold section_header_small">
            My guesses are :
          </div>
          <ui-list :type="2">
            <ui-item v-for="breed in dog_breed_guesses" :key="i">
              <ui-item-text-content class="mx-auto">
                <ui-item-text1 class="dog_breed_guesses">{{
                  breed.name
                }}</ui-item-text1>
                <ui-item-text2>{{ breed.perc }} %</ui-item-text2>
              </ui-item-text-content>
            </ui-item>
          </ui-list>
        </ui-grid-cell>

        <ui-grid-cell columns="12">
          <ui-file
            text="ABSOLUTELY"
            accept="image/*"
            @change="
              balmUI.onChange('files', $event);
              uploadImageDogBreedRecognition();
            "
          ></ui-file>
        </ui-grid-cell>
      </ui-grid>

      <ui-grid class="text-center" id="catbreedai-container">
        <ui-grid-cell columns="12">
          <div class="text-center fw-bold section_header">
            Do you want to find out what breed your <b>cat</b> is? 🧪👨🏼‍💻
          </div>
        </ui-grid-cell>

        <ui-grid-cell v-if="cat_breed_loading" columns="12" class="mx-auto">
          <ui-spinner active></ui-spinner>
        </ui-grid-cell>

        <ui-grid-cell
          v-if="cat_breed_guesses.length > 0"
          columns="12"
          class="mx-auto text-center"
        >
        <ui-grid>
         <ui-grid-cell :columns="{default:2, phone:12}" class="mx-auto">
          <img :src=img_your_cat columns="2" class="mx-auto text-center" width="100" height="100" />
          </ui-grid-cell>
        <ui-grid-cell columns="8">
          <div class="text-center mx-auto fw-bold section_header_small">
            My guesses are :
          </div>
          <ui-list :type="2">
            <ui-item v-for="breed in cat_breed_guesses" :key="i">
              <ui-item-text-content class="mx-auto">
                <ui-item-text1 class="cat_breed_guesses">{{
                  breed.name
                }}</ui-item-text1>
                <ui-item-text2>{{ breed.perc }} %</ui-item-text2>
              </ui-item-text-content>
            </ui-item>
          </ui-list>
          </ui-grid-cell>
         <ui-grid-cell :columns="{default:2, phone:12}" class="mx-auto">
          <img :src=img_cat_breed columns="2" class="mx-auto text-center" width="100" height="100" />
          </ui-grid-cell>
        </ui-grid>
        </ui-grid-cell>

        <ui-grid-cell columns="12">
          <ui-file
            text="ABSOLUTELY"
            accept="image/*"
            @change="
              balmUI.onChange('files', $event);
              uploadImageCatBreedRecognition();
            "
          ></ui-file>
        </ui-grid-cell>
      </ui-grid>

      <ui-grid class="text-center" id="randomfact_container" v-if="random_fact">
        <ui-grid-cell columns="12">
          <ui-grid-cell columns="12">
            <div class="fw-bold section_header">🧠 Did you know that ...</div>
          </ui-grid-cell>
          <ui-grid-cell columns="12">
            <div class="fw-bold">{{ random_fact }}</div>
          </ui-grid-cell>
        </ui-grid-cell>
      </ui-grid>
    </div>
    <div class="games-area mb-5">
      <div class="fw-bold text-center section_header">
        Are you getting bored?
      </div>
      <carousel :items-to-show="3" style="margin: 0 10px 0 10px">
        <slide class="item" v-for="game in games" :key="game">
          <div>
            <!-- <h4>{{ game.title }}</h4> -->
            <!-- <ui-icon-button>videogame_asset</ui-icon-button> -->
            <ui-button raised @click="changeGame(game.component)">{{
              game.title
            }}</ui-button>
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
