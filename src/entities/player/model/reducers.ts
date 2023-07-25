import { PayloadAction } from "@reduxjs/toolkit/dist/createAction";
import { getPlayerPosition } from "../libs/helpers/getPlayerPosition";
import { IPlayerUpdatePosition, PlayerInitState, SetMoveValueProps } from "./types";

export const reducers = {

  playerUpdatePosition(state: PlayerInitState, action: PayloadAction<IPlayerUpdatePosition>) {
  const { cells, cellSize, players } = action.payload
  const position = getPlayerPosition(cells, cellSize, players)
  if (!position) return;
  state.playersPosition = position
  },

  setMoveValue(state: PlayerInitState, action: PayloadAction<SetMoveValueProps>) {
    const first = action.payload.dices.first
    const second = action.payload.dices.second

    state.dices = { first, second }
    state.isMove = action.payload.isMove
    state.target = action.payload.target
  },

};
