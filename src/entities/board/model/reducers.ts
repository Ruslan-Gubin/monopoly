import { RectTypeSize } from "@/shared";
import { PayloadAction } from "@reduxjs/toolkit";
import { BoardInitState } from "./types";

export const reducers = {
  
  initBoard(state: BoardInitState, action: PayloadAction<{ initSize: RectTypeSize }>) {
    const { initSize } = action.payload
   
    state.size = initSize;
  },
};
