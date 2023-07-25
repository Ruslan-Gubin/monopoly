import { useRef } from "react";
import { BoardGame, CellsGame, PlayersGame, useBoard, useCells, usePlayer, usePlayerAction } from "@/entities";
import { playerMoveDescription } from "../utils/playerMoveDescription";
import { checkFinishMove } from "../utils/checkFinishMove";


export const useAnimationBoardUpdate = () => {
  const animationRequestIdRef = useRef<number | null>(null);
  const { setMoveValue } = usePlayerAction()
  const { size } = useBoard()
  const { dices, playersPosition, target } = usePlayer()
  const { cells, cornerSize, cellRace } = useCells()

  const animateBoard = (context: CanvasRenderingContext2D, boardGame: BoardGame, cellsGame: CellsGame, playersGame: PlayersGame) => {
    if (!size) return;
    let isMoveActive = false;
    let targetCell: { x: number, y: number } | null = null;

    const clearCanvas = () => {
      context.clearRect(0, 0, size.width, size.height);
    }
  
    const updateGameObjects = () => {
      boardGame.update();
      cellsGame.update();
      playersGame.update();
    };
  
    const animateFrame = () => {
      animationRequestIdRef.current = requestAnimationFrame(() => animateFrame());
      clearCanvas();
      updateGameObjects();

      if (isMoveActive && target) {
        const playerPosition =  playersGame.getPosition('blue')
        if (!playerPosition || !targetCell || !cellRace) return;

        const playerX = Math.ceil(playerPosition.playerX)
        const playerY = Math.ceil(playerPosition.playerY)
        
        
       const checkFinish = checkFinishMove(target.x, target.y, playerX, playerY)
       
        if (checkFinish) {
          setMoveValue({ isMove: false, dices: { first: 0, second: 0 }, target: { x: 0, y: 0 } })
        }

        playerMoveDescription(cellRace, playersGame, playerX, playerY, cornerSize)
      }
    }
  
    return function startAnimation(isMove: boolean) {
      isMoveActive = isMove;
      targetCell = { x: 380, y: 722 }
      animateFrame();
    };
  }

  return { animateBoard, animationRequestIdRef }
}