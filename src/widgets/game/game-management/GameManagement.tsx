import {
  useAuction,
  useBoard,
  useBoardAction,
  useCells,
  useDice,
  usePlayer,
} from "@/entities";
import {
  AuctionAction,
  AuctionRefresh,
  BuyBackProperty,
  BuyProperty,
  MortgageProperty,
  Pay,
  ThrowDice,
  UpdateProperty,
} from "@/features";

import styles from "./GameManagement.module.scss";

const GameManagement = () => {
  const { player, isMove } = usePlayer();
  const { board } = useBoard();
  const { auction } = useAuction();
  const { dice } = useDice();
  const { cells } = useCells();
  const { boardSockedSend } = useBoardAction();

  if (!board || !player || isMove || !auction || !dice || !cells) return null;

  const playerActive = board.currentPlayerId === player._id;
  const auctionActive = auction.players.includes(player._id);

  function handleSendAction<T extends object>(body: T) {
    boardSockedSend(body);
  }

  return (
    <div className={styles.root}>
      {board.action === "start move" && playerActive && (
        <ThrowDice
          handleSendAction={handleSendAction}
          board={board}
          player={player}
          dice={dice}
        />
      )}
      {board.action === "start move" && !player.in_jail && playerActive && (
        <UpdateProperty
          handleSendAction={handleSendAction}
          board={board}
          player={player}
        />
      )}
      {board.action === "start move" && playerActive && (
        <BuyBackProperty
          handleSendAction={handleSendAction}
          board={board}
          player={player}
        />
      )}

      {board.action === "need pay" &&
        player.money >= board.price &&
        playerActive && (
          <Pay
            handleSendAction={handleSendAction}
            board={board}
            player={player}
            dice={dice}
          />
        )}

      {board.action === "can buy" &&
        player.money >= board.price &&
        playerActive && (
          <BuyProperty
            handleSendAction={handleSendAction}
            board={board}
            player={player}
            dice={dice}
          />
        )}
      {board.action === "can buy" && playerActive && (
        <AuctionRefresh
          handleSendAction={handleSendAction}
          board={board}
          cells={cells}
        />
      )}

      {board.action === "auction" && auctionActive && (
        <AuctionAction
          handleSendAction={handleSendAction}
          board={board}
          dice={dice}
          cells={cells}
        />
      )}

      {board.action === "need pay" &&
        player.money < board.price &&
        playerActive && (
          <MortgageProperty
            handleSendAction={handleSendAction}
            board={board}
            player={player}
            cells={cells}
          />
        )}
    </div>
  );
};

export { GameManagement };
