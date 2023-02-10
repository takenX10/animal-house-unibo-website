import { EvaluationState, ValidKey } from "./types"

interface KeyInfo {
  key: ValidKey
  state: EvaluationState
}

function initialize() {
  const keys = [
    ValidKey.Q,
    ValidKey.W,
    ValidKey.E,
    ValidKey.R,
    ValidKey.T,
    ValidKey.Y,
    ValidKey.U,
    ValidKey.I,
    ValidKey.O,
    ValidKey.P,
    ValidKey.A,
    ValidKey.S,
    ValidKey.D,
    ValidKey.F,
    ValidKey.G,
    ValidKey.H,
    ValidKey.J,
    ValidKey.K,
    ValidKey.L,
    ValidKey.ENTER,
    ValidKey.Z,
    ValidKey.X,
    ValidKey.C,
    ValidKey.V,
    ValidKey.B,
    ValidKey.N,
    ValidKey.M,
    ValidKey.BACKSPACE,
  ]
  return keys.map((key) => {
    return { key, state: EvaluationState.UNKNOWN }
  })
}

export class Keyboard {
  private _state;

  constructor() {
    this._state = initialize()
  }

  public get state() {
    return this._state
  }

  public updateKeyState(key, state) {
    const k = this._state.find((value) => value.key === key)
    if (!k) {
      return
    }
    if ((state as EvaluationState) === EvaluationState.MULTIPLE) {
      state = EvaluationState.CORRECT
    }
    k.state = state
  }
}

export default Keyboard
