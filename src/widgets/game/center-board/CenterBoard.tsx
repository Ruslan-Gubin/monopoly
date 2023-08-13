import { useMemo } from "react";
import { GameNotification } from "../game-notification/GameNotification";
import { GamePlayers } from "../game-players/GamePlayers";
import { GameManagement } from "../game-management/GameManagement";
import { GameMessage } from "../send-message/GameMessage";
import { useBoard, useCells } from "@/entities";
import { GameOver } from "@/features";

import styles from "./CenterBoard.module.scss";


const CenterBoard = () => {
  const { board, size, error } = useBoard()
  const { cornerSize } = useCells()
  

  const centerCoordinateSize = useMemo(() => {
    if (!size) return;
    return {
      width: size.width - (cornerSize * 2),
      height: size.height - (cornerSize * 2),
      left: size.x + cornerSize,
      top: size.y + cornerSize
    }
  }, [cornerSize, size])

 if (error) {
    return <div>Error: {error}</div>;
  }

  const checkGameOver =  board && board.players.length > 1


  return (
    <>
    <section
    style={centerCoordinateSize}
    className={styles.root}
    >
    {checkGameOver ?
    <>
    <div className={styles.left_side}>
    <GameNotification />
    <GameManagement />
    <GameMessage />
    </div>
    <GamePlayers />
    </>
     : 
     <GameOver board={board} />
    }
  
    </section>
  </>
  );
};

export default CenterBoard;