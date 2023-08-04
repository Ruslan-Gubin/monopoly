import { BoardModel } from "@/entities/board";
import { CellModel } from "@/entities/cell";

export interface PlayerModel {
  name: string;
  position: number;
  previous_position: number;
  is_active: boolean;
  money: number;
  properties: string[];
  in_jail: boolean;
  current_jail: number;
  getOutOfJailCards: number;
  board_id: string;
  color: string;
  _id: string;
  image: string;
  user_id: string;
}

export interface PlayerInitState {
  player: PlayerModel | null;
  playersPosition: PlayerCanvasType[];
  isMove: boolean;
  target: { x: number; y: number; id: string };
  players: PlayerModel[];
  newPosition: number;
}

export interface IPlayerUpdatePosition {
  cells: CellModel[];
  cellSize: number;
}
export interface IfinishedMoveUpdatePosition extends IPlayerUpdatePosition {
  player: PlayerModel;
}
export interface IMoveActiveProps {
  cells: CellModel[] | null;
  diceValue: number;
  board: BoardModel | null;
}

export type PlayerCanvasType = {
  x: number;
  y: number;
  width: number;
  color: string;
};
export interface IFrames {
  [key: string]: number;
  x: number;
  y: number;
  width: number;
  height: number;
}
export interface ISideFrames {
  [key: string]: IFrames[];
  down: IFrames[];
  left: IFrames[];
  right: IFrames[];
  up: IFrames[];
}

export interface IPlayerFrames {
  [key: string]: ISideFrames;
  yellow: ISideFrames;
  green: ISideFrames;
  red: ISideFrames;
  black: ISideFrames;
  blue: ISideFrames;
  pink: ISideFrames;
}
export interface GetTargetPositionProps {
  board: BoardModel;
  players: PlayerModel[];
  diceValue: number;
  cells: CellModel[];
}
