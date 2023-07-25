import { PayloadAction } from "@reduxjs/toolkit/dist/createAction";
import { getCellsPosition } from "../libs";
import { getCellRace } from "../libs/helpers/getCellRace";
import { CellInitState, ICellsUpdateSizeProps } from "./types";

export const reducers = {
  clearCells(state: CellInitState) {
    state.cells = [];
  },

  cellsUpdateSize(state: CellInitState, action: PayloadAction<ICellsUpdateSizeProps>) {
    const { size, cells, cellsSize } = action.payload

    const updateCellsPosition = getCellsPosition(size, cells)

    if (!updateCellsPosition) return;
    state.cellRace = getCellRace(cellsSize.cornerCell, size)
    state.cells = updateCellsPosition;
    state.cornerSize = cellsSize.cornerCell;
    state.smallSize = cellsSize.smallCell;
  },

};
