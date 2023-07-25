import { CellModel } from "@/entities/cell";

export const verticalCell = (
  cell: CellModel,
  centerW: number,
  players: string[],
  id: string
) => {
  const startX = cell.x + centerW / 2;
  const secondX = cell.x + (centerW + centerW / 2);
  const step = cell.height / 3;

  const verticalCell = [
    { x: startX, y: cell.y + step * 2.4 },
    { x: secondX, y: cell.y + step * 2.4 },
    { x: startX, y: cell.y + cell.height / 2 },
    { x: secondX, y: cell.y + cell.height / 2 },
    { x: startX, y: cell.y + cell.height / 6 },
    { x: secondX, y: cell.y + cell.height / 6 },
  ];

  const playerId = players.findIndex((playerId) => playerId === id);
  return verticalCell[playerId];
};

export const sideCell = (
  cell: CellModel,
  centerW: number,
  players: string[],
  id: string
) => {
  const sideStartX = cell.x + centerW / 3;
  const sideTopY = cell.y + cell.height / 4;
  const sideBottomY = cell.y + (cell.height / 2 + cell.height / 4);

  const sideCell = [
    { x: sideStartX, y: sideBottomY },
    { x: cell.x + centerW, y: sideBottomY },
    { x: cell.x + (centerW + centerW / 1.5), y: sideBottomY },
    { x: sideStartX, y: sideTopY },
    { x: cell.x + centerW, y: sideTopY },
    { x: cell.x + (centerW + centerW / 1.5), y: sideTopY },
  ];

  const playerId = players.findIndex((playerId) => playerId === id);
  return sideCell[playerId];
};
