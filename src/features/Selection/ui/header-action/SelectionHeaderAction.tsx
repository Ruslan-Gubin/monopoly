import { FC, useMemo } from "react";
import { ButtonRG } from "@/shared";
import { UserHeaderActiveType } from "../../model/notification";
import { useSelect, useSelectAction, useViewer } from "@/entities";

import styles from "./SelectionHeaderAction.module.scss";

const SelectionHeaderAction: FC = () => {
  const { joinSession, owner, playersCount } = useSelect();
  const { viewer } = useViewer();
  const { selectionSendMessage } = useSelectAction();

  const handleCreateSelection = () => {
    if (!viewer) return;
    selectionSendMessage<{
      method: string;
      owner: string;
      fullName: string;
      img: string;
      id: string;
    }>({
      method: "createSession",
      owner: viewer.viewerId,
      fullName: viewer.fullName,
      img: viewer.image.url,
      id: viewer.viewerId,
    });
  };

  const handleRemoveSelection = () => {
    if (!owner) return;
    selectionSendMessage<{ method: string; id: string }>({
      method: "removeSession",
      id: owner,
    });
  };

  const userHeaderActive: UserHeaderActiveType = useMemo(() => {
    return {
      joinGame: joinSession,
      noSessions: !owner && !joinSession,
      startGame: playersCount >= 2 && owner,
      removeGame: owner,
    };
  }, [joinSession, owner, playersCount]);

  return (
    <div className={styles.root}>
      <h1 className={styles.title}>Ожидают игры</h1>
      {userHeaderActive.joinGame && (
        <p className={styles.expectation_text}>Игра скоро начнется...</p>
      )}
      {userHeaderActive.noSessions && (
        <ButtonRG color="success" handleClick={handleCreateSelection}>
          Создать игру
        </ButtonRG>
      )}
      {userHeaderActive.startGame && (
        <ButtonRG color="success" handleClick={() => {}}>
          Начать игру
        </ButtonRG>
      )}
      {userHeaderActive.removeGame && (
        <ButtonRG color="danger" handleClick={handleRemoveSelection}>
          Удалить игру
        </ButtonRG>
      )}
    </div>
  );
};

SelectionHeaderAction.displayName = "SelectionHeaderAction";

export { SelectionHeaderAction };
