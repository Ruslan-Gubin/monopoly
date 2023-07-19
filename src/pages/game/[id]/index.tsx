import { Layout } from '@/widgets';
import { Loader, useRouterNavigation, useScreenSize } from '@/shared';
import { useEffect } from 'react';
import { calculateSizeBoard,  getCellsPosition, useBoard, useBoardAction, useCells, useCellsAction } from '@/entities';
import { CenterBoard } from '@/widgets/game/center-board/CenterBoard';
import { GameCanvas } from '@/widgets/game/game-canvas/GameCanvas';

const Game = () => {
  const { query } = useRouterNavigation()
  const { fetchAllCells, clearCells, cellsUpdateSize } = useCellsAction()
  const { width, height } = useScreenSize()
  const { initBoard } = useBoardAction()
  const { size } = useBoard()
  const { cells, loading, error } = useCells()
 
  useEffect(() => {
    fetchAllCells('nep');
    return () => {
      clearCells()
    }
  }, [])

  useEffect(() => {
    if (!cells || loading || !width || !height) return;
    const { cornerCell, smallCell, size: initSize } = calculateSizeBoard(width, height)
    
    initBoard({ initSize })
    cellsUpdateSize({size: {...initSize, x: 0, y: 0}, cells, cellsSize: { cornerCell, smallCell }})
  },[width, height, loading])


  if (loading || !cells || !size) {
    return <Loader />;
  }
  
  if (error) {
    return <div>Error: {error}</div>;
  }


  return (
  // <Layout title="Игра" keywords="Game">
   <>
    <GameCanvas />

    {/* <CenterBoard 
    sizeCenterInBoard={sizeCenterInBoard} 
    />  */}
    </>
  // </Layout>
  );
};

export default Game;