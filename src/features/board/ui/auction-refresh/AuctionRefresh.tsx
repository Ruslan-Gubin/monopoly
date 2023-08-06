import { FC } from "react";
import { BoardModel, useBoardAction, useCells, usePlayer } from "@/entities";
import { ButtonRG } from "@/shared";

interface Props {
  board: BoardModel
}


const AuctionRefresh: FC<Props> = ({ board }) => {
  const { boardSockedSend } = useBoardAction()
  const { player } = usePlayer()
  const { cells } = useCells()

  
    const handleAuctionRefresh = () => {  
      const currentCell = cells?.find(cell => cell._id === board.currentCellId)
      if (!currentCell) {
        console.error('Failed find current cell to action refresh');
        return;
      };

      boardSockedSend({
        method: 'auctionRefresh',
          body: {
            ws_id: board.ws_id,
            cell_name: currentCell.name,
            player_name: player?.name,
            property_price: currentCell.price,
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