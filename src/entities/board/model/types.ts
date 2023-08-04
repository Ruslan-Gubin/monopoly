import { ActionCardModel, CellModel, PlayerModel } from "@/entities";
import { GameSocket } from "@/shared";

export interface ISize {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface BoardModel {
  /** Название игровой доски */
  board_name: string;
  /** Mассив id участников  игры */
  players: string[]; 
  /** Идентификатор текущего активного игрока */
  currentPlayerId: string;
  /** Позиция текущей клетки */
  currentCellPosition: number;
  /** ID текущей ячейки */
  currentCellId: string;
  /** ID игровых костей */
  dice: string; 
  available_cells: string[]; // Список id свободных собственностей
  mortgaged_cells: string[]; //Список id заложенных клеток
  /** Доступно для покупки */
  available_purchase: boolean;
  /** Нужна аренда плата */
  need_rent: number; 
  /**Стадия выбор действия*/
  choosing_action: boolean; 
  /**Стадия начала хода */
  start_move: boolean;
  /** Собственность текущего игрока */
  property_current_player: boolean;
  /** Текущее доступное действие */
  action: string;
  /** Текущее цена действия */
  price: number;
  /** Текущяя позиция шанса */
  chanse_current: number;
  /**  Текущяя позиция лотереи */
  lottery_current: number;
  /** ID для веб сокета */
  ws_id: number;
  _id: string
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
