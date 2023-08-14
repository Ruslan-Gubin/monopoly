import { useState } from 'react';
import { OutPlayer } from '@/features';

import styles from './OutGame.module.scss';

const OutGame = () => {
  const [modal, setModal] = useState(false)


  const handleToggleModal = () => {
   setModal(prev => !prev)
  }

  return (
    <>
    <OutPlayer toggleModal={handleToggleModal} modal={modal} />
    <div onClick={handleToggleModal} className={styles.root}>
     <div className={styles.center}></div>
    </div>
    </>
  );
};

export { OutGame };