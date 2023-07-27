'use client'
import { FC, useLayoutEffect } from "react";
import {  PlayerModel, useCells, usePlayerAction } from "@/entities";
import { useAnimationBoard } from "@/features";
import { ButtonMain, getRandomNumber, useRouterNavigation } from "@/shared";

import styles from "./GameCanvas.module.scss";

export const mockPlayers = [ 
  { _id: 'player1', position: 39, is_active: false, color: 'red' },
  { _id: 'player2', position: 11, is_active: false, color: 'blue' },
  { _id: 'player3', position: 11, is_active: false, color: 'green' },
  { _id: 'player4', position: 11, is_active: false, color: 'yellow' },
  { _id: 'player5', position: 11, is_active: false, color: 'pink' },
  { _id: 'player6', position: 11, is_active: false, color: 'black' },
] as PlayerModel[]

const GameCanvas: FC = () => {
  const { cells,  smallSize } = useCells()  
  const { playerUpdatePosition, setMoveValue } = usePlayerAction()
  const { boardRef, height, width } = useAnimationBoard()
  const { navigate } = useRouterNavigation()

  useLayoutEffect(() => {
    if (!cells) return;
    playerUpdatePosition({
      cells,
      cellSize: smallSize,
      players: mockPlayers
    })
  },[])


  const handleRoollDice = () => {
    const dice1 = getRandomNumber(1, 6);
    const dice2 = getRandomNumber(1, 6);
    const prevPosition = mockPlayers.find(player => player.color === 'blue');
    if (!prevPosition) return;
    let newPosition = dice1 + dice2 + prevPosition.position;
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
        <span>Width X: {width}</span>
        <span>Height Y: {height}</span>
        <button onClick={handleRoollDice}>Бросить кость</button>
        <button onClick={() => navigate('push', '/')}>Go Home</button>
      </div>
      <canvas id='boardGame' ref={boardRef}></canvas>
    </div>
  );
};

export default GameCanvas ;
