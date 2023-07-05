import { useViewer } from "@/entities";
import { ModalSuccess, useGameConfirmation, useGameConfirmationAction } from "@/features";
import { useCancelConfirmation } from "@/features/selection/libs/hooks";
import { ModalRG, TimerDecreasing, UserAvatar, useRouterNavigation } from "@/shared";

import styles from './SelectionGameConfirmation.module.scss';

const SelectionGameConfirmation = () => {
  const { isModalActive, players, sessionId } = useGameConfirmation()
  const { cancelParticipationGame } = useCancelConfirmation()
  const { navigate } = useRouterNavigation()
  const { cancelConfinmPlayer } = useGameConfirmationAction()
  const { viewer } = useViewer()

  if (!isModalActive) {
    return null;
  }

  const handleCancelTimeParticipation = async() => {
    if (!sessionId) return;

    const checkConfirmations = players.find(player => !player.confirmation)

    if (checkConfirmations) {
      cancelParticipationGame({name: checkConfirmations.fullName})
    } else {
      navigate('push', '/game/33')
      cancelConfinmPlayer({ sessionId })
      
    }
  }

  return (
     <ModalRG 
      active={isModalActive}
      handleClose={() => cancelParticipationGame({name: viewer?.fullName})}
      >
        <TimerDecreasing  duration={20} endCallback={handleCancelTimeParticipation} />
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