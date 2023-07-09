import { useAppDispatch, useAppSelector } from "@/shared";
import { viewerFeatureSlice } from "./slice";

const select = (state: RootState) => state.viewerFeature;
const action = viewerFeatureSlice.actions;
export const viewerFeatureReducer = viewerFeatureSlice.reducer;

export const useViewerFeatures = () => {
  return useAppSelector(select);
};

export const useViewerFeaturesAction = () => {
  const dispatch = useAppDispatch();

  return {
    toggle: () => dispatch(action.toggleModal()),
    openModal: (type: string) => dispatch(action.openModal({ type })),
    setFoto: (img: string) => dispatch(action.setFoto({ img })),
    changeName: (value: string) => dispatch(action.changeName({ value })),
    closeModal: () => dispatch(action.closeModal()),
    loginStatusToggle: () => dispatch(action.loginStatusToggle()),
  };
};
