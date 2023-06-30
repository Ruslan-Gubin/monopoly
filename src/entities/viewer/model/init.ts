import { ViewerInitState } from "./types";


const initialState: ViewerInitState = {
  autorization: false,
  accessToken: null,
  authId: null,
  viewer: null,
  loading: false,
  error: null,
}

export { initialState }