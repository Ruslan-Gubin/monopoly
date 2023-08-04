import { FC } from "react";
import { BoardModel } from "@/entities";
import { ButtonRG } from "@/shared";

interface Props {
  board: BoardModel
}

const UpdateProperty: FC<Props> = ({ board }) => {

  if (board && !board.start_move) {
    return null;
  }

  const handleUpdateProperty = () => {
    console.log('Улучшение')
  }

  return (
    <ButtonRG
      handleClick={handleUpdateProperty} 
      color="success" 
      type="button" 
      >
      Улучшение
      </ButtonRG>
  );
};

export { UpdateProperty };