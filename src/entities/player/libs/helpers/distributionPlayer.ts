import { CellModel } from "@/entities/cell";
import { PlayerCanvasType } from "../../model";
import { sideCell, verticalCell } from "./discriptionCellCountPlayer";

export const getCenterCell = (
  cell: CellModel,
  cellSize: number,
  color: string
): PlayerCanvasType => {
  return {
    width: (cellSize * 2) / 5,
    x: cell.x + cell.width / 2,
    y: cell.y + cell.height / 2,
    color,
  };
};

export const distributionPlayer = (
  cell: CellModel,
  players: string[],
  color: string,
  id: string,
  cellSize: number
): PlayerCanvasType => {
  const isSide = cell.direction?.includes("side");
  const centerW = cell.width / 2;

  const playerSize = getCenterCell(cell, cellSize, color);

  if (players.length === 1) {
    return playerSize;
  }

  let playerPosition = null;

  if (!isSide) {
    playerPosition = verticalCell(cell, centerW, players, id);

    playerSize.x = playerPosition.x;
    playerSize.y = playerPosition.y;
  } else {
    playerPosition = sideCell(cell, centerW, players, id);

    playerSize.x = playerPosition.x;
    playerSize.y = playerPosition.y;
  }

  return playerSize;
};
