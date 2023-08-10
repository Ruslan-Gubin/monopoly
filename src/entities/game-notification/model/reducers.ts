import { initGameNotification } from "@/shared";
import { PayloadAction } from "@reduxjs/toolkit/dist/createAction";
import { GameNotificationInitState } from "./types";

export const reducers = {

  addNotification(state: GameNotificationInitState, action: PayloadAction<{ notification: string }>) {
    if (!action.payload.notification) return;
    state.gameNotification.unshift(action.payload.notification)
    if (state.gameNotification.length >= 20) {
      state.gameNotification.pop()
    }
  },

  clearNotification(state: GameNotificationInitState) {
    state.gameNotification = []
  },

  resetGameNotification(state: GameNotificationInitState) {
    state.gameNotification = [...initGameNotification]
  },
  
};
