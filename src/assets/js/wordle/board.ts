import { ValidKey, EvaluationState } from "@/assets/js/wordle/types"

interface CellInfo {
  value: ValidKey
  state: EvaluationState
}

function initialize(width: number, height: number): CellInfo[] {
  return [...Array(width * height)].map(() => {
    return { value: ValidKey.BLANK, state: EvaluationState.UNKNOWN }
  })
}

export class Board {
  public currentRow = 0
  readonly width: number
  private _state: CellInfo[]
  private _height: number

  constructor(width: number, height: number) {
    this.width = width
    this._height = height
    this._state = initialize(this.width, this._height)
  }

  public get state() {
    return this._state
  }

  public get nextEmptyCellIndex() {
    return this._state.findIndex((cell) => cell.value === ValidKey.BLANK)
  }

  public get nextUnevaluatedCellIndex() {
    return this._state.findIndex((cell) => cell.state === EvaluationState.UNKNOWN)
  }

  public get inputtedWord() {
    let word = ""
    const startIndex = this.currentRow * this.width
    for (let i = startIndex; i < startIndex + this.width; i++) {
      word += this._state[i].value
    }
    return word
  }

  public get currentRowComplete() {
    const index = this.nextEmptyCellIndex === -1 ? this.width * this._height : this.nextEmptyCellIndex
    const row = Math.floor((index - 1) / this.width)
    const isCurrentRow = row === this.currentRow
    const rowComplete = index % this.width === 0
    return isCurrentRow && rowComplete
  }

  public updateCell(index: number, values: Partial<CellInfo>) {
    const isCurrentRow = Math.floor(index / this.width) === this.currentRow
    if (isCurrentRow) {
      this._state[index] = { ...this._state[index], ...values }
    }
  }

  public clearLastCellWithLetter() {
    if (this.nextEmptyCellIndex === -1) {
      // All board cells are filled, make last cell blank
      this._state[this._state.length - 1].value = ValidKey.BLANK
      return
    }
    const isCurrentRow = Math.floor((this.nextEmptyCellIndex - 1) / this.width) === this.currentRow
    if (isCurrentRow) {
      const lastNonEmptyCell = this._state.filter((cell) => cell.value !== ValidKey.BLANK).length - 1
      this._state[lastNonEmptyCell].value = ValidKey.BLANK
    }
  }
}

export default Board
