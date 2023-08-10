"use client";
import { useLayoutEffect, useRef } from "react";
import {
  BoardGame,
  useBoard,
  CellsGame,
  useCells,
  PlayersGame,
  usePlayer,
  useProperty,
} from "@/entities";
import { CanvasDraw, GAME_BOARD_SRC, GAME_OPTIONS } from "@/shared";
import { setupCanvas } from "../utils";
import { useAnimationBoardUpdate } from "./useAnimationBoardUpdate";

export const useAnimationBoard = () => {
  const { propertyes } = useProperty()
  const { cells, cornerSize, smallSize, cellRace } = useCells();
  const { size, board } = useBoard();
  const boardRef = useRef<HTMLCanvasElement>(null);
  const { playersPosition, isMove, target, players, newPosition, player } = usePlayer();
  const { animateBoard, animationRequestIdRef } = useAnimationBoardUpdate({
    size,
    board,
    target,
    players,
    cornerSize,
    cellRace,
    newPosition,
    player
  });

  useLayoutEffect(() => {
    if (!boardRef.current || !cells || !size) return;
    const context = setupCanvas(boardRef, size);

    const drawService = new CanvasDraw(context);

    const boardGame = new BoardGame({
      boardSize: { x: 0, y: 0, width: size.width, height: size.height },
      drawService,
      cellsSize: { corner: cornerSize, small: smallSize },
      centerSrc: GAME_BOARD_SRC.center,
    });

    const cellsGame = new CellsGame({
      drawService,
      cells: JSON.parse(JSON.stringify(cells)),
      propertyes: JSON.parse(JSON.stringify(propertyes)),
      images: GAME_BOARD_SRC.cells,
    });

    const playersGame = new PlayersGame({
      drawService,
      players: JSON.parse(JSON.stringify(playersPosition)),
      imageSrc: GAME_BOARD_SRC.players,
      frameHold: GAME_OPTIONS.frameHoldPlayer,
    });

    const animateClouser = animateBoard(
      context,
      boardGame,
      cellsGame,
      playersGame
    );
    if (animateClouser) {
      requestAnimationFrame(() => animateClouser(isMove));
    } else {
      console.error("animateClouser is undefined");
    }

    return () => {
      if (animationRequestIdRef.current) {
        cancelAnimationFrame(animationRequestIdRef.current);
      }
    };
  }, [cells, size, cornerSize, smallSize, isMove, playersPosition, propertyes, players, animateBoard, animationRequestIdRef]);

  return {
    animateBoard,
    animationRequestIdRef,
    boardRef,
  };
};
