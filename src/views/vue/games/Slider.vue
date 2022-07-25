<template>
  <div :id="name" class="container-fluid">
    <header>
      <h1>{{name}}</h1>
    </header>

    <div class="row">
      <div class="col mx-auto text-center">
        <Board ref="board" v-show="playing" @restart="restart" />
      </div>
    </div>

    <div class="row">
      <div class="col mx-auto text-center">
        <OptionsPane ref="optionsPane" @gameStart="start" v-show="!playing" />
      </div>
    </div>
  </div>
</template>

<script>
import Board from '@/components/vue/games/slider/Board.vue'
import OptionsPane from '@/components/vue/games/slider/OptionsPane.vue'

let name = "Slider"

export default {
  name: name,
  components: {
    Board,
    OptionsPane
  },

  data() {
    return {
      playing: false
    }
  },

  methods: {
    start(...args) {
      this.playing = true
      this.$refs.board.start(...args)
    },

    restart() {
      this.playing = false
      this.$refs.optionsPane.reset()
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/css/slider/style.css";
</style>
