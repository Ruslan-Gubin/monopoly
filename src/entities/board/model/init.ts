import { BoardInitState } from "./types";


const initialState: BoardInitState = {
  size: null,
  board: null,
  loading: false,
  error: null,
  gameBoardId: null,
  isGoGame: false,
}

export { initialState }