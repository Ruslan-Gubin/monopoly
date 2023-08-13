import { FC, useMemo } from "react";
import { GameNotification } from "../game-notification/GameNotification";
import { GamePlayers } from "../game-players/GamePlayers";
import { GameManagement } from "../game-management/GameManagement";
import { GameMessage } from "../send-message/GameMessage";
import { ISize, useBoard } from "@/entities";
import { GameOver } from "@/features";

import styles from "./CenterBoard.module.scss";

interface CenterBoardProps {
  size: ISize;
  cornerSize: number;
}

const CenterBoard: FC<CenterBoardProps> = ({ cornerSize, size }) => {
  const { board } = useBoard()

  const centerCoordinateSize = useMemo(() => {
    return {
      width: size.width - (cornerSize * 2),
      height: size.height - (cornerSize * 2),
      left: size.x + cornerSize,
      top: size.y + cornerSize
    }
  }, [cornerSize, size])


  return (
    <>
    <section 
    style={centerCoordinateSize} 
    className={styles.root}
    >
    {board && board.players.length > 1 ?
    <>
    <div className={styles.left_side}>
    <GameNotification />
    <GameManagement />
    <GameMessage />
    </div>
    <GamePlayers />
    </>
     : 
     <GameOver />
    }
  
    </section>
  </>
  );
};

export default CenterBoard;