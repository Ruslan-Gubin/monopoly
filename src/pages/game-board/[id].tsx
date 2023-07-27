import { useEffect } from 'react';
import { config, Loader, PRODUCTION_API_ENDPOINT, useRouterNavigation, useScreenSize } from '@/shared';
import { BoardModel, calculateSizeBoard, CellModel, DiceModel, PlayerModel, useBoard, useBoardAction, useCells, useCellsAction, useViewer } from '@/entities';
import { boardSockedSend, boardSocketMessage } from '@/entities/board/model/connect-ws';
import { GameCanvas, CenterBoard } from '@/widgets';
import { GetServerSideProps, GetServerSidePropsContext } from 'next/types';

interface GameBoardPageProps {
  boardId: string, 
  cells: CellModel[], 
  players: PlayerModel[], 
  board: BoardModel,
  dice: DiceModel,
}


const GameBoardPage = ({ boardId, cells, players, board, dice }: GameBoardPageProps) => {
  const { query } = useRouterNavigation()
  const { fetchAllCells, clearCells, cellsUpdateSize } = useCellsAction()
  const { width, height } = useScreenSize()
  const { initBoard, connectedBoard } = useBoardAction()
  const { size } = useBoard()
  const {  loading, error } = useCells()
  const { viewer } = useViewer()

// 64c161122651b621676aad7c

  console.log(boardId, cells, players, board, dice)


  useEffect(() => {
    console.log(viewer, boardId)
    if (!viewer ) return;
    connectedBoard({
        method: "connect",
        body: {
          fullName: viewer.fullName,
          id: viewer.viewerId,
          boardId: boardId
        },
      });
     
    return () => { 
      connectedBoard({
        method: "disconect",
        body: {
          fullName: viewer.fullName,
          id: viewer.viewerId,
          boardId: boardId
        },
      });
    };
  }, [viewer, query]);


  // useEffect(() => {
  //   fetchAllCells('nep');
  //   return () => {
  //     clearCells()
  //   }
  // }, [])


  // useEffect(() => {
  //   if (!cells || loading || !width || !height) return;
  //   const { cornerCell, smallCell, size: initSize } = calculateSizeBoard(width, height)
    
  //   initBoard({ initSize })
  //   cellsUpdateSize({size: {...initSize, x: 0, y: 0}, cells, cellsSize: { cornerCell, smallCell }})
    
  // },[width, height, loading])


  if (loading || !cells || !size) {
    return <Loader />;
  }
  
  if (error) {
    return <div>Error: {error}</div>;
  }


  return (
   <>
   <div>Hello</div>
    <GameCanvas />
    {/* <CenterBoard 
    sizeCenterInBoard={sizeCenterInBoard} 
    />  */}
    </>
  );
};


export const getServerSideProps: GetServerSideProps<GameBoardPageProps> = async(context: GetServerSidePropsContext) => {
  let boardId = context.query.id as string
  const responseCells = await fetch(`${config.API_ENDPOINT}/all-cells/${'nep'}`)
  const cells = await responseCells.json()

  const responsePlayers = await fetch(`${config.API_ENDPOINT}/players-board/${boardId}`)
  const players = await responsePlayers.json()

  const responseBoard = await fetch(`${config.API_ENDPOINT}/get-board/${boardId}`)
  const board = await responseBoard.json()

  const diceBoardId = board[0].dice
console.log(board[0].dice)
  const responseDice = await fetch(`${config.API_ENDPOINT}/dice-board/${diceBoardId}`)
  const dice = await responseDice.json()


  return { props: { boardId, cells, players, board, dice } }
}

export default  GameBoardPage;