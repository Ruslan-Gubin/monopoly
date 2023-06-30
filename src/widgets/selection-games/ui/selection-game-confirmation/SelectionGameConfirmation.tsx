import { ModalSuccess, useGameConfirmation } from "@/features";
import { ModalRG, TimerDecreasing, UserAvatar } from "@/shared";

import styles from './SelectionGameConfirmation.module.scss';

const SelectionGameConfirmation = () => {
  const { isModalActive, players } = useGameConfirmation()

  if (!isModalActive) {
    return null;
  }

  return (
     <ModalRG
      title='Вы готовы ?' 
      active={isModalActive}
      handleClose={() => console.log('close')}
      width={400}
      >
        <TimerDecreasing  duration={20} endCallback={() => console.log('end')} />

        <ul className={styles.player_list}>
          {players.map(player => 
            <li key={player.id} className={styles.player_img}>
              <div className={styles.img_container}>
              {player.confirmation && <div className={styles.player_active}></div>}
              <UserAvatar image={player.img} />
              </div>
            </li>
            )}
        </ul>
        <ModalSuccess />
      </ModalRG>
  );
};

export { SelectionGameConfirmation };