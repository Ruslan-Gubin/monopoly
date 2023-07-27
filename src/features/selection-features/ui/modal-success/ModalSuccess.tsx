import { useSelect, useSelectAction } from "@/entities";
import { ButtonRG } from "@/shared";
import { useGameConfirmation } from "../../model";

import styles from "./ModalSuccess.module.scss";

 
const ModalSuccess = ({ checkIsActive }: { checkIsActive: boolean }) => {
  const { selectionSendMessage } = useSelectAction();
  const { authId } = useSelect();
  const { sessionId, selectedColor } = useGameConfirmation();

  const handleSubmit = () => {
    if (!authId || !sessionId || !selectedColor) return;
  
    selectionSendMessage<{
      method: string;
      body: {
        authId: string;
        sessionId: string;
        color: string,
      };
    }>({
      method: "confirmParticipationGame",
      body: {
        authId,
        sessionId,
        color: selectedColor,
      },
    });
  };

  return (
    <>
      {!checkIsActive ? (
        <ButtonRG
          disabled={!selectedColor}
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
