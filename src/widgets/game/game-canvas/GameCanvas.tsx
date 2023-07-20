import { BoardGame, CellsGame, useBoard, useCells } from "@/entities";
import { CanvasDraw, GAME_BOARD_SRC } from "@/shared";
import { debounce } from "@/shared/lib/helpers/debounce";
import { FC, useEffect, useRef, useState } from "react";

import styles from "./GameCanvas.module.scss";


const GameCanvas: FC = ({    }) => {
  const boardRef = useRef<HTMLCanvasElement>(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const { cells, cornerSize, smallSize } = useCells()
  const { size } = useBoard()


  useEffect(() => {
    if (!boardRef.current || !cells || !size) return;
    boardRef.current.style.position = "absolute";
    boardRef.current.style.top = `${size.y}px`;
    boardRef.current.style.left = `${size.x}px`;
    boardRef.current.width = size.width;
    boardRef.current.height = size.height;


    const context = boardRef.current.getContext("2d");

    if (!context) return;

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

    let count = cornerSize + 13;
    let direction = 'right';

    const getStarsColors = () => {
      if (count > cornerSize + 13 && count <  200) {
        cellsGame.changeStarsColor = '#ffffff'
      } else if (count >  200 && count <  300) {
        cellsGame.changeStarsColor = '#fff9d5'
      } else if (count >  300 && count <  400) {
        cellsGame.changeStarsColor = '#fce97b'
      } else if (count >  400 && count <  500) {
        cellsGame.changeStarsColor = '#fce356'
      }else if (count >  500 && count <  600) {
        cellsGame.changeStarsColor = '#fbde3b'
      }else if (count >  600 && count <  700) {
        cellsGame.changeStarsColor = '#fcdb20'
      }else if (count >  700 && count <  800) {
        cellsGame.changeStarsColor = '#ffd700'
      }
    }

    const animate = () => {
      if (!boardRef.current) return;
      requestAnimationFrame(animate);
      context.clearRect(0, 0, size.width, size.height);
      boardGame.update(count);
      cellsGame.update();
    
      getStarsColors()
     
      if (count > Math.round(size.width - cornerSize - 13) ) {
        direction = 'left'
      }
      if (count < cornerSize + 13 ) {
        direction = 'right'
      }
      
      if (direction === 'left') {
        count -= 2
      }
      
      if (direction === 'right') {
        count += 2;
      } 
    };

    requestAnimationFrame(animate);

    const node = boardRef.current;

    const move = (e: any) => {
      setWidth(e.offsetX);
      setHeight(e.offsetY);
    };
    const mouveDebounce = debounce(move);

    node.addEventListener("mousemove", mouveDebounce);

    return () => {
      cancelAnimationFrame(Number(animate));
      node.removeEventListener("mousemove", mouveDebounce);
    };
  }, [cells, size, cornerSize, smallSize]);

  return (
    <div className={styles.root}>
      <div className={styles.position}>
        <span>Width X: {width}</span>
        <span>Height Y: {height}</span>
      </div>
      <canvas id='boardGame' ref={boardRef}></canvas>
    </div>
  );
};

export { GameCanvas };
