import { useBoard } from "@/entities";
import {
  CreateSelection,
  ExpectationGame,
  RemoveSelection,
  SelectionStartGame,
} from "@/features";
import { GoGame } from "@/features";

import styles from "./SelectionHeaderAction.module.scss";


const SelectionHeaderAction = () => {
  const { gameBoardId, isGoGame } = useBoard()

  const checkActiveGame = !isGoGame && !gameBoardId;

  return (
    <div className={styles.root}>
      {checkActiveGame ? 
      <>
      <ExpectationGame />
      <CreateSelection />
      <SelectionStartGame />
      <RemoveSelection />
      </>
      :  
      <GoGame />
      }
    </div>
  );
};

SelectionHeaderAction.displayName = "SelectionHeaderAction";

export { SelectionHeaderAction };
