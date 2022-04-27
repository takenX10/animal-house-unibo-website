<template>
  <div id="game">
    <div
      header="Game"
      border-variant="primary"
      bg-variant="light"
      header-bg-variant="primary"
      header-text-variant="white"
    >
      <div id="gameComponent">
        <StickMan :fails="fails" />
      </div>

      <div id="gameComponent">
        <Letters :letters="guessedWord" />
      </div>

      <div id="gameComponent">
        <Keyboard v-on:key="processLetter" v-on:restart="restart" :usedLetters="usedLetters" />
      </div>
    </div>

    <br />
  </div>
</template>

<script>
import StickMan from '@/components/hangman/StickMan.vue'
import Letters from '@/components/hangman/Letters.vue'
import Keyboard from '@/components/hangman/Keyboard.vue'
import json from '@/assets/data/hangman/words.json'

const len = Keyboard.data().len;
const keys = Keyboard.data().keys;
const name = "Hangman"
let currentGame = name

export default {
  name: name,
  components: {
    StickMan,
    Letters,
    Keyboard,
  },
  props: {
    getCurr: { type: Function },
  },
  data() {
    return {
      focusKey: 0,
      fails: 0,
      guessedWord: "",
      secretWord: "",
      foundLetters: "",
      usedLetters: "",
      words: json.words,
    }
  },
  mounted: function () {
    window.addEventListener('keyup', this.keyPressed);
    this.restart();
  },
  methods: {
    restart: function () {
      var min = 0;
      var max = this.words.length - 1;
      var index = parseInt(Math.random() * (max - min) + min);
      this.secretWord = this.words[index].toUpperCase();
      this.guessedWord = "";
      this.foundLetters = "";
      this.usedLetters = "";
      this.fails = 0;
      this.guessedWord = this.secretWord.split('').map(() => '_').join("");
    },
    keyPressed(e) {
      var key = e.key.toUpperCase();
      this.processLetter(key);
    },
    processLetter(letter) {
      currentGame = this.getCurr();
      if (currentGame == name) {
        if (letter.toUpperCase() == "ARROWRIGHT") {
          if (this.focusKey > len - 1) {
            this.focusKey = 0;
          }
          else ++this.focusKey;

          let el = document.getElementById("hangman_btn_" + this.focusKey)
          if (el) el.focus()
        }
        if (letter.toUpperCase() == "ARROWLEFT") {
          if (this.focusKey <= 0) {
            this.focusKey = len;
          }
          else
            --this.focusKey;
          let el = document.getElementById("hangman_btn_" + this.focusKey)
          if (el) el.focus()
        }
        if (letter.length == 1 && this.fails >= 0 && this.fails < 7 && !this.usedLetters.includes(letter)) {
          if (this.secretWord.includes(letter)
            && !this.foundLetters.includes(letter)) {
            this.foundLetters += letter;
            this.guessedWord =
              this.secretWord.split('')
                .map(l => this.foundLetters.includes(l) ? l : '_').join("");
            if (this.guessedWord == this.secretWord) {
              this.fails = -1;
            }
          } else {
            this.fails++;
            if (this.fails == 7) {
              this.guessedWord = this.secretWord;
            }
          }
          this.usedLetters += letter;
        }
        if (letter == "ESCAPE" || letter == " ") {
          this.restart();
        }
      }
    }
  }
}
</script>

<style>
#game {
  text-align: center;
  margin-top: 10px;
  min-width: 300px;
}
#gameComponent {
  margin-top: 7px;
}

body {
  color: var(--text-color)
}
</style>
