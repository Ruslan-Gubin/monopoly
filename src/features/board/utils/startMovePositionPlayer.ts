import { CellModel } from "@/entities";

export const startMovePositionPlayer = (cells: CellModel[] | null, position: number | undefined) => {
  if (!cells || position === undefined) return;
  const initPosition = cells.find(cell => cell.position === position)
  if (!initPosition) return;
  const centerCell = initPosition.width / 2
  return {
    startMoveX: initPosition.x + centerCell,
    startMoveY: initPosition.y + centerCell,
  }
}