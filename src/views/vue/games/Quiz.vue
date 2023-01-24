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
    <header>
      <h1>{{name}}</h1>
    </header>
      <!-- <MDBContainer class="text-center"> -->
      <!-- ciao -->
      <!--   <MDBRow> -->
      <!--     <div class="fw-bold">Quanti gatti ho?</div> -->
      <!--   </MDBRow> -->
      <!--   <MDBRow> -->
      <!--     <MDBCol class="mx-auto col-sm-12 col-md-8 "> -->
      <!--     </MDBCol> -->
      <!--   </MDBRow> -->
      <!-- </MDBContainer> -->

  </main>
</template>

<script>

let name = "Quiz"

export default {
  name: name,
  components: {
  },

  data() {
    return {
    }
  },

  methods: {
  }
}
</script>

<style lang="scss">
</style>
