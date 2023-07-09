import { useAppSelector } from "../../../../shared";
import { selectionMessageSlice } from "./slice";

const select = (state: RootState) => state.selectionMessage;
export const selectionMessageAction = selectionMessageSlice.actions;
export const selectionMessageReducer = selectionMessageSlice.reducer;

export const useSelectionMessage = () => {
  return useAppSelector(select); 
};



