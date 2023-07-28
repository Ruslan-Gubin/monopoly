import { useEffect } from 'react';
import { config, Loader, PRODUCTION_API_ENDPOINT, useRouterNavigation, useScreenSize } from '@/shared';
import { BoardModel, calculateSizeBoard, CellModel, DiceModel, PlayerModel, useBoard, useBoardAction, useCells, useCellsAction, usePlayerAction, useViewer } from '@/entities';
import { boardSockedSend, boardSocketMessage } from '@/entities/board/model/connect-ws';
import { GameCanvas, CenterBoard } from '@/widgets';
import { GetServerSideProps, GetServerSidePropsContext } from 'next/types';

// 64c295fc429d37f4db4c8488

const GameBoardPage = () => {
  const { query } = useRouterNavigation()
  const { cellsUpdateSize } = useCellsAction()
  const { width, height } = useScreenSize()
  const { initBoard, connectedBoard } = useBoardAction()
  const { size, loading, error } = useBoard()
  const { isCells,cells, smallSize  } = useCells()
  const { viewer } = useViewer()
  const { playerUpdatePosition } = usePlayerAction()

  useEffect(() => {
    if (!viewer || !query.id ) return;
      connectedBoard({
        method: "connect",
        body: {
          fullName: viewer.fullName,  
          id: viewer.viewerId,
          boardId: String(query.id),
        },
      });

      
    return () => { 
      connectedBoard({
        method: "disconect",
        body: {
          fullName: viewer.fullName,
          id: viewer.viewerId,
          boardId: String(query.id),
        },
      });
    };
  }, [ viewer, query.id ]);

  useEffect(() => {
    if (!cells) return;
    playerUpdatePosition({
      cells,
      cellSize: smallSize,
    })
  },[smallSize])

  useEffect(() => { 
    if (loading || !width || !height || !isCells) return;

    const { cornerCell, smallCell, size: initSize } = calculateSizeBoard(width, height)
    
    initBoard({ initSize })
    cellsUpdateSize({size: {...initSize, x: 0, y: 0}, cellsSize: { cornerCell, smallCell }})
    
  },[width, height, isCells ])


  if (loading || !isCells || !size || !query.id) {
    return <Loader />;
  }
  
  if (error) {
    return <div>Error: {error}</div>;
  }


  return (
   <>
    <GameCanvas />
    {/* <CenterBoard 
    sizeCenterInBoard={sizeCenterInBoard} 
    />  */}
    </>
  );
};

export default  GameBoardPage;