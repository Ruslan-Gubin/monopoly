import dynamic from 'next/dynamic';
const GameCanvas = dynamic(() => import('./game-canvas/GameCanvas'))
const CenterBoard = dynamic(() => import('./center-board/CenterBoard'))

export {
  GameCanvas,
  CenterBoard,
}