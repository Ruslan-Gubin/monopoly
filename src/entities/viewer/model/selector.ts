import { useAppDispatch, useAppSelector } from "@/shared";
import { viewerSlice } from "./slice";

export const selectViewer = (state: RootState) => state.viewer;

export const viewerAction = viewerSlice.actions;

export const viewerReducer = viewerSlice.reducer;

export const useViewer = () => {
  return useAppSelector(selectViewer); 
};

export const useViewerAction = () => {
 const dispatch = useAppDispatch()

 return {
  clearViewer: () => dispatch(viewerAction.clearViewer()),
 }

}

export const useAuth = () => {
  const { autorization } = useViewer();
  return autorization;
};
