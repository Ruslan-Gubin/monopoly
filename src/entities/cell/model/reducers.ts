import { PayloadAction } from "@reduxjs/toolkit/dist/createAction";
import { getCellsPosition } from "../libs";
import { getCellRace } from "../libs/helpers/getCellRace";
import { CellInitState, CellModel, ICellsUpdateSizeProps } from "./types";

export const reducers = {

  cellsUpdateSize(state: CellInitState, action: PayloadAction<ICellsUpdateSizeProps>) {
    const { size, cellsSize } = action.payload

    if (!state.cells) return; 
   
    const updateCellsPosition = getCellsPosition(size, state.cells)

    if (!updateCellsPosition) return;
    state.cellRace = getCellRace(cellsSize.cornerCell, size)
    state.cells = updateCellsPosition;
    state.cornerSize = cellsSize.cornerCell;
    state.smallSize = cellsSize.smallCell;
  },

  getAllCells(state: CellInitState, action: PayloadAction<{cells: CellModel[]}>) {
    state.cells = action.payload.cells
    state.isCells = true;
  },

};
