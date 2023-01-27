<style>
@import "https://pro.fontawesome.com/releases/v5.9.0/css/all.css";
@import "@/assets/css/game_selection/style.css";
@import 'mdb-vue-ui-kit/css/mdb.min.css';
</style>

<script setup>
import { MDBBtn,MDBRow,MDBCol,MDBContainer,MDBListGroup,MDBListGroupItem,MDBFile, MDBSpinner } from "mdb-vue-ui-kit";
</script>

<template>
  <main :id="name" >
      <MDBContainer class="text-center">
        <MDBRow>
          <div id="streak" aria-live="polite" class="fw-bold">Correct : {{ streak }}</div>
        </MDBRow>
        <div v-if="!loading">
        <MDBRow>
          <div id="question" class="fw-bold">{{ question }}</div>
        </MDBRow>
        <MDBRow id="answers" v-for="answer in answers" aria-live="polite">
          <MDBCol class="mx-auto col-sm-12 col-md-8 ">
            <MDBBtn aria-controls="streak" raised @click="answerClicked(answer)">{{ answer }}</MDBBtn>
          </MDBCol>
        </MDBRow>
        </div>
        <div v-if="loading">
          <MDBSpinner />
        </div>
      </MDBContainer>

  </main>
</template>

<script>
import { save_score } from '@/context/utils.jsx';

let name = "Quiz"

export default {
  name: name,
  components: {
  },

  data() {
    return {
      loading: false,
      streak: 0,
      question: "",
      answers: [],
      correct: ""
    }
  },
  methods: {
    showQuiz: async function () {
      this.loading = true;
      let res = await fetch(`${this.BACKEND_SERVER}/api/quiz`);
      let data = await res.json();
      this.loading = false;
      if (data.success == true) {
        this.question = data.data.question;
        this.answers = data.data.answers;
        this.correct = data.data.correct;
        this.$forceUpdate();
      }
    },
    answerClicked: function (answer) {
      if (answer == this.correct)
      {
        this.streak++;
        save_score(this.streak,"quiz");
      }
      else 
        this.streak = 0;
      this.showQuiz();
    }
  },
  created() {
    this.showQuiz();
  }
}
</script>

<style lang="scss">
</style>
