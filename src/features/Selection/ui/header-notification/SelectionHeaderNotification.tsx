import { useSelectionNotification } from "../../model/notification";
import styles from "./SelectionHeaderNotification.module.scss";

const SelectionHeaderNotification = () => {
  const { notification } = useSelectionNotification();


  return (
    <div className={styles.root}>
      <p className={styles.notification}>{notification}</p>
    </div>
  );
};

export { SelectionHeaderNotification };
