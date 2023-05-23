import { useAppDispatch, useAppSelector } from "@/app/hooks/useAppSelector";
import { useRouters } from "@/app/hooks/useRouter";
import { ISessions } from "@/app/types/ISessions";
import {  useViewer } from "@/entities/viewer";
import { useEffect, useMemo } from "react";
import { sessionConstant } from "../../constants/sessionConstant";
import { selectSession, sessionAction } from "../slice/sessionsSlice";
import { connectSelection } from "../slice/sessionThunk";
import { UserHeaderActiveType } from "../types";

const useSessionsUpdated = () => {
  const { viewer } = useViewer()
  const { owner, sessions, playersCount, joinSession, isConnected } =
    useAppSelector(selectSession);
  const { routerPushPage } = useRouters();
  const dispatch = useAppDispatch();
  

  useEffect(() => { 
    if (!viewer) return;

    dispatch(connectSelection({
      fullName: viewer.fullName,
      id: viewer.viewerId,
    }))

    // selectionApi.openConnect()

    // return () => {
      // selectionApi.disconnect()
    // }

    dispatch(
      sessionAction.startConnecting({
        auth: {
          fullName: viewer.fullName,
          id: viewer.viewerId,
          method: "connection",
        },
      })
    );

    // console.log(owner)
    // return () => {
    //   console.log(owner)
    //   dispatch( 
    //     sessionAction.disconect({ 
    //       method: 'disconect',
    //       body: {
    //         fullName: auth.fullName,
    //         id: auth._id,
    //         owner: owner ? owner : '',
    //         joinSession: joinSession ? joinSession : '',
    //       },
    //     })
    //   );
    // };
  }, [dispatch, viewer]);

  const createSession = () => {
    if (!viewer) return;
    dispatch(
      sessionAction.createSession({
        method: "createSession",
        owner: viewer.viewerId,
        fullName: viewer.fullName,
        img: viewer.image.url,
        id: viewer.viewerId,
      })
    );
  };

  const removeSession = () => {
    if (!owner) return;
    dispatch(
      sessionAction.removeSession({
        method: "removeSession",
        id: owner,
      })
    );
  };

  const sessionsMapUpdate = useMemo((): ISessions[] => {
    if (owner || joinSession) {
      return sessions;
    }

    const result: ISessions[] = [];

    sessions.forEach((session: ISessions) => {
      if (session.players.length < 5) {
        result.push({
          ...session,
          players: [...session.players, sessionConstant.addPlayerObj],
        });
      } else {
        result.push(session);
      }
    });
    return result;
  }, [sessions, joinSession, owner]);

  const handleClickAvatar = (
    playerId: string,
    sessionId: string,
    fullName: string
  ) => {
    if (!viewer) return;

    if (playerId === viewer.viewerId && sessionId === joinSession) {
      dispatch(
        sessionAction.outSession({
          method: "outSession",
          body: {
            sessionId,
            playerId,
          },
        })
      );
    }

    if (fullName === "Join") {
      dispatch(
        sessionAction.joinSession({
          method: "joinSession",
          body: {
            sessionId: sessionId,
            id: viewer.viewerId,
            fullName: viewer.fullName,
            img: viewer.image.url,
          },
        })
      );
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

  const userHeaderActive: UserHeaderActiveType = useMemo(() => {
    return {
      joinGame: joinSession,
      noSessions: !owner && !joinSession,
      startGame: playersCount >= 2 && owner,
      removeGame: owner,
    };
  }, [joinSession, owner, playersCount, ]);

  const handleCheckActiveGame = useMemo(
    () =>
      (id: string): boolean => {
        return id === owner || id === joinSession;
      },
    [owner, joinSession]
  );

  return {
    handleCheckActiveGame,
    userHeaderActive,
    handleClickAvatar,
    sessionsMapUpdate,
    removeSession,
    createSession,
    isConnected,
  };
};

export { useSessionsUpdated };
