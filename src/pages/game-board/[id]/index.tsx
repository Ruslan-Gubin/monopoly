import { useEffect } from 'react';
import { config, Loader, PRODUCTION_API_ENDPOINT, useRouterNavigation, useScreenSize } from '@/shared';
import { BoardModel, calculateSizeBoard, CellModel, DiceModel, PlayerModel, useBoard, useBoardAction, useCells, useCellsAction, useViewer } from '@/entities';
import { boardSockedSend, boardSocketMessage } from '@/entities/board/model/connect-ws';
import { GameCanvas, CenterBoard } from '@/widgets';
import { GetServerSideProps, GetServerSidePropsContext } from 'next/types';
import { useRouter } from "next/router";



const GameBoardPage = ({ boardId, cells, players, board, dice }: any) => {
  const { query, pathname } = useRouterNavigation()
  const { fetchAllCells, clearCells, cellsUpdateSize } = useCellsAction()
  const { width, height } = useScreenSize()
  const { initBoard, connectedBoard } = useBoardAction()
  const { size } = useBoard()
  const {  loading, error } = useCells()
  const { viewer } = useViewer()

console.log(boardId, cells, players, board, dice)

// 64c161122651b621676aad7c


  useEffect(() => {
    if (!viewer || !query.id) return;
    console.log(viewer, query.id)
    connectedBoard({
        method: "connect",
        body: {
          fullName: viewer.fullName,
          id: viewer.viewerId,
          boardId: String(query.id)
        },
      });
     
    return () => { 
      connectedBoard({
        method: "disconect",
        body: {
          fullName: viewer.fullName,
          id: viewer.viewerId,
          boardId: String(query.id)
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


  if (loading || !cells || !size || !query.id) {
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


export const getServerSideProps: GetServerSideProps<any> = async(context: GetServerSidePropsContext) => {
  let boardId = context.query.id as string

  const responseCells = await fetch(`${config.API_ENDPOINT}/all-cells/${'nep'}`)
  const cells = await responseCells.json()

  const responsePlayers = await fetch(`${config.API_ENDPOINT}/players-board/${boardId}`)
  const players = await responsePlayers.json()

  const responseBoard = await fetch(`${config.API_ENDPOINT}/get-board/${boardId}`)
  const board = await responseBoard.json()

  const diceBoardId = board.dice

  const responseDice = await fetch(`${config.API_ENDPOINT}/dice-board/${diceBoardId}`)
  const dice = await responseDice.json()


  return { props: { boardId, cells, players, board, dice } }
}

export default  GameBoardPage;