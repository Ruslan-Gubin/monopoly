import { useEffect } from "react";
import { useSelectAction, useViewer } from "@/entities";
import { useRouterNext } from "@/shared";
import {
  Layout,
  SelectionChatList,
  SelectionGames,
  SelectionHeaderAction,
  SelectionHeaderNotification,
  SelectionSendMessage,
} from "@/widgets";

import styles from "../../app/styles/pages/SearchGame.module.scss";

const SearchGame = () => {
  const { autorization, viewer } = useViewer();
  const { routerPushPage } = useRouterNext();
  const { connectSelection } = useSelectAction();

  if (!autorization) {
    routerPushPage("/login");
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
  }, []);

  return (
    <Layout title="Home" keywords="Home page">
      <section className={styles.root}>
        <section className={styles.header}>
          <SelectionHeaderAction />
          <SelectionHeaderNotification />
        </section>
        <section className={styles.body}>
          <div className={styles.aside}>
            {/* <features.ChatUserList /> */}
            <SelectionGames />
          </div>
          <div className={styles.content}>
            <SelectionChatList />
            <SelectionSendMessage />
            {/* <features.ChatContent />
          <features.ChatSendMessage /> */}
          </div>
        </section>
      </section>
    </Layout>
  );
};

export default SearchGame;
