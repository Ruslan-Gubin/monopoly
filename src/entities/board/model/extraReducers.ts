import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { connectBoard } from "./connect-ws";
import { getAllBoards } from "./thunk";
import { BoardInitState } from "./types";

export const extraReducers = (
  builder: ActionReducerMapBuilder<BoardInitState>
) => {
  builder
    .addCase(connectBoard.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(connectBoard.rejected, (state, action) => {
      state.loading = false;
      if (action.payload) {
        state.error = action.payload;
      }
    })
    .addCase(connectBoard.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      if (action.payload.type === "disconect") {
        state.isConnected = false;
      } else {
        state.isConnected = true;
      }
    });

  builder
    .addCase(getAllBoards.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(getAllBoards.rejected, (state, action) => {
      state.loading = false;
      if (action.payload) {
        state.error = action.payload;
      }
    })
    .addCase(getAllBoards.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.allBoardsGames = action.payload;
    });
};
