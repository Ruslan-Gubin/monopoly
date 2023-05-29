import { useSelect } from "@/entities";
import styles from "./ExpectationGame.module.scss";

const ExpectationGame = () => {
  const { joinSession } = useSelect();

  if (!joinSession) {
    return null
  }

  return (
     <p className={styles.expectation_text}>Игра скоро начнется...</p>
  );
};

export { ExpectationGame };