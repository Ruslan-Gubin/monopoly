import { useSelect, useSelectAction } from '@/entities';
import { ButtonRG } from '@/shared';

import styles from './SelectionStartGame.module.scss';


const SelectionStartGame = () => {
  const { owner, playersCount } = useSelect();
  const { selectionSendMessage } = useSelectAction()
  

  const activeStart = playersCount >= 2 && owner

  if (!activeStart) {
    return null
  }

  const handleStartGame = () => {

    selectionSendMessage<{
      method: string;
      body: {
        sessionId: string;
      }
    }>({
      method: "sessionStartConfirmation",
      body: {
        sessionId: owner,
      }
    });

  }

  return (
    <div className={styles.start_btn}>
    <ButtonRG color="success" handleClick={handleStartGame}>
          Начать игру
    </ButtonRG>
    </div>
  );
};

export { SelectionStartGame };