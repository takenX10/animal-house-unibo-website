// Author : Gianmaria Rovelli

<style>
@import "https://pro.fontawesome.com/releases/v5.9.0/css/all.css";
@import "@/assets/css/game_selection/style.css";
@import 'mdb-vue-ui-kit/css/mdb.min.css';
</style>

<script setup>
import { MDBBtn,MDBRow,MDBCol,MDBContainer,MDBListGroup,MDBListGroupItem,MDBFile, MDBSpinner } from "mdb-vue-ui-kit";
</script>

<script >
import { defineAsyncComponent, ref } from "vue";

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
        `${this.BACKEND_SERVER}/api/scoreboard/${String(g).toLowerCase()}`
      );
      let data = await res.json();
      if (data.success == true && data.data.length > 0) {
        this.scoreboards = data.data;
        this.refreshPage();
      }
    },
    showRandomFact: async function () {
      let res = await fetch(`${this.BACKEND_SERVER}/api/randomfact`);
      let data = await res.json();
      if (data.success == true) {
        // $toast({ message: "Random fact : " + data.text, timeoutMs: 3500 })
        this.random_fact = data.text;
        this.refreshPage();
      }
    },
    getFunnyVideos: async function () {
      let res = await fetch(`${this.BACKEND_SERVER}/api/funnyvideo`);
      let data = await res.json();
      if (data.success == true) {
        this.funnyvideo = data.urls[0];
      }
    },
    uploadImageDogBreedRecognition: async function (event) {
      let file = event.target.files[0]
      this.dog_breed_loading = true;
      this.dog_breed_guesses = [];
      this.refreshPage();

      let form = new FormData();
      form.append("dog", file);
      let res = await fetch(`${this.BACKEND_SERVER}/api/dogbreedrec`, {
        body: form,
        method: "POST",
      });
      let data = await res.json();
      if (data.success == true) {
        console.log(data);
        this.dog_breed_guesses = data.data;
        this.dog_breed_loading = false;
        this.refreshPage();
      }
    },
    uploadImageCatBreedRecognition: async function (event) {
      let file = event.target.files[0]
      this.cat_breed_loading = true;
      this.cat_breed_guesses = [];
      this.refreshPage();

      let form = new FormData();
      var binaryData = [];
      binaryData.push(file); //My blob
      this.img_your_cat = URL.createObjectURL(new Blob(binaryData, {type:"image/*"}));
      form.append("cat", file);
      let res = await fetch(`${this.BACKEND_SERVER}/api/catbreedrec`, {
        body: form,
        method: "POST",
      });
      let data = await res.json();
      if (data.success == true) {
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
        <b-button
          class="col col-lg-8 col-md-8 col-sm-8 mx-auto"
          v-b-toggle.collapse-1
          variant="primary"
          >Scoreboard</b-button
        >
        <b-collapse id="collapse-1" style="width:100% !important; margin:0px auto !important;" class="mt-2 mx-auto text-center">
          <MDBListGroup single-selection>
            <MDBListGroupItem v-for="(user, i) in scoreboards" style="width:100% !important;" class="text-center mx-auto" :key="i">
            <span style="width: 100% !important;" >
              <div>
                <i v-if="i == 0" class="fa fa-trophy"></i>
                <i v-if="i == 1 || i == 2" class="fa fa-medal"></i>
                <br />
                
              </div>
              <div> {{ user.score }} - {{ user.author}}</div>
              </span>
            </MDBListGroupItem>
            <hr />
          </MDBListGroup>
        </b-collapse>
      </div>
    </div>
    <div v-else>
      <MDBContainer class="text-center" id="funnyvideo_container" v-if="funnyvideo">
        <MDBRow>
          <div class="fw-bold section_header">In case you're a bit sad 🤣</div>
        </MDBRow>
        <MDBRow>
        <MDBCol class="mx-auto col-sm-12 col-md-8 ">
          <iframe
            width="100%"
            height
            :src="funnyvideo"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
          </MDBCol>
        </MDBRow>
      </MDBContainer>

      <MDBContainer class="text-center mt-4" id="dogbreedai_container">
        <MDBRow columns="12"> 
        <div class="text-center fw-bold section_header">
            Do you want to find out what breed your dog is? 🧪👨🏼‍💻
          </div>
        </MDBRow>

        <MDBRow v-if="dog_breed_loading" class="mx-auto text-center">
        <MDBCol>
          <MDBSpinner />
          </MDBCol>
        </MDBRow>

        <MDBRow
          v-if="dog_breed_guesses.length > 0"
          class="mx-auto"
        >
          <div class="text-center fw-bold section_header_small">
            My guesses are :
          </div>
          <MDBListGroup>
            <MDBListGroupItem v-for="breed in dog_breed_guesses" :key="breed">
              <div class="mx-auto">
                <div class="dog_breed_guesses">{{
                  breed.name
                }}</div >
                <div>{{ breed.perc }} %</div>
              </div>
            </MDBListGroupItem>
          </MDBListGroup>
        </MDBRow>

        <MDBRow class="mx-auto text-center"> 
        <MDBCol col="4" class="mx-auto" >
          <MDBFile
            text="ABSOLUTELY"
            accept="image/*"
            @change=uploadImageDogBreedRecognition
          ></MDBFile>
        </MDBCol>
        </MDBRow>
      </MDBContainer>

      <MDBContainer class="text-center mt-4" id="catbreedai_container">
        <MDBRow columns="12">
          <div class="text-center fw-bold section_header">
            Do you want to find out what breed your <b>cat</b> is? 🧪👨🏼‍💻
          </div>
        </MDBRow>

        <MDBRow v-if="cat_breed_loading" class="mx-auto text-center">
        <MDBCol>
          <MDBSpinner />
          </MDBCol>
        </MDBRow>

        <MDBRow
          v-if="cat_breed_guesses.length > 0"
          class="mx-auto text-center"
        >
        <MDBContainer>
         <MDBRow  class="mx-auto">
         <MDBCol sm="12" md="12"  class="mx-auto text-center"  >
          <img :src=img_your_cat width="100" height="100" />
          </MDBCol>

         <MDBCol sm="12" md="12" class="mx-auto text-center"  >
          <div class="text-center mx-auto fw-bold section_header_small">
            My guesses are :
          </div>
          <MDBListGroup :type="2">
            <MDBListGroupItem v-for="breed in cat_breed_guesses" :key="breed">
              <div class="mx-auto">
                <div class="cat_breed_guesses">{{
                  breed.name
                }}</div >
                <div>{{ breed.perc }} %</div>
              </div>
            </MDBListGroupItem>
          </MDBListGroup>
          </MDBCol>

         <MDBCol sm="12" md="12" class="mx-auto text-center"  >
          <img :src=img_cat_breed columns="2" class="mx-auto text-center" width="100" height="100" />
          </MDBCol>
          </MDBRow>
        </MDBContainer>
        </MDBRow>

        <MDBRow class="mx-auto text-center"> 
        <MDBCol col="4" class="mx-auto" >
          <MDBFile
            text="ABSOLUTELY"
            accept="image/*"
            @change=uploadImageCatBreedRecognition
          ></MDBFile>
        </MDBCol>
        </MDBRow>

      </MDBContainer>

      <MDBContainer class="text-center mt-4" id="randomfact_container" v-if="random_fact">
          <MDBRow >
            <div class="fw-bold section_header">🧠 Did you know that ...</div>
          </MDBRow>
          <MDBRow >
            <div class="fw-bold">{{ random_fact }}</div>
          </MDBRow>
      </MDBContainer>
    </div>

      <MDBContainer class="game-area text-center my-4" id="randomfact_container" v-if="random_fact">
          <MDBRow >
      <div class="fw-bold text-center section_header">
        Are you getting bored?
      </div>
          </MDBRow >
          <MDBRow class="mx-auto text-center" >
          <MDBCol class="col-sm-12 col-md-8 mx-auto">
      <carousel :items-to-show="3" style="margin: 0 10px 0 10px">
        <slide class="item" v-for="game in games" :key="game">
          <div>
            <!-- <h4>{{ game.title }}</h4> -->
            <!-- <ui-icon-button>videogame_asset</ui-icon-button> -->
            <MDBBtn raised @click="changeGame(game.component)">{{
              game.title
            }}</MDBBtn>
          </div>
        </slide>

        <template #addons>
          <navigation />
          <!-- <pagination class="margin-left: -20px !important" /> -->
        </template>
      </carousel>
      </MDBCol>
          </MDBRow >
  </MDBContainer>
  </main>
</template>
