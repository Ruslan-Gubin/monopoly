import {  useLayoutEffect, useRef, useState } from "react";
import { BoardGame, useBoard, CellsGame, useCells, PlayersGame, usePlayer } from "@/entities";
import { CanvasDraw, GAME_BOARD_SRC, debounce, GAME_OPTIONS } from "@/shared";
import { setupCanvas } from "../utils";
import { useAnimationBoardUpdate } from "./useAnimationBoardUpdate";

export const useAnimationBoard = () => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const { cells, cornerSize, smallSize } = useCells()  
  const { size } = useBoard()
  const boardRef = useRef<HTMLCanvasElement>(null);
  const { playersPosition, isMove } = usePlayer()
  const { animateBoard, animationRequestIdRef } = useAnimationBoardUpdate()


  useLayoutEffect(() => {
    if (!boardRef.current || !cells || !size) return;
    const context = setupCanvas(boardRef, size);

    const drawService = new CanvasDraw(context)

    const boardGame = new BoardGame({
      boardSize: { x: 0, y: 0, width: size.width, height: size.height },
      drawService,
      cellsSize: {corner: cornerSize, small: smallSize},
      centerSrc: GAME_BOARD_SRC.center,
    });
    
    const cellsGame = new CellsGame({  
      drawService,
      cells,
      images: GAME_BOARD_SRC.cells,
    });

    const playersGame = new PlayersGame({
      drawService,
      players: JSON.parse(JSON.stringify(playersPosition)),
      imageSrc: GAME_BOARD_SRC.players,
      frameHold: GAME_OPTIONS.frameHoldPlayer,
    })
   
    const animateClouser = animateBoard(context, boardGame, cellsGame, playersGame)
    if (animateClouser) {
      requestAnimationFrame(() => animateClouser(isMove));
    } else {
      console.error('animateClouser is undefined');
    }
    

    const node = boardRef.current;
    const move = (e: MouseEvent) => {
      setWidth(e.offsetX);
      setHeight(e.offsetY);
    };
    const mouveDebounce = debounce(move);
    node.addEventListener("mousemove", mouveDebounce);

    return () => {
      node.removeEventListener("mousemove", mouveDebounce);
      if (animationRequestIdRef.current) {
        cancelAnimationFrame(animationRequestIdRef.current)
      }
    };
  }, [cells, size, cornerSize, smallSize, isMove, playersPosition]); 

  return { animateBoard, animationRequestIdRef, boardRef, width, height }
}