import { RectTypeSize, useAppDispatch, useAppSelector } from "@/shared";

import { boardSlice } from "./slice";
import { fetchBoard } from "./thunk";

const select = (state: RootState) => state.board;
const action = boardSlice.actions;
export const boardReducer = boardSlice.reducer;

export const useBoard = () => {
  return useAppSelector(select);
};

export const useBoardAction = () => {
  const dispatch = useAppDispatch();

  return {
    fetchBoard: (id: string) => dispatch(fetchBoard(id)),
    clearBoard: () => dispatch(action.clearBoard()),
    initBoard: ({ initSize }: { initSize: RectTypeSize }) => dispatch(action.initBoard({ initSize })),
  };
};
