import { AuctionRefresh, BuyProperty, OfferDeal, SendOffer, ThrowDice, UpdateProperty } from "@/features";

import styles from "./GameManagement.module.scss";

const GameManagement = () => {

  return (
    <div className={styles.root}>
      <ThrowDice />
      <OfferDeal />
      {/* <BuyProperty />  */}
      {/* <AuctionRefresh /> */}
      {/* <SendOffer /> */}
      <UpdateProperty />
    </div>
  );
};

export { GameManagement };