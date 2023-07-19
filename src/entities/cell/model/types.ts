import { RectTypeSize } from "@/shared";

interface IPositionCell {
  row_index: number;
  column_index: number;
}

type CellOwnerColor = "red" | "blue" | "green" | "yellow" | "pink" | "violet";

type CellTypes =
  | "start"
  | "action-lottery"
  | "property"
  | "action-tax"
  | "action-chance"
  | "port"
  | "theatre"
  | "utilities-energy"
  | "customs"
  | "utilities-water"
  | "visit theater";
type CellDirection =
  | "corner"
  | "center-top"
  | "center-bottom"
  | "side-left"
  | "side-right";

export interface CellModel {
  board_name?: string;
  color: string | null;
  direction?: CellDirection;
  hotel_cost: number | null;
  house_cost: number | null;
  mortgage_value: number | null;
  name: string;
  position: number;
  position_matrix?: IPositionCell;
  price: number | null;
  rent: number[] | null;
  type: CellTypes;
  __v?: number;
  _id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  owner: { _id: string; color: CellOwnerColor; price: number };
  house_count: number;
}

export interface CellInitState {
  cells: CellModel[] | null;
  loading: boolean;
  error: string | null;
  smallSize: number;
  cornerSize: number;
}

export interface ICellsUpdateSizeProps {
  size: RectTypeSize;
  cells: CellModel[];
  cellsSize: { cornerCell: number; smallCell: number };
}
