import { FC } from "react";
import { BoardModel, CellModel, DiceModel, useAuction,  usePlayer } from "@/entities";
import { ButtonRG } from "@/shared";

interface Props {
  board: BoardModel;
  cells: CellModel[];
  dice: DiceModel;
  handleSendAction: (body: object) => void;
}


const AuctionAction: FC<Props> = ({ board, cells, handleSendAction, dice }) => {
  const { player } = usePlayer()
  const { auction } = useAuction()

  
    const handleAuctionAction = (action: boolean) => {  
      const currentCell = cells.find(cell => cell._id === auction?.cell_id)
      if (!currentCell || !auction || !player) {
        console.error('Failed find current cell to action refresh');
        return;
      };

      handleSendAction({
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
    {player && auction && player?.money >= auction?.price &&
    <ButtonRG  
    handleClick={() => handleAuctionAction(true)} 
    color="success" 
    type="button" 
    >
      {upAuctionText}
     </ButtonRG>   
      }
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