import { PlayerConfirmation } from "@/features";
import { RectTypeSize, useAppDispatch, useAppSelector } from "@/shared";
import { connectBoard, boardSockedSend } from "./connect-ws";
import { boardSlice } from "./slice";
import { createBoard, getAllBoards, removeBoard } from "./thunk";
import { IConnectBoard } from "./types";

const select = (state: RootState) => state.board;
export const boardAction = boardSlice.actions;
export const boardReducer = boardSlice.reducer;

export const useBoard = () => {
  return useAppSelector(select);
};

export const useBoardAction = () => {
  const dispatch = useAppDispatch();

  return {
    createBoard: (body: PlayerConfirmation[]) => dispatch(createBoard(body)),
    initBoard: ({ initSize }: { initSize: RectTypeSize }) =>
      dispatch(boardAction.initBoard({ initSize })),
    goToGameRemove: () => dispatch(boardAction.goToGameRemove()),
    connectedBoard: (body: IConnectBoard) => dispatch(connectBoard(body)),
    boardSockedSend: (event: object) => dispatch(boardSockedSend(event)),
    getAllBoards: () => dispatch(getAllBoards()),
    resetAllBoardGame: () => dispatch(boardAction.resetAllBoardGame()),
    removeBoard: (board_id: string) => dispatch(removeBoard(board_id)),
  };
};
