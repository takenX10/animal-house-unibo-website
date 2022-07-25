<template>
  <div class="wordle">
    <!-- <app-header></app-header> -->
    <game-board :getCurr="getCurr"></game-board>
  </div>
  <!-- <app-footer></app-footer> -->
</template>

<script>
import AppHeader from "@/components/vue/games/wordle/AppHeader.vue"
import AppFooter from "@/components/vue/games/wordle/AppFooter.vue"
import GameBoard from "@/components/vue/games/wordle/GameBoard.vue"
import { useGame, LOCAL_STORAGE_KEY } from "@/assets/js/wordle/game"
import { useStats, LOCAL_STORAGE_KEY as STATS_LOCAL_STORAGE_KEY } from "@/assets/js/wordle/stats"

const game = useGame()
game.initialize()
game.$subscribe(
  (m, state) => {
    const copy = Object.assign({}, state)
    copy.errors = []
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(copy))
  },
  { detached: true }
)
const stats = useStats()
stats.initialize()
stats.$subscribe(
  (m, state) => {
    localStorage.setItem(STATS_LOCAL_STORAGE_KEY, JSON.stringify(state))
  },
  { detached: true }
)

export default {
  components: {
    AppHeader, AppFooter, GameBoard
  },
  props: {
    getCurr: { type: Function },
  },
}
</script>

<style scoped>

.wordle {
  background-color: var(--bg-color-game);
  padding-bottom: 10px;
}

</style>