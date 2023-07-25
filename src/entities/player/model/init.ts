import { PlayerInitState } from "./types";


const initialState: PlayerInitState = {
  player: null,
  playersPosition: [],
  isMove: false,
  dices: { first: 0, second: 0 },
  target: { x: 0, y: 0 },
}

export { initialState }