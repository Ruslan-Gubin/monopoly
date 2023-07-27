import { FC } from "react";
import { PlayerConfirmation } from "@/features";
import { UserAvatar } from "@/shared";

import styles from "./ConfirmPlayerList.module.scss";

interface ConfirmPlayerListProps {
  checkIsActive: boolean;
  players: PlayerConfirmation[];
}

const ConfirmPlayerList: FC<ConfirmPlayerListProps> = ({
  checkIsActive,
  players,
}) => {
  if (!checkIsActive) {
    return null;
  }

  return (
    <ul className={styles.player_list}>
      {players.map((player) => (
        <li key={player.id} className={styles.player_img}>
          <div className={styles.img_container}>
            {player.confirmation && (
              <div
                className={
                  player.color
                    ? `${styles.player_active} ${styles[player.color]}`
                    : styles.player_active
                }
              ></div>
            )}
            <UserAvatar image={player.img} />
          </div>
        </li>
      ))}
    </ul>
  );
};

export { ConfirmPlayerList };
