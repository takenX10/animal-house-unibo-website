<style>
@import "https://pro.fontawesome.com/releases/v5.9.0/css/all.css";
@import "@/assets/css/game_selection/style.css";
@import 'mdb-vue-ui-kit/css/mdb.min.css';


.hide-cell {
 opacity: 0;
}
</style>

<script setup>
import { MDBBtn,MDBRow,MDBCol,MDBContainer,MDBListGroup,MDBListGroupItem,MDBFile, MDBSpinner } from "mdb-vue-ui-kit";
</script>

<template>
  <main :id="name" >
      <MDBContainer class="text-center">
        <MDBRow>
          <div aria-live="polite" class="fw-bold">Score: {{ score }}</div>
        </MDBRow>
        <MDBRow>
          <div aria-live="polite" class="fw-bold" aria-label="status">{{ status }}</div>
        </MDBRow>
        <div v-if="!loading">
          <MDBRow class="mx-auto" aria-live="polite" aria-atomic="true">
            <MDBCol v-for="(image,i) in cells.slice(0,4)" class="col-3 my-4 mx-auto" style="height:10em !important; width:15em !important;">
              <div class="border border-gray border-5 rounded bg-white" style="width: 100%; height: 100%">
                <input type="image"  @click="cellClicked(i)"  :src="image" :id="i" tabindex="0" class="hide-cell" :alt="i+'-image'" style="width: 100%; height: 100%"/>
              </div>
            </MDBCol>
          </MDBRow>
          <MDBRow class="mx-auto" aria-live="polite" aria-atomic="true">
            <MDBCol v-for="(image,i) in cells.slice(4,8)" class="col-3 my-4 mx-auto" style="height:10em !important; width:15em !important;">
              <div class="border border-gray border-5 rounded bg-white" style="width: 100%; height: 100%">
                <input type="image"  @click="cellClicked(i+4)"  :src="image" :id="i+4" tabindex="0" class="hide-cell" :alt="(i+4)+'-image'" style="width: 100%; height: 100%"/>
              </div>
            </MDBCol>
          </MDBRow>
          <MDBRow class="mx-auto" aria-live="polite" aria-atomic="true">
            <MDBCol v-for="(image,i) in cells.slice(8,12)" class="col-3 my-4 mx-auto" style="height:10em !important; width:15em !important;">
              <div class="border border-gray border-5 rounded bg-white" style="width: 100%; height: 100%">
                <input type="image"  @click="cellClicked(i+8)"  :src="image" :id="i+8" tabindex="0" class="hide-cell" :alt="(i+8)+'-image'" style="width: 100%; height: 100%"/>
              </div>
            </MDBCol>
          </MDBRow>
          <MDBRow class="mx-auto" aria-live="polite" aria-atomic="true">
            <MDBCol v-for="(image,i) in cells.slice(12,16)" class="col-3 my-4 mx-auto" style="height:10em !important; width:15em !important; ">
              <div class="border border-gray border-5 rounded bg-white" style="width: 100%; height: 100%">
                <input type="image"  @click="cellClicked(i+12)"  :src="image" :id="i+12" tabindex="0" class="hide-cell" :alt="(i+12)+'-image'" style="width: 100%; height: 100%"/>
              </div>
            </MDBCol>
          </MDBRow>
        </div>
        <MDBRow class="mt-2" v-if="winStatus">
          <div  class="alert alert-success" role="alert">
            You won! 
          </div>
          <MDBBtn raised @click="generate()">Play again</MDBBtn>
        </MDBRow>
        <div v-if="loading">
          <MDBSpinner />
        </div>
      </MDBContainer>

  </main>
</template>

<script>
import { save_score } from '@/context/utils.jsx';

let name = "Memory"

export default {
  name: name,
  components: {
  },

  data() {
    return {
      loading: false,
      errors: 0,
      score: 100,
      status: "Choose a cell",
      winStatus: false,
      images: [],
      cells: [],
      guessed: [],
      first: -1,
      second: -1,
      interval: null
    }
  },
  methods: {
    shuffle: function (array) {
      array.sort(() => Math.random() - 0.5);
    },
    resetCell: function() {
        $(`#${this.first}`).addClass("hide-cell"); 
        $(`#${this.second}`).addClass("hide-cell"); 
        this.first = -1;
        this.second = -1;
        this.status = "Choose a cell";
    },
    guessedCell: function() {
        this.status = "Correct";
        this.guessed.push(this.first,this.second)
        this.first = -1;
        this.second = -1;
        if (this.guessed.length == this.cells.length){
          this.win();
        }
    },
    win: function() {
      this.winStatus = true;
      save_score(this.score, "memory");
    },
    cellClicked: function(i) {
      clearInterval(this.interval);
      if (this.guessed.includes(i))
        return;
      if (this.first == -1)
        this.first = i;
      else if (this.second == -1 )
      {
        if (this.first == i)
          return;
        this.second = i;
        if ($(`#${this.first}`).attr("src") == $(`#${this.second}`).attr("src"))
        {
          this.guessedCell();
        }
        else {
          this.status = "Wrong";
          this.errors++;
          this.score--;
          this.interval = setInterval(() => {
            this.resetCell();
          }, 750)
        }
      }
      else 
      {
        // close all
        this.resetCell();
        this.first = i;
      }
      $(`#${i}`).removeClass("hide-cell"); 
    },
    generate: async function() {
        this.errors = 0;   
        this.score = 100;
        this.loading = true;
        this.winStatus = false;
        this.guessed = [];
        try {
          let c = 0;
          for (let i = 0; i < 8; i++) {
            let res = await (await fetch(`${this.BACKEND_SERVER}/api/randomimage`)).json();
            this.images[i] = res.data.image;
            this.cells[c] = this.images[i];
            c++;
            this.cells[c] = this.images[i];
            c++;
          }
          this.shuffle(this.cells);
          this.loading = false;
        }catch(e) {
          this.loading = false;
        }
    },
    answerClicked: function (answer) {
      if (answer == this.correct)
      {
        this.streak++;
        save_score(this.streak,"memory");
      }
      else 
        this.streak = 0;
    }
  },
  created() {
    this.generate();
  }
}
</script>

<style lang="scss">
</style>
