import { EvaluationState } from "@/assets/js/wordle/types"
import {
  english10,
  english20,
  english35,
  english40,
} from "wordlist-js"

const allWords = [
  "abyssinian", "albatross", "alligator", "angelfish", "ant", "anteater", "antelope", "armadillo", "baboon", "badger", "bandicoot", "bat", "beagle", "bear", "beaver", "bee", "beetle", "bird", "bison", "boar", "bobcat", "bombay", "bongo", "bonobo", "booby", "buffalo", "bulldog", "bullfrog", "butterfly", "camel", "capybara", "cat", "caterpillar", "catfish", "centipede", "chameleon", "cheetah", "chicken", "chihuahua", "chimpanzee", "chinchilla", "chipmunk", "civet", "cockroach", "cougar", "cow", "coyote", "crab", "crane", "cuttlefish", "deer", "dingo", "dodo", "dog", "dolphin", "donkey", "dragon", "dragonfly", "drever", "duck", "eagle", "earwig", "eel", "elephant", "emu", "falcon", "ferret", "fish", "flamingo", "flounder", "fox", "frog", "gecko", "gerbil", "gibbon", "giraffe", "goat", "goose", "gopher", "gorilla", "grasshopper", "grey seal", "greyhound", "grizzly bear", "grouse", "guinea fowl", "guppy", "hamster", "harrier", "hedgehog", "heron", "hippopotamus", "horse", "hound", "howler monkey", "hummingbird", "hyena", "i", "ibis", "iguana", "jackal", "jaguar", "jellyfish", "kangaroo", "king crab", "kingfisher", "kiwi", "koala", "lemming", "lemur", "leopard", "lion", "lionfish", "lizard", "llama", "lobster", "lynx", "m", "macaque", "macaw", "mammoth", "manatee", "mandrill", "markhor", "marmoset", "meerkat", "millipede", "mole", "mongoose", "mongrel", "monkey", "moose", "moth", "mouse", "mule", "newt", "nightingale", "ocelot", "octopus", "opossum", "orangutan", "oriole", "ostrich", "otter", "owl", "oyster", "panther", "parrot", "peacock", "pelican", "penguin", "pheasant", "pig", "pike", "piranha", "platypus", "porcupine", "possum", "prawn", "puffin", "puma", "quail", "rabbit", "raccoon", "rat", "rattlesnake", "reindeer", "rhinoceros", "robin", "salamander", "scorpion", "seahorse", "seal", "shark", "sheep", "shrimp", "skunk", "sloth", "snail", "snake", "sparrow", "sponge", "squid", "squirrel", "stingray", "stoat", "swan", "tamarin", "tapir", "tarantula", "termite", "tiger", "toad", "tortoise", "toucan", "turkey", "turtle", "vole", "vulture", "wallaby", "walrus", "warthog", "wasp", "weasel", "whale", "wildebeest", "wolf", "wolfhound", "wolverine", "wombat", "woodpecker", "yak", "zebra",]
const allValidWords = [
  ...english10,
  ...english20,
  ...english35,
  ...english40,
]

// CAMBIA QUESTO PER IL POOL DELLE PAROLE
const uniqueWords = [...Array.from(new Set(allValidWords))].map((word) =>
  word
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
)

function getWord(words: string[]) {
  const randomWord = words[Math.floor(Math.random() * words.length)]
  return randomWord
}

function getValidGuessableWords(length: number) {
  const filteredWords = allWords.filter((w) => w.length === length)
  return filteredWords
}
function getValidWords(length: number) {
  let filteredWords = uniqueWords.filter((w) => w.length === length)
  let gg = getValidGuessableWords(length);
  for (let i = 0; i < gg.length; i++) {
    filteredWords.push(gg[i])
  }
  return filteredWords
}

export class Wordle {
  private _validWords: string[]
  private _word: string

  constructor(length: number) {
    this._validWords = getValidWords(length)
    this._word = getWord(getValidGuessableWords(length))
  }

  public get word() {
    return this._word
  }

  public isValid(s: string) {
    return this._validWords.includes(s.toLowerCase())
  }

  public isCorrect(s: string) {
    return this._word === s.toLowerCase()
  }

  public getScore(wordLength: number, guessesMade: number) {
    return 100 - (100 / wordLength) * (guessesMade - 1)
  }

  public getEvaluations(inputWord: string): EvaluationState[] {
    inputWord = inputWord.toLowerCase()
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
