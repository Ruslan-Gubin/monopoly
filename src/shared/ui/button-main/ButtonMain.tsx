import { FC, memo } from "react";
import styles from "./ButtonMain.module.scss";

interface ButtonMainProps {
  text: string | number;
  onClick?: () => void;
  label?: string;
  type?: "button" | "submit" | "reset";
}

const ButtonMainF: FC<ButtonMainProps> = (props) => {
  const { text, onClick, type = "button" } = props;
  
  return (
    <button
      type={type}
      className={styles.button}
      onClick={() => onClick && onClick()}
    >
      {text}
    </button>
  );
};

export const ButtonMain = memo(ButtonMainF);
