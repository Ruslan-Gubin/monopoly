import { useSelect, useSelectAction } from '@/entities';
import { ButtonRG } from '@/shared';
import { useGameConfirmation } from '../../model';

import styles from './ModalSuccess.module.scss';

const ModalSuccess = () => {
  const { selectionSendMessage } = useSelectAction()
  const { authId } = useSelect()
  const { sessionId } = useGameConfirmation()

  const handleSubmit = () => {
    if (!authId || !sessionId) return;

    selectionSendMessage<{
      method: string,
      body: {
        authId: string;
        sessionId: string;
      }
    }>({
      method: 'confirmParticipationGame',
      body: {
       authId,
       sessionId
      }
    })
  }

  return (
    <ButtonRG className={styles.submit_btn} handleClick={handleSubmit} children={'Готов'} size='md' color="success"/>
  );
};

export { ModalSuccess };