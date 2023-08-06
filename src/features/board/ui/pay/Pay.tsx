import { FC } from "react";
import { BoardModel, PlayerModel, useBoardAction, useDice, useProperty } from "@/entities";
import { ButtonRG } from "@/shared";

interface Props {
  board: BoardModel
   player: PlayerModel
}

const Pay: FC<Props> = ({ board, player }) => {
  const { dice } = useDice()
  const { propertyes } = useProperty()
  const { boardSockedSend } = useBoardAction()


  const handleRoollDice = () => {
    if (!dice) return;
    const propertyOwnerId = propertyes.find(property => property.position === player.position)?.owner;
    boardSockedSend({
      method: 'pay',
      body: {
        board_id: board._id,
        player_id: board.currentPlayerId,
        price: board.price,
        isDouble: dice.isDouble,
        players: board.players,
        player_name: player.name,
        propertyOwnerId,
      }
    })
  }

  const priceText = `Заплатить: ${board.price}`

  return (
    <ButtonRG
      handleClick={handleRoollDice} 
      color="success" 
      type="button" 
      >
      {priceText}
    </ButtonRG>
  );
};

export { Pay };