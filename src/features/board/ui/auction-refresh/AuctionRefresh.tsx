import { FC } from "react";
import { BoardModel, CellModel, useAuction, useCells, usePlayer } from "@/entities";
import { ButtonRG } from "@/shared";

interface Props {
  board: BoardModel;
  cells: CellModel[]
  handleSendAction: (body: object) => void;
}

const AuctionRefresh: FC<Props> = ({ board, handleSendAction, cells }) => {
  const { player } = usePlayer()
  const { auction } = useAuction()

  
    const handleAuctionRefresh = () => {  
      const currentCell = cells?.find(cell => cell.position === player?.position)
      if (!currentCell || !auction || !player) {
        console.error('Failed find current cell to action refresh');
        return;
      };

      handleSendAction({
        method: 'auctionRefresh',
          body: {
            ws_id: board.ws_id,
            cell_name: currentCell.name,
            player_name: player.name,
            property_price: currentCell.price,
            cell_id: currentCell._id,
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