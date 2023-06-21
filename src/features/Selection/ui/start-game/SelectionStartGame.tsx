import { useSelect } from '@/entities';
import { ButtonRG } from '@/shared';

import styles from './SelectionStartGame.module.scss';


const SelectionStartGame = () => {
  const {  owner, playersCount } = useSelect();

  const activeStart = playersCount >= 2 && owner

  if (!activeStart) {
    return null
  }

  return (
    <div className={styles.start_btn}>
    <ButtonRG color="success" handleClick={() => {}}>
          Начать игру
        </ButtonRG>
    </div>
  );
};

export { SelectionStartGame };