<template>
  <main class="gameboard">
    <section class="gameboard__content" :style="style">
      <game-board-cell
        v-for="(cell, index) in board.state"
        :value="cell.value"
        :state="cell.state"
        :key="index"
      ></game-board-cell>
    </section>
  </main>
</template>

<script setup lang="ts">
import { computed } from "vue"
import GameBoardCell from "@/components/vue/games/wordle/GameGridCell.vue"
import type { Board } from "@/assets/js/wordle/board"

interface Props {
  board: Partial<Board>
}

const props = defineProps<Props>()

const style = computed(() => {
  return {
    gridTemplateColumns: `repeat(${props.board.width}, 1fr)`,
  }
})
</script>

<style lang="scss" scoped>
.gameboard {
  display: flex;
  justify-content: center;
  &__content {
    display: grid;
    gap: 10px;
  }
}

</style>
