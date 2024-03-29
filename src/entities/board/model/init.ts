import { BoardInitState } from "./types";


const initialState: BoardInitState = {
  size: null,
  board: null,
  loading: false,
  error: null,
  gameBoardId: null,
  isGoGame: false,
  isConnected: false,
  allBoardsGames: [],
}

export { initialState }