import { FC } from "react";
import { BoardModel, DiceModel, PlayerModel, } from "@/entities";
import { ButtonRG } from "@/shared";

interface Props {
  board: BoardModel;
  player: PlayerModel;
  dice: DiceModel;
  handleSendAction: (body: object) => void;
}

const ThrowDice: FC<Props> = ({ board, player, dice, handleSendAction }) => {

  const rollDiceBody = {
    method: 'roolDice',
      body: {
        ws_id: board.ws_id,
        dice_id: dice._id,
        board_id: board._id,
        user_name: player.name,
        in_jail: player.in_jail,
        player_id: board.currentPlayerId,
        players: board.players,
        current_jail: player.current_jail,
    }
  }

  return (
    <ButtonRG
      handleClick={() => handleSendAction(rollDiceBody)} 
      color="success" 
      type="button" 
      >
      Бросить кости
    </ButtonRG>
  );
};

export { ThrowDice };