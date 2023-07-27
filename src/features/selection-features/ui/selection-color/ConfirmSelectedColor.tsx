import { useGameConfirmation, useGameConfirmationAction } from '../../model';

import styles from './ConfirmSelectedColor.module.scss';

const ConfirmSelectedColor = ({ checkIsActive }: {checkIsActive: boolean}) => {
  const { playerColor, selectedColor } = useGameConfirmation()
  const { setSelectedColor } = useGameConfirmationAction()

  if (checkIsActive) {
    return null;
  }

  const handleClickColor = (color: string) => {
    setSelectedColor(color)
  }

  return (
    <ul className={styles.color_list}>
      {playerColor.map(color =>
      <li onClick={() => handleClickColor(color)} key={color} className={`${styles.color} ${styles[color]}`}>
        {selectedColor === color &&
        <div className={styles.color_active}></div>
      }
      </li>
      )}
    </ul>
  );
};

export  { ConfirmSelectedColor };