import { FC } from "react";
import { BoardModel, PlayerModel, useBoardAction, useCells, useDice } from "@/entities";
import { ButtonRG } from "@/shared";

interface Props {
  board: BoardModel
  player: PlayerModel
}

const BuyProperty: FC<Props> = ({ board, player }) => {
  const { boardSockedSend } = useBoardAction()
  const { cells } = useCells()
  const { dice } = useDice()

  if (!dice || !cells ) {
    return null;
  }

  const handleBuyProperty = () => {
    const cell = cells.find(cell => cell.position === board.currentCellPosition)
    
    boardSockedSend({
      method: 'buyProperty',
        body: {
          board_id: board._id,
          player_id: board.currentPlayerId,
          cell,
          ws_id: board.ws_id,
          players: board.players,
          isDouble: dice.isDouble,
          player_color: player.color,
        }
    })
  }

  return (
    <ButtonRG  
      handleClick={handleBuyProperty} 
      color="success" 
      type="button" 
      >
      Купить
    </ButtonRG>
  );
};

export { BuyProperty };