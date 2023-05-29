import { useSelect, useSelectAction, useViewer } from "@/entities";
import { ButtonRG } from "@/shared";
import styles from "./CreateSelection.module.scss";

const CreateSelection = () => {
  const { selectionSendMessage } = useSelectAction();
  const { joinSession, owner } = useSelect();
  const { viewer } = useViewer();

  const checkActive = !owner && !joinSession;

  if (!checkActive) {
    return null;
  }

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

  return (
    <ButtonRG color="success" handleClick={handleCreateSelection}>
      Создать игру
    </ButtonRG>
  );
};

export { CreateSelection };
