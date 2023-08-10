import { useAppSelector } from "@/shared";
import { gameNotificationSlice } from "./slice";

const select = (state: RootState) => state.gameNotification;
export const gameNotificationAction = gameNotificationSlice.actions;
export const gameNotificationReducer = gameNotificationSlice.reducer;

export const useGameNotification = () => {
  return useAppSelector(select);
};



