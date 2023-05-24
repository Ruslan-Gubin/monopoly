import {memo} from 'react';

import styles from './CheckBoxMain.module.scss';

interface CheckBoxMainProps {
  active: boolean
  onClick: () => void
}

const CheckBoxMainF = ({active, onClick}: CheckBoxMainProps) => {
  
  return (
    <div className={styles.root}>
    <div onClick={onClick} className={active ? `${styles.checkbox} ${styles.active}`  : styles.checkbox}>
    </div>
    </div>
  );
};

export const CheckBoxMain = memo(CheckBoxMainF);