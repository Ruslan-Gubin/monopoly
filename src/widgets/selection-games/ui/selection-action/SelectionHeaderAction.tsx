import {
  CreateSelection,
  ExpectationGame,
  RemoveSelection,
  SelectionStartGame,
} from "@/features";

import styles from "./SelectionHeaderAction.module.scss";


const SelectionHeaderAction = () => {
  return (
    <div className={styles.root}>
      <ExpectationGame />
      <CreateSelection />
      <SelectionStartGame />
      <RemoveSelection />
    </div>
  );
};

SelectionHeaderAction.displayName = "SelectionHeaderAction";

export { SelectionHeaderAction };
