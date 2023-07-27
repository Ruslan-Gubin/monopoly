'use client'
import { ChangeEvent, useState } from 'react';
import { SendMessage, TexareaMessage } from '@/features';

import styles from './SelectionSendMessage.module.scss';

const SelectionSendMessage = () => {
  const [value, setValue] = useState<string>("");

  const handleChangeValue = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(() => e.target.value);
  };

  const cancelValue = () => {
    setValue(() => '');
  };

  return (
    <div className={styles.root}>
    <TexareaMessage value={value} onChange={handleChangeValue} />
    {value.length > 2 && 
    <SendMessage  value={value} cancelValue={cancelValue}  />
    }
    </div>
  );
};

export  { SelectionSendMessage };