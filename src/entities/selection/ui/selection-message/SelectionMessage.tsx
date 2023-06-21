import { useViewer } from "@/entities/viewer";
import { MessageModel } from "@/features";
import { formattedRuTime } from "@/shared";
import { useMemo } from "react";

import styles from './SelectionMessage.module.scss';

const SelectionMessage = ({ message }: { message: MessageModel }) => {
  const { authId } = useViewer()

  const checkMyMessage = useMemo(() => {
    return message.authorId === authId
  },[message])


  return (
    <div className={styles.root} data-id='selection-message-test'>
    <li className={checkMyMessage ? `${styles.message} ${styles.mymessage}` : styles.message}>
      <p>{message.text}</p>
      {/* <span className={styles.date}>{formattedRuTime.format(Number(message.createdAt * 1000))}</span> */}
     </li>
    </div>
  );
};

export { SelectionMessage };