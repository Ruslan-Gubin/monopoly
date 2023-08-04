import { PlayerInitState } from "./types";

const initialState: PlayerInitState = {
  player: null,
  playersPosition: [],
  isMove: false,
  target: { x: 0, y: 0, id: "" },
  players: [],
  newPosition: 0,
};

export { initialState };
