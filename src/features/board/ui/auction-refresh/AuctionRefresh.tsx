import { FC } from "react";
import { BoardModel, useAuction, useBoardAction, useCells, usePlayer } from "@/entities";
import { ButtonRG } from "@/shared";

interface Props {
  board: BoardModel
}


const AuctionRefresh: FC<Props> = ({ board }) => {
  const { boardSockedSend } = useBoardAction()
  const { player } = usePlayer()
  const { cells } = useCells()
  const { auction } = useAuction()

  
    const handleAuctionRefresh = () => {  
      const currentCell = cells?.find(cell => cell._id === board.currentCellId)
      if (!currentCell || !auction || !player) {
        console.error('Failed find current cell to action refresh');
        return;
      };

      boardSockedSend({
        method: 'auctionRefresh',
          body: {
            ws_id: board.ws_id,
            cell_name: currentCell.name,
            player_name: player.name,
            property_price: currentCell.price,
            board_id: board._id,
            players: board.players.filter(otherPlayer => otherPlayer !== player?._id),
            auction_id: auction._id,
          }
      })
    }
 

  return (
    <ButtonRG  
      handleClick={handleAuctionRefresh} 
      color="success" 
      type="button" 
      >
      Объявить аукцион
     </ButtonRG>   
  );
};

export { AuctionRefresh };