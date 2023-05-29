import { selectionConstant, SelectionModel, useSelect, useSelectAction, useViewer } from '@/entities';
import { CardPlayers, useRouterNext } from '@/shared';
import { useMemo } from 'react';

import styles from './SelectionGameList.module.scss';

const SelectionGameList = () => {
  const { selectioGames, joinSession, owner } = useSelect()
  const { viewer } = useViewer()
  const { selectionSendMessage } = useSelectAction()
  const { routerPushPage } = useRouterNext()

  const handleClickAvatar = (
    playerId: string,
    sessionId: string,
    fullName: string
  ) => {
    if (!viewer) return;

    if (playerId === viewer.viewerId && sessionId === joinSession) {
      selectionSendMessage({ method: "outSession", body: { sessionId, playerId, } });
    }

    if (fullName === "Join") {
      selectionSendMessage({ 
        method: "joinSession",
          body: {
            sessionId: sessionId,
            id: viewer.viewerId,
            fullName: viewer.fullName,
            img: viewer.image.url,
          },
        });
    }

    if (
      playerId !== viewer.viewerId &&
      !owner &&
      !joinSession &&
      fullName !== "Join"
    ) {
      routerPushPage(`/profile/${playerId}`);
    }
  };

  const sessionsMapUpdate = useMemo((): SelectionModel[] => {
    if (owner || joinSession) {
      return selectioGames;
    }

    const result: SelectionModel[] = [];

    selectioGames.forEach((session: SelectionModel) => {
      if (session.players.length < 5) {
        result.push({
          ...session,
          players: [...session.players, selectionConstant.addPlayerObj],
        });
      } else {
        result.push(session);
      }
    });
    return result;
  }, [selectioGames, joinSession, owner]);



  const handleCheckActiveGame = useMemo(
    () =>
      (id: string): boolean => {
        return id === owner || id === joinSession;
      },
    [owner, joinSession]
  );

  return (
    <ul className={styles.root}>
      <ul>
        {sessionsMapUpdate.map((session) => 
          <CardPlayers 
          key={session._id}
          sessionActive={handleCheckActiveGame(session._id)}
          players={session.players} 
          clickAvatar={handleClickAvatar}
          sessionId={session._id}
          />
        )}
      </ul>
    </ul>
  );
};

SelectionGameList.displayName = 'SelectionGameList'

export  { SelectionGameList };