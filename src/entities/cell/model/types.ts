import { PropertyModel } from "@/entities/property";
import { CanvasDraw, IArbitraryFormsOptions, IImageOptions, ITextOptions } from "@/shared";
import { IRectOptions } from "@/shared";
import { ICellRace } from "../libs/helpers/getCellRace";

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
  owner: { _id: string; color: CellOwnerColor; price: number }; // todo delete
  house_count: number;
  ownerColor?: string
  is_mortgage?: boolean;
}

export interface CellInitState {
  cells: CellModel[] | null;
  smallSize: number;
  cornerSize: number;
  cellRace: ICellRace | null,
  isCells: boolean,
}

export interface ICellsUpdateSizeProps {
  updateCells: CellModel[];
  cellsSize: { cornerCell: number; smallCell: number };
  raceCells: ICellRace
}

export interface IPropertyCellOptionsCache {
  playerColor: IRectOptions;
  ceilCell: IRectOptions;
  bandSize: IRectOptions;
  price: ITextOptions;
  name: ITextOptions;
  stars: IArbitraryFormsOptions[];
  mortgage: ITextOptions | null
  
}
export interface ICornerCellOptionsCache {
  name: ITextOptions;
  img: IImageOptions;
}
export interface IPortCellOptionsCache {
  playerColor: IRectOptions;
  direction: ITextOptions;
  price: ITextOptions;
  img: IImageOptions;
  mortgage: ITextOptions | null
}
export interface IActionCellOptionsCache extends ICornerCellOptionsCache {
  ceilCell: IRectOptions;
  tax: ITextOptions;
}
export interface IUtilitesCellOptionsCache extends ICornerCellOptionsCache {
  playerColor: IRectOptions;
  price: ITextOptions;
  mortgage: ITextOptions | null
}

export interface ICellsGameProps {
  cells: CellModel[]
  drawService: CanvasDraw
  propertyes: PropertyModel[]
  images: { 
    ship: string; 
    dice: string;
    lottery: string;
    tax: string;
    water: string;
    energy: string;
    start: string;
    customs: string;
    theatre: string;
  }
}
