import { useGameNotification } from "@/entities";

import styles from "./GameNotification.module.scss";

const GameNotification = () => {
  const  { gameNotification }  = useGameNotification()

  return (
    <ul className={styles.root}>
      {gameNotification.map((notification, index) => 
      <li key={index} className={styles.notification}>
       <p className={styles.text}>{notification}</p>
       <span className={styles.separator}>***</span> 
        </li>
        )}
    </ul>
  );
};

export { GameNotification };