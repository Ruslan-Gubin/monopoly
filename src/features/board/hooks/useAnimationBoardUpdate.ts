import { useRef } from "react";
import { BoardGame, CellsGame, PlayersGame, useBoardAction, useCells, useDice, usePlayerAction, useProperty } from "@/entities";
import { playerMoveDescription } from "../utils/playerMoveDescription";
import { checkFinishMove } from "../utils/checkFinishMove";
import { UseAnimationBoardUpdateProps } from "../types/types";
import { startMovePositionPlayer } from "../utils";

export const useAnimationBoardUpdate = (
  props: UseAnimationBoardUpdateProps
) => {
  const { size, board, players, target, cellRace, cornerSize, newPosition, player } = props;
  const { dice } = useDice()
  const animationRequestIdRef = useRef<number | null>(null);
  const { boardSockedSend } = useBoardAction()
  const { moveFinished } = usePlayerAction()
  const { cells } = useCells()
  const { propertyes } = useProperty()

  const playerFinishedMove = ({ x, y, color }: { x: number, y: number, color: string }) => {
    moveFinished({ x, y, color });

    if (!player || !board || !cells) return;
    if (board.currentPlayerId === player._id) {
      const cell = cells.find(cell => cell.position === newPosition)
      if (!cell) return;
      const property = propertyes.find(elem => elem.cell_id === cell._id)

      boardSockedSend({
        method: 'finishedMove',
        body: {
          cell_rent: cell.rent,
          cell_price: cell.price,
          cell_name: cell.name,
          player_id: player._id,
          board_id: player.board_id,
          previous_position: player.position,
          isDouble: dice?.isDouble,
          newPosition,
          cell_id: target.id,
          property_id: property ? property._id : null,
          ws_id: board.ws_id,
          cell_type: cell.type,
        }
      })
    }
  };

  const animateBoard = (
    context: CanvasRenderingContext2D,
    boardGame: BoardGame,
    cellsGame: CellsGame,
    playersGame: PlayersGame
  ) => {
    if (!size || !board) return;
    let isMoveActive = false;

    const clearCanvas = () => {
      context.clearRect(0, 0, size.width, size.height);
    };

    const updateGameObjects = () => {
      boardGame.update();
      cellsGame.update();
      playersGame.update();
    };

    const currentPlayer = board.currentPlayerId;
    const playerActive = players.find((player) => player._id === currentPlayer);
    const startMovePosition = startMovePositionPlayer(cells, playerActive?.position)
   
    const animateFrame = () => {
      animationRequestIdRef.current = requestAnimationFrame(() =>
        animateFrame()
      );
      clearCanvas();
      updateGameObjects();
  
      
      if (isMoveActive && target && playerActive && startMovePosition) {
        const playerPosition = playersGame.getPosition(playerActive.color, startMovePosition);
        if (!playerPosition || !cellRace) return;

        const playerX = Math.ceil(playerPosition.playerX);
        const playerY = Math.ceil(playerPosition.playerY);

        const checkFinish = checkFinishMove(
          target.x,
          target.y,
          playerX,
          playerY
        );

        if (checkFinish) {
          playerFinishedMove({ x: target.x, y: target.y, color: playerActive.color });
        }

        playerMoveDescription(
          cellRace,
          playersGame,
          playerX,
          playerY,
          cornerSize
        );
      }
    };

    return function startAnimation(isMove: boolean) {
      isMoveActive = isMove;
      animateFrame();
    };
  };

  return { animateBoard, animationRequestIdRef };
};
