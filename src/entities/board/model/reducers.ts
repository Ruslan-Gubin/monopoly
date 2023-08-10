import { PayloadAction } from "@reduxjs/toolkit";
import { RectTypeSize } from "@/shared";
import { BoardInitState, BoardModel } from "./types";

export const reducers = {
  
  initBoard(state: BoardInitState, action: PayloadAction<{ initSize: RectTypeSize }>) {
    const { initSize } = action.payload
    state.size = initSize;
  },

  getStartBoardId(state: BoardInitState, action: PayloadAction<string>) {
    state.gameBoardId = action.payload;
    state.isGoGame = true;
  },

  goToGameRemove(state: BoardInitState) {
    state.isGoGame = false;
  },

  updateBoard(state: BoardInitState, action: PayloadAction<{ board: BoardModel }>) {
    if (!action.payload.board) return;
    state.board = action.payload.board
  },

  resetBoard(state: BoardInitState) {
    state.board = null;
    state.error = null;
    state.gameBoardId = null;
    state.isConnected = false;
    state.isGoGame = false;
    state.loading = false;
    state.size = null;
  }
};
