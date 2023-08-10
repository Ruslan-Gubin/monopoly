import { useAnimationBoard } from "@/features";

const GameCanvas = () => {
  const { boardRef } = useAnimationBoard();

  return <canvas id="boardGame" ref={boardRef}></canvas>;
};

export default GameCanvas;
