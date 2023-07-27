'use client'
import { ChangeEvent, FC, useEffect, useRef } from 'react';

import styles from './TexareaMessage.module.scss';

interface TexareaMessageProps {
  value:string, onChange:(e: ChangeEvent<HTMLTextAreaElement>) => void
}

const TexareaMessage: FC<TexareaMessageProps> = ({value, onChange}) => {

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!textAreaRef.current) return;
    const texarea = textAreaRef.current;

    texarea.style.height = "0px";
    const scrollHeight = texarea.scrollHeight;

    texarea.style.height = scrollHeight + "px";
  }, [textAreaRef, value]);

  return (
    <textarea
        className={styles.textarea}
        id="review-text"
        onChange={onChange}
        placeholder="Введите сообщение"
        ref={textAreaRef}
        rows={1}
        value={value}
      />
  );
};

export { TexareaMessage };