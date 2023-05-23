import { useRouters } from '@/app/hooks/useRouter';
import {  useViewer } from '@/entities/viewer';
import * as features from '@/features';


import styles from './SessionGame.module.scss';

const SelectionGame = () => {
  const { autorization } = useViewer()
  const { routerPushPage } = useRouters()



    if (!autorization) {
      routerPushPage('/login') 
    }


  return (
    <section className={styles.root}>
      <section className={styles.header}>
      <features.SelectionHeaderAction />
      <features.SelectionHeaderNotification />
      </section>
      <section className={styles.body}>
        <div className={styles.aside}>
          {/* <features.ChatUserList /> */}
          <p>GameList</p>
        </div>
        <div className={styles.content}>
          <p>Chat</p>
          <p>Chat send Message</p>
          {/* <features.ChatContent />
          <features.ChatSendMessage /> */}
        </div>
      </section>
    </section>
  );
};

export  { SelectionGame };