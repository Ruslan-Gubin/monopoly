import { CreateGameHeader, CreateGameList } from "./components";
import { useSessionsUpdated } from "./libs/hooks/useSessionsUpdated";

import styles from "./styles/CreateGame.module.scss";


const CreateGame = () => {
  const sessionUpdate = useSessionsUpdated();

 
  return (
    <>
      {sessionUpdate.isConnected && (
        <div className={styles.root}>
          <CreateGameHeader
            userHeaderActive={ sessionUpdate.userHeaderActive }
            removeSession={ sessionUpdate.removeSession }
            createSession={ sessionUpdate.createSession }
          />
          <CreateGameList
            checkActiveGame={ sessionUpdate.handleCheckActiveGame }
            handleClickAvatar={ sessionUpdate.handleClickAvatar }
            gameSessions={ sessionUpdate.sessionsMapUpdate }
          />
        </div>
      )}
    </>
  );
};

export { CreateGame };
