import {  memo } from "react";
import { MessageModel } from "@/features";
import {  UserAvatar } from "@/shared";

import styles from './SelectionMessage.module.scss';

interface SelectionMessageProps {
  message: MessageModel;
  clickAvatar: (value: string) => void
  timeMessage: (value: string) => string
  checkMyMessage: (id: string) => boolean
}

const SelectionMessage = memo(({ message, clickAvatar, checkMyMessage, timeMessage }: SelectionMessageProps) => {


  return (
    <div className={styles.root} data-id='selection-message-test'>
    <li className={checkMyMessage(message.authorId) ? `${styles.message} ${styles.mymessage}` : styles.message}>
      <div className={styles.author}>
        <UserAvatar image={message.image} size='vsm' onClick={() => clickAvatar(message._id)} />
        <span className={styles.author_name}>{message.fullName}</span>
      </div>
      <p className={styles.text}>{message.text}</p>
      <span className={styles.date}>{timeMessage(message.createdAt)}</span>
     </li>
    </div>
  );
});

export { SelectionMessage };