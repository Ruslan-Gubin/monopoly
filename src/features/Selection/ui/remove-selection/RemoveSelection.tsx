import { useSelect, useSelectAction } from "@/entities";
import { ButtonRG } from "@/shared";
import styles from "./RemoveSelection.module.scss";

const RemoveSelection = () => {
  const { owner } = useSelect();
  const { selectionSendMessage } = useSelectAction();

  if (!owner) {
    return null;
  }

  const handleRemoveSelection = () => {
    selectionSendMessage<{ method: string; id: string }>({
      method: "removeSession",
      id: owner,
    });
  };

  return (
    <div className={styles.remove_btn}>
    <ButtonRG color="danger" handleClick={handleRemoveSelection}>
      Удалить игру
    </ButtonRG>
    </div>
  );
};

export { RemoveSelection };
