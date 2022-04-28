import { EvaluationState } from "@/assets/js/wordle/types"
import {
  english10,
  english20,
  english35,
  english40,
  canadian10,
  canadian20,
  canadian35,
  canadian40,
  american10,
  american20,
  american35,
  american40,
} from "wordlist-js"

const allWords = [
  ...english10,
  ...english20,
  ...english35,
  ...english40,
  ...canadian10,
  ...canadian20,
  ...canadian35,
  ...canadian40,
  ...american10,
  ...american20,
  ...american35,
  ...american40,
]

// CAMBIA QUESTO PER IL POOL DELLE PAROLE
const uniqueWords = [...Array.from(new Set(allWords))].map((word) =>
  word
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase()
)

function getWord(words: string[]) {
  const randomWord = words[Math.floor(Math.random() * words.length)]
  return randomWord
}

function getValidWords(length: number) {
  const filteredWords = uniqueWords.filter((w) => w.length === length)
  return filteredWords
}

export class Wordle {
  private _validWords: string[]
  private _word: string

  constructor(length: number) {
    this._validWords = getValidWords(length)
    this._word = getWord(this._validWords)
  }

  public get word() {
    return this._word
  }

  public isValid(s: string) {
    return this._validWords.includes(s)
  }

  public isCorrect(s: string) {
    return this._word === s
  }

  public getScore(wordLength: number, guessesMade: number) {
    return 100 - (100 / wordLength) * (guessesMade - 1)
  }

  public getEvaluations(inputWord: string): EvaluationState[] {
    const inputArray = inputWord.split("")
    const wordArray = this._word.split("")
    const evaluations: EvaluationState[] = []
    inputArray.forEach((letter, lIndex) => {
      let evaluation = EvaluationState.UNKNOWN
      if (letter === wordArray[lIndex]) {
        evaluation = EvaluationState.CORRECT
        const multiple = wordArray.filter((v) => v === letter)
        if (multiple.length > 1) {
          const [multipleLetter] = multiple
          const guess = inputArray.filter((v) => v === multipleLetter)
          if (guess.length < multiple.length) {
            const [guessLetter] = guess
            inputArray.forEach((letter) => {
              if (letter === guessLetter) {
                evaluation = EvaluationState.MULTIPLE
              }
            })
          }
        }
      } else if (wordArray.includes(letter)) {
        evaluation = EvaluationState.PRESENT
      } else {
        evaluation = EvaluationState.ABSENT
      }
      evaluations.push(evaluation)
    })
    return evaluations
  }
}

export default Wordle
