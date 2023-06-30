import { SelectInitState } from "./types";


const initialState: SelectInitState = {
  selectioGames: [],
  isEstablishingConnection: false,
  isConnected: false,
  error: null,
  owner: null,
  joinSession: null,
  playersCount: 0,
  authId: null,
}

export { initialState }