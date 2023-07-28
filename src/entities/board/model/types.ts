import { ActionCardModel, CellModel, PlayerModel } from "@/entities";
import { GameSocket } from "@/shared";

export interface ISize {
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
  gameBoardId: string | null;
  isGoGame: boolean;
  isConnected: boolean;
}

export interface ICreateBoardBody {
  color: string;
  fullName: string;
  id: string;
  img: string;
}
export interface IConnectBoard {
  method: string;
  body: {
    fullName: string;
    id: string;
    boardId: string
  };
}
export interface HandleDisconnectBoardProps {
  boardSocket: GameSocket;
  fullName: string;
  boardId: string;
  playerId: string;
}
