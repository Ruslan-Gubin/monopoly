import { FC } from "react";
import { BoardModel, useBoardAction, useDice, usePlayer } from "@/entities";
import { ButtonRG } from "@/shared";

interface Props {
  board: BoardModel
}

const Pay: FC<Props> = ({ board }) => {
  const { player } = usePlayer()
  const { dice } = useDice()
  const { boardSockedSend } = useBoardAction()

  if (!board || !player || board.action !== 'need pay' || player.money < board.price) {
    return null;
  }

 
  const handleRoollDice = () => {
    if (!board || !player || !dice) return;
    boardSockedSend({
      method: 'pay',
      body: {
        board_id: board._id,
        player_id: board.currentPlayerId,
        price: board.price,
        isDouble: dice.isDouble,
        players: board.players,
        player_name: player.name,
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