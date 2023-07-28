import { PayloadAction } from "@reduxjs/toolkit/dist/createAction";
import { DiceModel, DiceInitState } from "./types";

export const reducers = {

  setDice(state: DiceInitState, action: PayloadAction<{dice: DiceModel}>) {
    state.dice = action.payload.dice
  },

};
