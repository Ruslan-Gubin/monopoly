'use client'
import { FC } from "react";
import {  useBoard, useCells, useDice, usePlayer, usePlayerAction } from "@/entities";
import { useAnimationBoard } from "@/features";
import { getRandomNumber, useRouterNavigation } from "@/shared";

import styles from "./GameCanvas.module.scss";

const GameCanvas: FC = () => {
  const { cells } = useCells()  
  const { setMoveValue } = usePlayerAction()
  const { boardRef, mouseHeight, mouseWidth } = useAnimationBoard()
  const { players } = usePlayer()
  const { board } = useBoard()
  const { dice } = useDice()

  const handleRoollDice = () => {
    if (!board) return;
    const dice1 = getRandomNumber(1, 6);
    const dice2 = getRandomNumber(1, 6);
    const activePlayer = players.find(player => player._id === board.currentPlayerId)
    if (!activePlayer) return;
    const prevPosition = activePlayer.previous_position
  
    let newPosition = dice1 + dice2 + prevPosition;
    const totalCell = 39;


    if (newPosition > totalCell) {
      const prev = 36;
      const totalDiceSum = dice1 + dice2;
      newPosition =  (totalDiceSum - (totalCell - prev)) - 1;
    }

    const cellTarget = cells?.find(cell => cell.position === newPosition)
    if (!cellTarget) return;
    const targetX = cellTarget.x + (cellTarget.width / 2) 
    const targetY = cellTarget.y + (cellTarget.height / 2) 
    setMoveValue({ isMove: true, dices: { first: dice1, second: dice2 }, target: { x: targetX, y: targetY } })
  }

  return (
    <div className={styles.root}>
      <div className={styles.position}>
        <span>Width X: {mouseWidth}</span>
        <span>Height Y: {mouseHeight}</span>
        <button onClick={handleRoollDice}>Бросить кость</button>
      </div>
      <canvas id='boardGame' ref={boardRef}></canvas>
    </div>
  );
};

export default GameCanvas ;
