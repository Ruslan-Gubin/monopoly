import {
  fetchDeleteViewer,
  fetchLogin,
  fetchRegistration,
  fetchUpdateViewer,
  ReqAuthLogin,
  ReqUpdateBody,
  ReqUserRegistration,
} from "@/entities";
import { useAppDispatch, useAppSelector } from "@/shared";
import { viewerFeatureSlice } from "./slice";

const selectViewerFeature = (state: RootState) => state.viewerFeature;

const viewerFeatureAction = viewerFeatureSlice.actions;

export const viewerFeatureReducer = viewerFeatureSlice.reducer;

export const useViewerFeatures = () => {
  return useAppSelector(selectViewerFeature);
};

export const useViewerFeaturesAction = () => {
  const dispatch = useAppDispatch();

  return {
    toggle: () => dispatch(viewerFeatureAction.toggleModal()),
    openModal: (type: string) =>
      dispatch(viewerFeatureAction.openModal({ type })),
    setFoto: (img: string) => dispatch(viewerFeatureAction.setFoto({ img })),
    changeName: (value: string) =>
      dispatch(viewerFeatureAction.changeName({ value })),
    closeModal: () => dispatch(viewerFeatureAction.closeModal()),
    fetchDeleteViewer: (id: string) => dispatch(fetchDeleteViewer(id)),
    fetchUpdateViewer: (body: ReqUpdateBody) =>
      dispatch(fetchUpdateViewer(body)),
    fetchRegistration: (body: ReqUserRegistration) =>
      dispatch(fetchRegistration(body)),
    fetchLogin: (body: ReqAuthLogin) => dispatch(fetchLogin(body)),
    loginStatusToggle: () => dispatch(viewerFeatureAction.loginStatusToggle()),
  };
};
