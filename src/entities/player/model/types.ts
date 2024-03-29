import { BoardModel } from "@/entities/board";
import { CellModel } from "@/entities/cell";
import { CanvasDraw } from "@/shared";

export interface PlayerModel {
  name: string;
  position: number;
  is_active: boolean;
  money: number;
  in_jail: boolean;
  current_jail: number;
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
export interface IPlayerProps {
  drawService: CanvasDraw;
  players: PlayerCanvasType[];
  imageSrc: string;
  frameHold: number;
}
export interface IMoveParams {
  isCenterCell: boolean,
  isStart: boolean,
  endPosition: { x: number, y: number }
}
export interface IStartMovePlayerPosition {
  startMoveX: number, 
  startMoveY: number
}
