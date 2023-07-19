import { ActionCardModel, CellModel, PlayerModel } from "@/entities";

interface ISize {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface BoardModel {
  board_name: string;
  cells: CellModel[];
  players: PlayerModel[];
  currentPlayerId: string;
  currentCellsId: string;
  action_cards: ActionCardModel[];
  //  dice: IDice;
  //  bank: IBank;
  available_cells: string[];
  mortgaged_cells: string[];
}

export interface BoardInitState {
  size: ISize | null;
  board: BoardModel | null;
  loading: boolean;
  error: string | null;
}
