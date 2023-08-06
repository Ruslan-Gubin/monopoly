import { useBoard, usePlayer } from "@/entities";
import { AuctionRefresh, BuyBackProperty, BuyProperty, MortgageProperty, OfferDeal, Pay, SendOffer, ThrowDice, UpdateProperty } from "@/features";

import styles from "./GameManagement.module.scss";

const GameManagement = () => {
  const { player, isMove } = usePlayer()
  const { board } = useBoard()


  if (!board || !player || board.currentPlayerId !== player?._id || isMove) return null;



  return (
    <div className={styles.root}>
      
      {board.action === 'start move' &&
      <ThrowDice  board={board} player={player} />
      }
      {board.action === 'start move' && !player.in_jail && 
      <UpdateProperty board={board} player={player} />
      }
      {board.action === 'start move' && 
      <BuyBackProperty board={board} player={player} />
      }

      {board.action === 'need pay' && player.money >= board.price &&
      <Pay board={board} player={player} />
      }

      <OfferDeal  board={board} />

      {board.action === 'can buy' && player.money >= board.price && 
      <BuyProperty  board={board} player={player} />
      }
      {board.action === 'can buy' &&
      <AuctionRefresh  board={board} />
      }

      <SendOffer  board={board} />
      {board.action === 'need pay'  &&  player.money < board.price &&
      <MortgageProperty board={board} player={player} />
      }
    </div>
  );
};

export { GameManagement };