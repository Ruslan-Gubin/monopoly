import { FC, useState } from "react";
import { BoardModel, DiceModel, PlayerModel, useProperty } from "@/entities";
import { ButtonRG } from "@/shared";

interface Props {
  board: BoardModel
  player: PlayerModel
  dice: DiceModel;
  handleSendAction: (body: object) => void;
}

const Pay: FC<Props> = ({ board, player, dice, handleSendAction }) => {
  const [active, setActive] = useState(false)
  const { propertyes } = useProperty()


  const handleRoollDice = () => {
    if (!dice) return;
    const propertyOwnerId = propertyes.find(property => property.position === player.position)?.owner;
    handleSendAction({
      method: 'pay',
      body: {
        board_id: board._id,
        player_id: board.currentPlayerId,
        price: board.price,
        isDouble: dice.isDouble,
        players: board.players,
        player_name: player.name,
        propertyOwnerId,
        ws_id: board.ws_id,
      }
    })
    setActive(true)
  }

  const priceText = `Заплатить: ${board.price}`

  return (
    <ButtonRG
      disabled={active}
      handleClick={handleRoollDice} 
      color="success" 
      type="button" 
      >
      {priceText}
    </ButtonRG>
  );
};

export { Pay };