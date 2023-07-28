import { CellModel } from "@/entities/cell";

export interface PlayerModel {
  name: string;
  position: number;
  previous_position: number;
  is_active: boolean;
  money: number;
  properties: string[];
  in_jail: boolean;
  getOutOfJailCards: number;
  board_id: string;
  color: string;
  _id: string;
}
export interface PlayerInitState {
  player: PlayerModel | null;
  playersPosition: PlayerCanvasType[];
  isMove: boolean;
  dices: { first: number; second: number };
  target: { x: number; y: number };
  players: PlayerModel[]
}

export interface IPlayerUpdatePosition {
  cells: CellModel[];
  cellSize: number;
}

export interface SetMoveValueProps {
  isMove: boolean;
  dices: { first: number; second: number };
  target: { x: number; y: number };
}
export type PlayerCanvasType = {
  x: number;
  y: number;
  width: number;
  color: string;
}
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
