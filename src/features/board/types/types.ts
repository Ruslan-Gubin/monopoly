import { BoardModel, ICellRace, ISize, PlayerModel } from "@/entities";

export interface UseAnimationBoardUpdateProps {
  size: ISize | null;
  board: BoardModel | null;
  target: {
    x: number;
    y: number;
    id: string;
  };
  players: PlayerModel[];
  cornerSize: number;
  cellRace: ICellRace | null;
  newPosition: number;
  player: PlayerModel | null;
}