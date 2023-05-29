import { useEffect } from "react";
import {  useSelect, useSelectAction, useViewer } from "@/entities";
import { SelectionHeaderAction, SelectionGameList, SelectionHeaderNotification, SelectionChatList, SelectionSendMessage } from "@/features";
import {  useRouterNext } from "@/shared";

import styles from './SelectionGame.module.scss';


const SelectionGame = () => {
  const { autorization, viewer } = useViewer()
  const { routerPushPage } = useRouterNext()
  const { connectSelection } = useSelectAction()


    if (!autorization) {
      routerPushPage('/login') 
    }



    useEffect(() => {
      if (!viewer) return;
    connectSelection({ 
      method: 'connect',
      body: {
        fullName: viewer.fullName,
        id: viewer.viewerId,
      }
    })

    return () => {
      connectSelection({  
        method: 'disconect',
          body: {
            fullName: viewer.fullName,
            id: viewer.viewerId,
          },
      })
    }
    }, [])


  return (
    <section className={styles.root}>
      <section className={styles.header}>
      <SelectionHeaderAction />
      <SelectionHeaderNotification />
      </section>
      <section className={styles.body}>
        <div className={styles.aside}>
          {/* <features.ChatUserList /> */}
          <SelectionGameList />
        </div>
        <div className={styles.content}>
          <SelectionChatList/>
          <SelectionSendMessage />
          {/* <features.ChatContent />
          <features.ChatSendMessage /> */}
        </div>
      </section>
    </section>
  );
};

export { SelectionGame };