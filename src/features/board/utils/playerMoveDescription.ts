import { PlayersGame } from "@/entities";
import { ICellRace } from "@/entities/cell/libs/helpers/getCellRace";
import { GAME_OPTIONS } from "@/shared";

type PositionType = { x: number; y: number }
type MoveRaceType = {
bottom: PositionType;
top: PositionType;
left: PositionType;
right: PositionType;
}

const movePlayerDown = (cellRace: ICellRace, playersGame: PlayersGame, playerX: number, playerY: number, center: number, moveRace: MoveRaceType, activeDirection: string) => {
  if (playerY > cellRace.bottom.y - center && playerX > cellRace.bottom.leftX && playerX < cellRace.bottom.rightX + center) {
    playersGame.playerMove = moveRace.bottom;
    if (activeDirection !== 'left') {
      playersGame.setActiveDirection = 'left'
    }
  }
};

const movePlayerLeft = (cellRace: ICellRace, playersGame: PlayersGame, playerX: number, playerY: number, center: number, moveRace: MoveRaceType, activeDirection: string) => {
  if (playerY > cellRace.leftSide.topY && playerX < cellRace.leftSide.x + center && playerY < cellRace.leftSide.bottomY + center) {
    playersGame.playerMove = moveRace.left;
    if (activeDirection !== 'up') {
      playersGame.setActiveDirection = 'up'
    }
  }
};

const movePlayerUp = (cellRace: ICellRace, playersGame: PlayersGame, playerX: number, playerY: number, center: number, moveRace: MoveRaceType, activeDirection: string) => {
  if (playerY < cellRace.top.y + center && playerX > cellRace.top.leftX - center && playerX < cellRace.top.right) {
    playersGame.playerMove = moveRace.top;
    if (activeDirection !== 'right') {
      playersGame.setActiveDirection = 'right'
    }
  }
};

const movePlayerRight = (cellRace: ICellRace, playersGame: PlayersGame, playerX: number, playerY: number, center: number, moveRace: MoveRaceType, activeDirection: string) => {
  if (playerX > cellRace.right.x - center && playerY > cellRace.right.topY - center && playerY < cellRace.right.bottomY) {
    playersGame.playerMove = moveRace.right;
    if (activeDirection !== 'down') {
      playersGame.setActiveDirection = 'down'
    }
  }
};

export const playerMoveDescription = (
  cellRace: ICellRace,
  playersGame: PlayersGame,
  playerX: number,
  playerY: number,
  cornerSize: number,
) => {
  const center = cornerSize / 4; // change radius
  const speed = GAME_OPTIONS.speedPlayer;
  const { bottom, leftSide, right, top } = cellRace;
  const activeDirection = playersGame.getActiveDirection 

  const moveRace = {
    bottom: { x: playerX - speed, y: bottom.y },
    top: { x: playerX + speed, y: top.y },
    left: { x: leftSide.x, y: playerY - speed },
    right: { x: right.x, y: playerY + speed },
  };

  movePlayerDown(cellRace, playersGame, playerX, playerY, center, moveRace, activeDirection);
  movePlayerLeft(cellRace, playersGame, playerX, playerY, center, moveRace, activeDirection);
  movePlayerUp(cellRace, playersGame, playerX, playerY, center, moveRace, activeDirection);
  movePlayerRight(cellRace, playersGame, playerX, playerY, center, moveRace, activeDirection);
};
