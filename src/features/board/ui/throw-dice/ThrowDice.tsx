import { FC } from "react";
import { BoardModel, useBoardAction, useDice, usePlayer, useProperty } from "@/entities";
import { ButtonRG } from "@/shared";

interface Props {
  board: BoardModel
}

const ThrowDice: FC<Props> = ({ board }) => {
  const { player } = usePlayer()
  const { dice } = useDice()
  const { boardSockedSend } = useBoardAction()
  const { propertyes } = useProperty()

  // if (board && board.action !== 'can buy') {
  if (board && board.action !== 'start move') {
    return null;
  }

 
  const handleRoollDice = () => {
    if (!board || !player || !dice) return;
    boardSockedSend({
      method: 'roolDice',
      body: {
        current_id: player._id,
        dice_id: dice._id,
        board_id: player.board_id,
        user_name: player.name,
        in_jail: player.in_jail,
        player_id: player._id
      }
    })
  }

  return (
    <ButtonRG
      handleClick={handleRoollDice} 
      color="success" 
      type="button" 
      >
      Бросить кости
    </ButtonRG>
  );
};

export { ThrowDice };