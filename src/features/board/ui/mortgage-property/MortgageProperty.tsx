import { FC } from "react";
import { BoardModel, useBoardAction, useDice, usePlayer } from "@/entities";
import { ButtonRG } from "@/shared";

interface Props {
  board: BoardModel
}

const MortgageProperty: FC<Props> = ({ board }) => {
  const { player } = usePlayer()
  const { dice } = useDice()
  const { boardSockedSend } = useBoardAction()

  if (!board || board.action !== 'pay tax') {
    return null;
  }

 
  const handleRoollDice = () => {
    if (!board || !player || !dice) return;
    console.log('morgageProperty')
    boardSockedSend({
      method: 'morgageProperty',
      body: {
        // current_id: player._id,
        // dice_id: dice._id,
        // board_id: player.board_id,
        // user_name: player.name,
      }
    })
  }

  return (
    <ButtonRG
      handleClick={handleRoollDice} 
      color="success" 
      type="button" 
      >
      Заложить собственность
    </ButtonRG>
  );
};

export { MortgageProperty };