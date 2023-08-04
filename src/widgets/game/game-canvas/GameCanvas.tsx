import { useAnimationBoard } from "@/features";

import styles from "./GameCanvas.module.scss";

const GameCanvas = () => {
  const { boardRef, mouseHeight, mouseWidth } = useAnimationBoard()


  return (
    <div className={styles.root}>
      <div className={styles.position}>
        <span>Width X: {mouseWidth}</span>
        <span>Height Y: {mouseHeight}</span>
      </div>
      <canvas id='boardGame' ref={boardRef}></canvas>
    </div>
  );
};

export default GameCanvas ;
