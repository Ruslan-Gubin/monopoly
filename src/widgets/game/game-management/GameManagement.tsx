import {  useAuction, useBoard, usePlayer } from "@/entities";
import { AuctionAction, AuctionRefresh, BuyBackProperty, BuyProperty, MortgageProperty, OfferDeal, Pay, SendOffer, ThrowDice, UpdateProperty } from "@/features";

import styles from "./GameManagement.module.scss";

const GameManagement = () => {
  const { player, isMove } = usePlayer()
  const { board } = useBoard()
  const { auction } = useAuction()

  
  if (!board || !player || isMove || !auction) return null;

  const playerActive = board.currentPlayerId === player._id
  const auctionActive = auction.players.includes(player._id)


  return (
    <div className={styles.root}>
      
      {board.action === 'start move' && playerActive &&
      <ThrowDice board={board} player={player} />
      }
      {board.action === 'start move' && !player.in_jail && playerActive &&
      <UpdateProperty board={board} player={player} />
      }
      {board.action === 'start move' && playerActive &&
      <BuyBackProperty board={board} player={player} />
      }

      {board.action === 'need pay' && player.money >= board.price && playerActive &&
      <Pay board={board} player={player} />
      }

      {/* {board.action === 'start move' && playerActive && //TODO REMOVE
      <OfferDeal  board={board} />
      } */}

      {board.action === 'can buy' && player.money >= board.price && playerActive &&
      <BuyProperty  board={board} player={player} />
      }
      {board.action === 'can buy' && playerActive &&
      <AuctionRefresh  board={board} />
      }

      {board.action === 'auction' && auctionActive && 
      <AuctionAction board={board} />
      }

      {/* <SendOffer  board={board} /> //TODO REMOVE */} 
      {board.action === 'need pay'  &&  player.money < board.price && playerActive &&
      <MortgageProperty board={board} player={player} />
      }
    </div>
  );
};

export { GameManagement };