import { useSelect, useSelectAction } from "../../../../entities";
import { ButtonRG } from "../../../../shared";
import { useMemo } from "react";
import { useGameConfirmation } from "../../model";

import styles from "./ModalSuccess.module.scss";

const ModalSuccess = () => {
  const { selectionSendMessage } = useSelectAction();
  const { authId } = useSelect();
  const { sessionId, players } = useGameConfirmation();

  const myConfirmation = useMemo(() => {
    const findMyConfirmation = players.find((player) => player.id === authId);

    if (!findMyConfirmation || findMyConfirmation.confirmation) {
      return false;
    } else {
      return true;
    }
  }, [players, authId]);

  const handleSubmit = () => {
    if (!authId || !sessionId || !myConfirmation) return;

    selectionSendMessage<{
      method: string;
      body: {
        authId: string;
        sessionId: string;
      };
    }>({
      method: "confirmParticipationGame",
      body: {
        authId,
        sessionId,
      },
    });
  };

  return (
    <>
      {myConfirmation ? (
        <ButtonRG
          className={styles.submit_btn}
          handleClick={handleSubmit}
          size="md"
          color="success"
        >Готов</ButtonRG>
      ) : (
        <h2 className={styles.success_text}>Готов !</h2>
      )}
    </>
  );
};

export { ModalSuccess };
