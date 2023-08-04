import { BoardModel } from "@/entities";
import { ButtonRG } from "@/shared";
import { FC } from "react";

interface Props {
  board: BoardModel
}

const SendOffer: FC<Props> = ({ board }) => {

  if (board && board.choosing_action) {
    return null;
  }

  const handleSendOffer = () => {
    console.log('отправить предложение')
  }

  return (
      <ButtonRG
      handleClick={handleSendOffer} 
      color="success" 
      type="button" 
      >
      Отправить предложение
      </ButtonRG>
  );
};

export { SendOffer };