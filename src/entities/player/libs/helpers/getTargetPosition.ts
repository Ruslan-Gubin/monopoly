import { GetTargetPositionProps } from "../../model";

interface ReturnPosition {
  targetX: number;
  targetY: number;
  newPosition: number;
  cellTargetId: string;
}

export const getTargetPosition = ({
  board,
  players,
  diceValue,
  cells,
}: GetTargetPositionProps): ReturnPosition | undefined => {
  const activePlayer = players.find(
    (player) => player._id === board.currentPlayerId
  );
  if (!activePlayer) return;

  const prevPosition = activePlayer.position;

  let newPosition = diceValue + prevPosition;
  const totalCell = 39;

  if (newPosition > totalCell) {
    newPosition = newPosition - totalCell - 1;
  }

  const cellTarget = cells.find((cell) => cell.position === newPosition);
  if (!cellTarget) return;

  return {
    targetX: cellTarget.x + cellTarget.width / 2,
    targetY: cellTarget.y + cellTarget.height / 2,
    newPosition,
    cellTargetId: cellTarget._id,
  };
};
