import { useSelect, useSelectAction, useViewer } from "@/entities";
import { UserAvatar, useRouterNext } from "@/shared";
import {  useCallback } from "react";

interface SelectionAvatarProps {
  sessionId: string;
  prayerId: string;
  fullName: string;
  img: string;
}

const SelectionAvatar = ({
  sessionId,
  prayerId,
  fullName,
  img,
}: SelectionAvatarProps) => {
  const { joinSession, owner } = useSelect();
  const { viewer } = useViewer();
  const { selectionSendMessage } = useSelectAction();
  const { routerPushPage } = useRouterNext();

  const handleClickAvatar = useCallback((
    playerId: string,
    sessionId: string,
    fullName: string
  ) => {
    if (!viewer) return;

    if (playerId === viewer.viewerId && sessionId === joinSession) {
      selectionSendMessage({
        method: "outSession",
        body: { sessionId, playerId },
      });
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
  },[]);

  return (
    <UserAvatar
      size="md"
      image={img}
      onClick={() => handleClickAvatar(prayerId, sessionId, fullName)}
      title={fullName}
    />
  );
};

export { SelectionAvatar };