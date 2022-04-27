<style>
@import "https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css";
</style>

<script>
import Memory from '@/views/vue/Memory.vue'
import Hangman from '@/views/vue/Hangman.vue'
import Wordle from '@/views/vue/Wordle.vue'

import 'https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js'
import 'https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js'

let game = "Memory"

export default {
  components: {
    Wordle, Hangman, Memory
  },
  data() {
    return {
      component: game
    }
  }
}

</script>

<template>
  <main class="container">
    <div class></div>
    <keep-alive>
      <component v-bind:is="component" />
    </keep-alive>
  </main>
</template>
