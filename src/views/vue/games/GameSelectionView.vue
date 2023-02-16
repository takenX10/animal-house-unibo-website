// Author : Gianmaria Rovelli

<style>
@import "https://pro.fontawesome.com/releases/v5.9.0/css/all.css";
@import "@/assets/css/game_selection/style.css";
@import 'mdb-vue-ui-kit/css/mdb.min.css';
</style>

<script setup>
import { MDBBtn,MDBRow,MDBCol,MDBContainer,MDBListGroup,MDBListGroupItem,MDBFile, MDBSpinner, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardImg} from "mdb-vue-ui-kit";
</script>

<script >
import { defineAsyncComponent, ref } from "vue";

const Quiz = defineAsyncComponent(() =>
  import("@/views/vue/games/Quiz.vue")
);
const Memory = defineAsyncComponent(() =>
  import("@/views/vue/games/Memory.vue")
);
// import Memory from '@/views/vue/games/Memory.vue'
//const Memory = defineAsyncComponent(() =>
//  import("@/views/vue/games/Memory.vue")
//);
// import Hangman from '@/views/vue/games/Hangman.vue'
const Hangman = defineAsyncComponent(() =>
  import("@/views/vue/games/Hangman.vue")
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
  {
    title: "Quiz",
    component: "Quiz",
  },
  {
    title: "Memory",
    component: "Memory",
  },
  {
    title: "Hangman",
    component: "Hangman",
  },
  {
    title: "Slider",
    component: "Slider",
  },
];

export default {
  components: {
    Quiz,
    Memory,
    Hangman,
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
      random_fact_loading: false,
      shop_loading: false,
      products: [],
      dog_breed_loading: false,
      dog_breed_guesses: [],
      cat_breed_loading: false,
      cat_breed_guesses: [],
      files: [],
      scoreboards: [],
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
      this.showProducts();
    },
    goback: function () {
      this.component = "";
      location.hash = "#";
      this.showProducts();
    },
    shuffle: function (arr) {
      var currentIndex = arr.length, temporaryValue, randomIndex;

      while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = arr[currentIndex];
        arr[currentIndex] = arr[randomIndex];
        arr[randomIndex] = temporaryValue;
      }

      return arr;
    },
    showProducts: async function () {
      this.shop_loading = true;
      let res = await fetch(`${this.BACKEND_SERVER}/api/shop/products`);
      let data = await res.json();
      this.shop_loading = false;
      data = this.shuffle(data);
      this.products = data.slice(0,4);
      this.refreshPage();
    },
    updateScoreboard: async function (g) {
      if (!g) return;
      let res = await fetch(
        `${this.BACKEND_SERVER}/api/scoreboard/${String(g).toLowerCase()}`
      );
      let data = await res.json();
      if (data.success == true) {
        this.scoreboards = data.data;
      }
    },
    showRandomFact: async function () {
      this.random_fact_loading = true;
      let res = await fetch(`${this.BACKEND_SERVER}/api/randomfact`);
      let data = await res.json();
      this.random_fact_loading = false;
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
      let res = await fetch(`https://animal.xgampx.tk/dogrec`, {
        body: form,
        method: "POST",
      });
      let data = await res.json();
      if (data.success == true) {
        this.dog_breed_guesses = data.data.results;
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
      let res = await fetch(`https://animal.xgampx.tk/catrec`, {
        body: form,
        method: "POST",
      });
      let data = await res.json();
      if (data.success == true) {
        this.cat_breed_guesses = data.data.results;
        this.cat_breed_loading = false;
        this.img_cat_breed = `${this.BACKEND_SERVER}${data.data.results[0].img_name}`
        this.refreshPage();
      }
    },
    getCurr: function () {
      return this.component;
    },
    productClicked: function(slug) {
      window.location.href = `/shop/product/${slug}`;
    }
  },
  created() {
    let game = location.hash.slice(1);
    this.changeGame(game);
    this.updateScoreboard(game);
  },
};
</script>

<template>
    <GameHeader class="mb-3" />
  <main class="container-fluid" >
    <div v-if="component" aria-live="polite"  >
      <div class="row">
        <div class="col-1 mx-left text-start">
          <i
            style="font-size: x-large; vertical-align: middle"
            @click="goback"
            id="go-back"
            aria-label="go back"
            role="button"
            class="fa fa-angle-left pl-5"
          ></i>
        </div>
        </div>
      <div class="row">
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
        <MDBRow>
        <b-button
          class="col col-lg-6 col-md-6 col-sm-6 mx-auto my-bg mb-2"
          v-b-toggle.collapse-1
          >Scoreboard</b-button
        >
        </MDBRow>
        <MDBRow>
        <b-collapse id="collapse-1" style="width:50% !important; margin:0px auto !important;" class="mt-2 mx-auto text-center">
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
        </MDBRow>
      </div>
    </div>
    <div aria-live="polite"  v-else>
      <MDBContainer class="text-center" id="funnyvideo_container" v-if="funnyvideo">
        <MDBRow>
          <div class="fw-bold section_header">In case you're a bit sad 🤣</div>
        </MDBRow>
        <MDBRow>
        <MDBCol class="mx-auto col-sm-12 col-md-8 ">
          <iframe
            class="w-100"
            height="300"
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
          <MDBCol md="6" sm="12"  class="mx-auto" >
            <div class="text-center fw-bold section_header_small">
              My guesses are :
            </div>
            <MDBListGroup>
              <MDBListGroupItem v-for="breed in dog_breed_guesses" :key="breed">
                <div class="mx-auto">
                  <div class="dog_breed_guesses">{{
                    breed.breed
                  }}</div >
                  <div>{{ (Math.round(breed.confidence * 10000) / 100).toFixed(2) }} %</div>
                </div>
              </MDBListGroupItem>
            </MDBListGroup>
          </MDBCol>
        </MDBRow>

        <MDBRow class="mx-auto text-center"> 
        <MDBCol col="4" class="mx-auto" >
          <MDBFile
            label="Upload your dog image"
            role="button"
            tabindex="0"
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
          <MDBCol md="4" sm="12" class="mx-auto" >
            <div class="text-center mx-auto fw-bold section_header_small">
              My guesses are :
            </div>
            <MDBListGroup :type="2" aria-live="polite" aria-atomic="true">
              <MDBListGroupItem v-for="breed in cat_breed_guesses" :key="breed">
                <div class="mx-auto">
                  <div class="cat_breed_guesses">{{
                    breed.breed
                  }}</div >
                  <div>{{ (Math.round(breed.confidence * 10000) / 100).toFixed(2) }} %</div>
                </div>
              </MDBListGroupItem>
            </MDBListGroup>
          </MDBCol>

          </MDBRow>
        </MDBContainer>
        </MDBRow>

        <MDBRow class="mx-auto text-center"> 
        <MDBCol col="4" class="mx-auto" >
          <MDBFile
            label="Upload your cat image"
            role="button"
            tabindex="0"
            text="ABSOLUTELY"
            accept="image/*"
            @change=uploadImageCatBreedRecognition
          ></MDBFile>
        </MDBCol>
        </MDBRow>

      </MDBContainer>

      <MDBContainer class="text-center mt-4" id="randomfact_container" >
          <MDBRow >
            <div class="fw-bold section_header">🧠 Did you know that ...</div>
          </MDBRow>
          <MDBRow >
          <MDBCol class="col-sm-8 col-md-8 mx-auto text-center">
            <div class="fw-bold" aria-live="polite">{{ random_fact }}</div>
            <MDBSpinner v-if="random_fact_loading"/>
            </MDBCol>
          </MDBRow>
          <MDBRow >
          <MDBCol class="col-sm-12 col-md-12 mx-auto text-center mt-2" v-if="random_fact">
            <MDBBtn raised @click="showRandomFact()">What's next!</MDBBtn>
            </MDBCol>
          </MDBRow>
      </MDBContainer>
    </div>

      <MDBContainer class="game-area text-center my-4" id="games_container">
          <MDBRow >
      <div class="fw-bold text-center section_header">
        Are you getting bored?
      </div>
          </MDBRow >
          <MDBRow class="mx-auto mt-2 text-center" >
            <MDBCol class="col-sm-12 col-md-8 mx-auto">
              <MDBRow class="mx-auto text-center" >
                <MDBCol class="col-sm-3 mx-auto" v-for="game in games" :key="game">
                  <MDBBtn role="button" raised @click="changeGame(game.component);updateScoreboard(game.component);">{{
                    game.title
                  }}</MDBBtn>
                </MDBCol>
              </MDBRow >
            </MDBCol>
          </MDBRow >
  </MDBContainer>
  <MDBContainer class="text-center mt-4" id="shop_container">
      <MDBRow class="mb-2">
        <div class="fw-bold section_header">Take a look at our products !</div>
      </MDBRow>
      <MDBRow >
      <MDBCol class="col-sm-12 col-md-12 col-lg-8 col-xs-12 mx-auto text-center" aria-live="polite">
        <MDBSpinner v-if="shop_loading"/>
          <MDBRow v-if="!shop_loading && products && products.length > 0">
              <MDBCol class="col-6 mx-auto text-center mb-2" height="100" v-for="(prod, i) in products">
                <MDBCard class="mx-auto" style="height:350px">
                  <MDBCardImg
                    :src="BACKEND_SERVER + '/' + prod.poster"
                    style="height: 100%; max-height: 150px; width: 100%; max-width: 150px !important;"
                    top
                    class="mx-auto" 
                    :alt="'poster' + prod.poster"
                  />
                  <MDBCardBody>
                    <MDBCardTitle> {{ prod.name }} </MDBCardTitle>
                    <MDBCardText>
                     {{ prod.description }} 
                    </MDBCardText>
                    <MDBBtn class="my-bg" @click="productClicked(prod.slug)">{{prod.price }}$</MDBBtn>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
          </MDBRow>
        </MDBCol>
      </MDBRow>
 </MDBContainer>
  </main>
</template>
