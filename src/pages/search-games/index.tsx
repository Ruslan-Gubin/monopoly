import { useEffect } from "react";
import {  useSelectAction, useViewer } from "@/entities";
import { useRouterNavigation } from "@/shared";
import {
  Layout,
  SelectionChatList,
  SelectionGameConfirmation,
  SelectionGames,
  SelectionHeaderAction,
  SelectionHeaderNotification,
  SelectionSendMessage,
} from "@/widgets";

import styles from "../../app/styles/pages/SearchGame.module.scss";

const SearchGame = () => {
  const { autorization, viewer } = useViewer();
  const {  navigate } = useRouterNavigation();
  const { connectSelection } = useSelectAction();

  if (!autorization) {
    navigate('push', '/login')
  }

  useEffect(() => {
    if (!viewer) return;
      connectSelection({
        method: "connect",
        body: {
          fullName: viewer.fullName,
          id: viewer.viewerId,
        },
      });
     
    return () => {
      connectSelection({
        method: "disconect",
        body: {
          fullName: viewer.fullName,
          id: viewer.viewerId,
        },
      });
    };
  }, [viewer]);

  
  return (
    <Layout title="Поиск игры" keywords="Search Game">
      <SelectionGameConfirmation />
      <section className={styles.root}>
          <div className={styles.aside}>
          <SelectionHeaderAction />
            <SelectionGames />
          </div>
        <div className={styles.body}>
          <SelectionHeaderNotification />
          <div className={styles.content}>
            <SelectionChatList />
            <SelectionSendMessage />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default SearchGame;
