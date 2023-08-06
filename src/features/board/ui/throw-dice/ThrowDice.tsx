import { FC } from "react";
import { BoardModel, PlayerModel, useBoardAction, useDice, } from "@/entities";
import { ButtonRG } from "@/shared";

interface Props {
  board: BoardModel
  player: PlayerModel
}

const ThrowDice: FC<Props> = ({ board, player }) => {
  const { dice } = useDice()
  const { boardSockedSend } = useBoardAction()


  const handleRoollDice = () => {
    if (!dice) return;
    boardSockedSend({
      method: 'roolDice',
      body: {
        ws_id: board.ws_id,
        dice_id: dice._id,
        board_id: board._id,
        user_name: player.name,
        in_jail: player.in_jail,
        player_id: board.currentPlayerId,
        players: board.players,
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