import { useCallback, useEffect } from 'react';
import { calculateSizeBoard, getCellsPosition, useBoardAction, useCells, useCellsAction, usePlayerAction, useViewer, getCellRace } from '@/entities';
import { Loader, useScreenSize } from '@/shared';
import GameCanvas from '@/widgets/game/game-canvas/GameCanvas';
import CenterBoard from '@/widgets/game/center-board/CenterBoard';

import styles from '@/app/styles/pages/GameBoardPage.module.scss';


const GameBoardPage = () => {
  const { cellsUpdateSize } = useCellsAction()
  const { width, height } = useScreenSize()
  const { initBoard, connectedBoard } = useBoardAction()
  const { isCells, cells, cornerSize } = useCells()
  const { viewer } = useViewer()
  const { playerUpdatePosition } = usePlayerAction()


  const connectWs = useCallback((method: string) => {
    if (!viewer) return;
    const boardId = window.location.pathname.replace(/\/game-board\//, '')
      connectedBoard({
        method,
        body: {
        fullName: viewer.fullName,  
        id: viewer.viewerId,
        boardId,
      },
    });
  },[viewer])

  useEffect(() => { 
      connectWs('connect') 
 
      return () => { 
        connectWs('disconect')
      };
    }, [connectWs]);

  useEffect(() => { 
    if (!cells) return;
    const { cornerCell, smallCell, initSize } = calculateSizeBoard(width, height) 
    
    const updateCells = getCellsPosition({...initSize, x: 0, y: 0}, cells)
    const raceCells = getCellRace(cornerCell, {...initSize, x: 0, y: 0})
    
    if (!updateCells) return;
    initBoard({ initSize })
    cellsUpdateSize({ updateCells, cellsSize: { cornerCell, smallCell }, raceCells })
    playerUpdatePosition({ cells: updateCells, cellSize: smallCell })
  },[ isCells, width, height ]) 


  if (!isCells || !cornerSize) {
    return <Loader />;
  }

  return (
   <div className={styles.root}>
    <GameCanvas />
    <CenterBoard /> 
    </div>
  );
};

export default  GameBoardPage;
