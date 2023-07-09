import { useSelect, useSelectAction, useViewer } from "../../../../entities";
import { ButtonRG } from "../../../../shared";

import styles from "./RemoveSelection.module.scss";

const RemoveSelection = () => {
  const { owner } = useSelect();
  const { viewer } = useViewer()
  const { selectionSendMessage } = useSelectAction();

  if (!owner) {
    return null;
  }

  const handleRemoveSelection = () => {
    if (!viewer) return;

    selectionSendMessage<{ method: string; id: string; fullName: string }>({
      method: "removeSession",
      id: owner,
      fullName: viewer.fullName
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
