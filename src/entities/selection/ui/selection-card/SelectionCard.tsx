import { FC, memo } from "react";

import styles from "./SelectionCard.module.scss";

interface SelectionCardProps {
  cardActive: boolean;
  children: React.ReactNode;
}

const SelectionCard: FC<SelectionCardProps> = memo((props) => {
  return (
    <li
      className={
        props.cardActive ? `${styles.root} ${styles.active}` : styles.root
      }
    >
      <ul className={styles.player__list}>{props.children}</ul>
    </li>
  );
});

SelectionCard.displayName = "SelectionCard";

export { SelectionCard };
