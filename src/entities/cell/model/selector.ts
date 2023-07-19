import { useAppDispatch, useAppSelector } from "@/shared";
import { cellsSlice } from "./slice";
import { fetchAllCells } from "./thunk";
import {  ICellsUpdateSizeProps } from "./types";

const select = (state: RootState) => state.cells;
const action = cellsSlice.actions;
export const cellsReducer = cellsSlice.reducer;

export const useCells = () => {
  return useAppSelector(select);
};

export const useCellsAction = () => {
  const dispatch = useAppDispatch();

  return {
    fetchAllCells: (nameBoard: string) => dispatch(fetchAllCells(nameBoard)),
    clearCells: () => dispatch(action.clearCells()),
    cellsUpdateSize: ({ size, cells, cellsSize }: ICellsUpdateSizeProps) => dispatch(action.cellsUpdateSize({ size, cells, cellsSize })),
  };
};

