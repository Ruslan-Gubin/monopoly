import { PayloadAction } from "@reduxjs/toolkit/dist/createAction";
import { CellInitState, CellModel, ICellsUpdateSizeProps } from "./types";

export const reducers = {
  cellsUpdateSize(
    state: CellInitState,
    action: PayloadAction<ICellsUpdateSizeProps>
  ) {
    const { updateCells, cellsSize, raceCells } = action.payload;

    state.cellRace = raceCells;
    state.cells = updateCells;
    state.cornerSize = cellsSize.cornerCell;
    state.smallSize = cellsSize.smallCell;
  },

  getAllCells(
    state: CellInitState,
    action: PayloadAction<{ cells: CellModel[] }>
  ) {
    state.cells = action.payload.cells;
    state.isCells = true;
  },

  resetCells(state: CellInitState) {
    state.cellRace = null;
    state.cells = null;
    state.cornerSize = 0;
    state.isCells = false;
    state.smallSize = 0;
  },
};
