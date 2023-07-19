import { GameNotification } from "../game-notification/GameNotification";
import { GamePlayers } from "../game-players/GamePlayers";
import { GameManagement } from "../game-management/GameManagement";
import { GameMessage } from "../send-message/GameMessage";
import styles from "./CenterBoard.module.scss";

interface CenterBoardProps {
  sizeCenterInBoard: () => {
    width: number;
    height: number;
    top: number;
    left: number;
  }
}

const CenterBoard = ({ sizeCenterInBoard }: CenterBoardProps) => {
  const { height, left, top, width } = sizeCenterInBoard()

  return (
    <section style={{width, height, left, top}} className={styles.root}>
      <div className={styles.left_side}>
      <GameNotification />
      <GameManagement />
      <GameMessage />
      </div>
      <GamePlayers />
    </section>
  );
};

export { CenterBoard };