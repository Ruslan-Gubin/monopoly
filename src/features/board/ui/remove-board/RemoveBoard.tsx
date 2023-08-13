import { FC } from "react";
import { useBoardAction, useViewer } from "@/entities";
import { ButtonRG } from "@/shared";

interface RemoveBoardProps {
  boardId: string 
}

const RemoveBoard: FC<RemoveBoardProps> = ({ boardId }) => {
  const { authId, viewer } = useViewer()
  const { removeBoard } = useBoardAction()

  if (!viewer || !authId || viewer.email !== 'gubin_ruslan@rambler.ru') return null;

  const handleRemoveBoardGame = () => {
    removeBoard(boardId)
  }

  return (
    <ButtonRG 
    handleClick={handleRemoveBoardGame} 
    color='danger' 
    size='sm' 
    >
    Удалить
    </ButtonRG>
  );
};

export { RemoveBoard };