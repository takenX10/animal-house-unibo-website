import { GameStatus, type GameResult } from "@/assets/js/wordle/types"
import { defineStore } from "pinia"

export const LOCAL_STORAGE_KEY = "gamestats"

export const useStats = defineStore("stats", {
  state: () => ({
    currentStreak: 0,
    longestStreak: 0,
    totalGamesPlayed: 0,
    totalGamesWon: 0,
    totalScore: 0,
  }),
  actions: {
    initialize() {
      const localStorageState = localStorage.getItem(LOCAL_STORAGE_KEY)
      if (localStorageState) {
        const savedState = JSON.parse(localStorageState)
        this.$patch(savedState)
      }
    },
    addStats(result: GameResult) {
      if (result.cheated) {
        // Do not add stats if the user cheated (ie looked at the word)
        return
      }
      this.totalGamesPlayed++
      if (result.status === GameStatus.WIN) {
        this.totalScore += result.score
        this.totalGamesWon++
        this.currentStreak++
        if (this.currentStreak > this.longestStreak) {
          this.longestStreak = this.currentStreak
        }
      } else {
        this.currentStreak = 0
      }
    }
  }
})
