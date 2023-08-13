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
  /** ID игровых костей */
  dice: string;
  /** Текущее доступное действие */
  action: string;
  /** Текущее цена действия */
  price: number;
  /** Текущяя позиция шанса */
  chanse_current: number;
  /**  Текущяя позиция лотереи */
  lottery_current: number;
  /** ID аукциона */
  auction_id: string;
  /** ID для веб сокета */
  ws_id: number;
  _id: string;
}

export interface BoardInitState {
  size: ISize | null;
  board: BoardModel | null;
  loading: boolean;
  error: string | null;
  gameBoardId: string | null;
  isGoGame: boolean;
  isConnected: boolean;
  allBoardsGames: AllBoardGames[];
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
    boardId: string;
  };
}
export interface HandleDisconnectBoardProps {
  boardSocket: GameSocket;
  fullName: string;
  boardId: string;
  playerId: string;
}
export interface AllBoardPlayersList {
    color: string;
    image: string;
    name: string;
    user_id: string;
}
export interface AllBoardGames {
  board_id: string;
  date_create: string;
  player_list: AllBoardPlayersList[];
}
