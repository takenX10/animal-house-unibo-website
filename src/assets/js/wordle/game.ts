import { defineStore } from "pinia"
import Keyboard from "@/assets/js/wordle/keyboard"
import Board from "@/assets/js/wordle/board"
import Wordle from "@/assets/js/wordle/wordle"
import { GameStatus, type GameResult, type ValidKey, ValidKey as EnumValidKey } from "@/assets/js/wordle/types"
import { watch } from "vue"
import { useStats } from "./stats"
import { save_score } from "@/context/utils.jsx";

export const LOCAL_STORAGE_KEY = "gamestate"
const DEFAULT_WORD_LENGTH = 5

const name = "Wordle"

export const useGame = defineStore(name, {
  state: () => ({
    length: DEFAULT_WORD_LENGTH,
    availableLengths: [3, 4, 5, 6, 7, 8],
    wordle: new Wordle(DEFAULT_WORD_LENGTH),
    board: new Board(DEFAULT_WORD_LENGTH, DEFAULT_WORD_LENGTH + 1),
    keyboard: new Keyboard(),
    cheated: false,
    over: false,
    errors: [] as string[],
    result: {} as GameResult,
    getCurr: () => { },
    focusKey: 0,
  }),
  getters: {
    word: (state) => state.wordle.word,
    guesses: (state) => state.board.currentRow + 1,
    isValid: (state) => {
      return (w: string) => {
        return state.wordle.isValid(w)
      }
    },
    isCorrect: (state) => {
      return (w: string) => {
        return state.wordle.isCorrect(w)
      }
    },
  },
  actions: {
    initialize() {
      const localStorageState = localStorage.getItem(LOCAL_STORAGE_KEY)
      if (localStorageState) {
        const savedState = JSON.parse(localStorageState)
        this.$patch(savedState)
      }
      if (import.meta.env.DEV) {
        console.info("The word to guess is:", this.word)
      }
      watch(
        () => [...this.errors],
        (newVal, oldVal) => {
          if (newVal.length < oldVal.length) {
            return
          }
          setTimeout(() => {
            this.errors.pop()
          }, 2000)
        }
      )
    },
    setGetCurr(f) {
      this.getCurr = f;
    },
    handleArrow(key) {
      if (this.getCurr() != name) return;
      let keyboard = this.keyboard.state
      keyboard = keyboard.slice(0, keyboard.length)
      let len = keyboard.length;
      if (key.toUpperCase() == "ARROWRIGHT") {
        if (this.focusKey > len - 1) {
          this.focusKey = 0;
        }
        else ++this.focusKey;

        let el = document.getElementById("wordle_btn_" + this.focusKey)
        if (el) el.focus()
      }
      if (key.toUpperCase() == "ARROWLEFT") {
        if (this.focusKey <= 0) {
          this.focusKey = len;
        }
        else
          --this.focusKey;
        let el = document.getElementById("wordle_btn_" + this.focusKey)
        if (el) el.focus()
      }
    },
    handleSpace() {
      if (this.getCurr() == name) {
        let keyboard = this.keyboard.state
        keyboard = keyboard.slice(0, keyboard.length)
        let len = keyboard.length;

        let el = document.getElementById("wordle_btn_" + this.focusKey)
        let key;
        if (!el || !el.innerText) {
          if (this.focusKey >= len - 1) {
            this.handleBackspace();
          } else this.handleSubmit();

          return
        } else {
          key = el.innerText as ValidKey;
        }

        this.handleKeypress(key);
      }
    },
    handleBackspace() {
      if (this.getCurr() == name) {
        this.board.clearLastCellWithLetter()
      }
    },
    handleSubmit() {
      if (this.getCurr() == name) {
        if (this.board.currentRowComplete) {
          if (this.isValid(this.board.inputtedWord)) {
            this.evaluateInputtedWord(this.board.inputtedWord)
            this.board.currentRow++
          } else {
            this.errors.unshift("Not a valid word!")
          }
        } else {
          this.errors.unshift("Not enough letters in word!")
        }
      }
    },
    handleKeypress(key: ValidKey) {
      if (this.getCurr() == name) {
        console.log(key)
        this.board.updateCell(this.board.nextEmptyCellIndex, { value: key })
      }
    },
    evaluateInputtedWord(input: string) {
      const index = this.board.nextUnevaluatedCellIndex
      const evaluations = this.wordle.getEvaluations(input)
      evaluations.forEach((evaluation, letterIndex) => {
        this.board.updateCell(index + letterIndex, { state: evaluation })
        this.keyboard.updateKeyState(input[letterIndex] as ValidKey, evaluation)
      });
      if (this.isCorrect(input)) {
        let score = this.wordle.getScore(this.word.length, this.guesses);
        const result = {
          status: GameStatus.WIN,
          word: this.word,
          guesses: this.guesses,
          score: score,
          cheated: this.cheated,
        }
        const stats = useStats()
        stats.addStats(result)
        this.result = result;
        save_score(score, "wordle");
        this.over = true;
        return
      }
      if (this.board.currentRow === this.word.length) {
        const result = {
          status: GameStatus.LOSS,
          word: this.word,
          guesses: this.guesses,
          score: 0,
          cheated: this.cheated,
        }
        const stats = useStats()
        stats.addStats(result)
        this.result = result
        this.over = true
      }
    },
    reset() {
      const wordLengthChange = this.length !== this.word.length
      if (this.over || wordLengthChange) {
        this.wordle = new Wordle(this.length)
        this.board = new Board(this.length, this.length + 1)
        this.keyboard = new Keyboard()
        this.over = false
        this.cheated = false
        this.result = {} as GameResult
        this.errors = []
        if (import.meta.env.DEV) {
          console.info("The word to guess is:", this.word)
        }
      } else {
        this.errors.unshift("You must play the current game!")
      }
    },
  },
})
