import { useAppDispatch, useAppSelector } from "@/shared";
import { selectionSlice } from "./slice";
import {  connectSelection, selectionSockedSend } from "./thunk";
import { IConnectSelection } from "./types";

const select = (state: RootState) => state.selection;

export const selectionAction = selectionSlice.actions;

export const selectionReducer = selectionSlice.reducer;

export const useSelect = () => {
  return useAppSelector(select); 
};

export const useSelectAction = () => { 
 const dispatch = useAppDispatch()

 return {
  connectSelection: (viewer: IConnectSelection) => dispatch(connectSelection(viewer)),
  selectionSendMessage: <T extends object>(data: T) => dispatch(selectionSockedSend(data)),  
 }

}


