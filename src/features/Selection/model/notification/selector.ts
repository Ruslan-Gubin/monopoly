import {  useAppDispatch, useAppSelector } from "@/shared";
import { selectionNotificationSlice } from "./slice";

const select = (state: RootState) => state.selectionNotification;
export const selectionNotificationAction = selectionNotificationSlice.actions;
export const selectionNotificationReducer = selectionNotificationSlice.reducer;

export const useSelectionNotification = () => {
  return useAppSelector(select); 
};

export const useSelectNotificationAction = () => {
  const dispatch = useAppDispatch()

  return {
    setNotification: (value: string) => dispatch(selectionNotificationAction.setNotification(value)),
  }
}

