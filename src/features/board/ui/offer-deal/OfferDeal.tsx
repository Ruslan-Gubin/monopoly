import { BoardModel } from "@/entities";
import { ButtonRG } from "@/shared";
import { FC } from "react";

interface Props {
  board: BoardModel
}

const OfferDeal: FC<Props> = ({ board }) => {

  if (board && !board.start_move) {
    return null;
  }

  const handleOfferDeal = () => {
    console.log('Предложить сделку')
  }

  return (
    <ButtonRG 
      handleClick={handleOfferDeal} 
      color="success" 
      type="button" 
      >
      Предложить сделку
      </ButtonRG>
  );
};

export { OfferDeal };