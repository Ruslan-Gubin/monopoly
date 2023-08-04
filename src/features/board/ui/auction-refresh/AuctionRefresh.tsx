import { BoardModel } from "@/entities";
import { ButtonRG } from "@/shared";
import { FC } from "react";

interface Props {
  board: BoardModel
}


const AuctionRefresh: FC<Props> = ({ board }) => {

  if (board &&  board.action !== 'can buy') {
    return null;
  }

  const handleAuctionRefresh = () => {
    console.log('Объявить аукцион')
  }

  return (
    <ButtonRG  
      handleClick={handleAuctionRefresh} 
      color="success" 
      type="button" 
      >
      Объявить аукцион
     </ButtonRG>   
  );
};

export { AuctionRefresh };