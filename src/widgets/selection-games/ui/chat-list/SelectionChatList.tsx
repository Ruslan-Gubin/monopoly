
import { SelectionMessage } from '@/entities';
import { useSelectionMessage } from '@/features';
import styles from './SelectionChatList.module.scss';

const SelectionChatList = () => {
  const { messages } = useSelectionMessage()
  
  if (messages.length === 0) {
    return null;
  }
  console.log(messages)

  return (
    <ul className={styles.root}>
    {messages && messages.map(message => 
    <SelectionMessage
    key={message._id}
    message={message}
    />
    )}
  </ul>
  );
};

export  { SelectionChatList };