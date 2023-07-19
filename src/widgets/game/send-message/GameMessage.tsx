import { GameSendMessage } from "@/features";
import { ChangeEvent, useState } from "react";

import styles from './GameMessage.module.scss';

const GameMessage = () => {
  const [value, setValue] = useState<string>("");

  const handleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(() => e.target.value);
  };

  const cancelValue = () => {
    setValue(() => '');
  };

  return (
    <div className={styles.root}>
    <input className={styles.input} value={value} onChange={handleChangeValue} placeholder='Напишите сообщение'  />
    {value.length > 2 && 
    <GameSendMessage  value={value} cancelValue={cancelValue}  />
    }
    </div>
  );
};

export { GameMessage };