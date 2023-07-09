import { useAppDispatch, useAppSelector } from "@/shared";
import { viewerSlice } from "./slice";
import {
  fetchDeleteViewer,
  fetchLogin,
  fetchRegistration,
  fetchUpdateViewer,
} from "./thunk";
import { ReqAuthLogin, ReqUpdateBody, ReqUserRegistration } from "./types";

const select = (state: RootState) => state.viewer;
const action = viewerSlice.actions;
export const viewerReducer = viewerSlice.reducer;

export const useViewer = () => {
  return useAppSelector(select);
};

export const useViewerAction = () => {
  const dispatch = useAppDispatch();

  return {
    clearViewer: () => dispatch(action.clearViewer()),
    fetchDeleteViewer: (id: string) => dispatch(fetchDeleteViewer(id)),
    fetchUpdateViewer: (body: ReqUpdateBody) =>
      dispatch(fetchUpdateViewer(body)),
    fetchRegistration: (body: ReqUserRegistration) =>
      dispatch(fetchRegistration(body)),
    fetchLogin: (body: ReqAuthLogin) => dispatch(fetchLogin(body)),
  };
};

export const useAuth = () => {
  const { autorization } = useViewer();
  return autorization;
};
