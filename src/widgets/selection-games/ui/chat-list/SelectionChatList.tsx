import { useCallback } from 'react';
import { SelectionMessage, useViewer } from '@/entities';
import { useSelectionMessage } from '@/features';
import { NoContent, TimeServices, useRouterNavigation } from '@/shared';

import styles from './SelectionChatList.module.scss';

const SelectionChatList = () => {
  const { messages } = useSelectionMessage()
  const { navigate } = useRouterNavigation()
  const { authId } = useViewer()

  const checkMyMessage = useCallback((id: string) => {
      return id === authId
  },[ authId ])

  const timeMessage = useCallback((time: string) => {
   return TimeServices.getHourMinStr(time)
  },[])
  
  const handleClickAvatar = useCallback((id: string) => {
    navigate('push', `/profile/${id}`)
  }, [])

  if (messages.length === 0) {
    return <NoContent title='На данный момент сообщений нет' hint='Можете добавить сообщение ниже' />;
  }

  return (
    <ul className={styles.root}>
    {messages && messages.map(message => 
    <SelectionMessage
    timeMessage={timeMessage}
    checkMyMessage={checkMyMessage}
    clickAvatar={handleClickAvatar}
    key={message._id}
    message={message}
    />
    )}
  </ul>
  );
};

export  { SelectionChatList };