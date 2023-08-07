import { FC } from "react";
import { BoardModel, useAuction, useBoardAction, useCells, useDice, usePlayer } from "@/entities";
import { ButtonRG } from "@/shared";

interface Props {
  board: BoardModel
}


const AuctionAction: FC<Props> = ({ board }) => {
  const { boardSockedSend } = useBoardAction()
  const { player } = usePlayer()
  const { cells } = useCells()
  const { auction } = useAuction()
  const { dice } = useDice()

  
    const handleAuctionAction = (action: boolean) => {  
      const currentCell = cells?.find(cell => cell._id === board.currentCellId)
      if (!currentCell || !auction || !player) {
        console.error('Failed find current cell to action refresh');
        return;
      };

      boardSockedSend({
        method: 'auctionAction',
          body: {
            ws_id: board.ws_id,
            player_name: player.name,
            price: auction.price,
            board_id: board._id,
            player_id: player._id,
            auction_id: auction._id,
            players: auction.players,
            last_player_bet: auction.last_player_bet,
            isDouble: dice?.isDouble,
            playersQueue: board.players,
            currentPlayerQueue: board.currentPlayerId,
            cell_name: currentCell.name,
            cell: currentCell,
            action,
          }
      })
    }
 
  const upAuctionText = `Повысить ставку ${auction?.price} Руб`;

  return (
    <>
    <ButtonRG  
      handleClick={() => handleAuctionAction(true)} 
      color="success" 
      type="button" 
      >
      {upAuctionText}
     </ButtonRG>   
    <ButtonRG  
      handleClick={() => handleAuctionAction(false)} 
      color="success" 
      type="button" 
      >
      Отказатся
     </ButtonRG>   
    </>
  );
};

export { AuctionAction };