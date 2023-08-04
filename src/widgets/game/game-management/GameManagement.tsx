import { useBoard, usePlayer } from "@/entities";
import { AuctionRefresh, BuyProperty, MortgageProperty, OfferDeal, Pay, SendOffer, ThrowDice, UpdateProperty } from "@/features";

import styles from "./GameManagement.module.scss";

const GameManagement = () => {
  const { player } = usePlayer()
  const { board } = useBoard()

  if (!board || !player) return null;

  if (board.currentPlayerId !== player?._id) {
    return null;
  }


  return (
    <div className={styles.root}>
      <ThrowDice  board={board} />
      <Pay board={board} />
      <OfferDeal  board={board} />
      <BuyProperty  board={board} player={player} /> 
      <AuctionRefresh  board={board} />
      <SendOffer  board={board} />
      <UpdateProperty board={board} />
      <MortgageProperty board={board} />
    </div>
  );
};

export { GameManagement };