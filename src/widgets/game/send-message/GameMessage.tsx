'use client'
import { ChangeEvent, useState } from "react";
import { GameSendMessage } from "@/features";

import styles from './GameMessage.module.scss';

const GameMessage = () => {
  const [value, setValue] = useState<string>("");

  const handleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(() => e.target.value);
  };

  const cancelValue = () => {
    setValue(() => '');
  };

  const activeInput = value.length > 0

  return (
    <div className={activeInput ? `${styles.root} ${styles.active}` : styles.root}>
    <input className={styles.input} value={value} onChange={handleChangeValue} placeholder='Напишите сообщение'  />
    {activeInput && 
    <>
    <div className={styles.cancel} onClick={cancelValue}>x</div>
    <GameSendMessage  value={value} cancelValue={cancelValue} />
    </>
    }
    </div>
  );
};

export { GameMessage };