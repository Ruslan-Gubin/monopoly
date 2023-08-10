import { useAppDispatch, useAppSelector } from "@/shared";
import { cellsSlice } from "./slice";
import { ICellsUpdateSizeProps } from "./types";

const select = (state: RootState) => state.cells;
export const cellAction = cellsSlice.actions;
export const cellsReducer = cellsSlice.reducer;

export const useCells = () => {
  return useAppSelector(select);
};

export const useCellsAction = () => {
  const dispatch = useAppDispatch();

  return {
    cellsUpdateSize: ({
      updateCells,
      cellsSize,
      raceCells,
    }: ICellsUpdateSizeProps) =>
      dispatch(
        cellAction.cellsUpdateSize({ cellsSize, updateCells, raceCells })
      ),
  };
};
