import { BoardModel, useBoardAction, usePlayer } from '@/entities';
import { ButtonRG, UserAvatar, useRouterNavigation } from '@/shared';

import styles from './GameOver.module.scss';

interface GameOverProps {
  board: BoardModel | null
}

const GameOver = ({ board }: GameOverProps) => {
  const { boardSockedSend } = useBoardAction()
  const { players, player } = usePlayer()
  const { navigate } = useRouterNavigation()

  const checkLastPlayer = player?._id === board?.players[0]

  const handleRemoveGame = () => {
    
    if (checkLastPlayer) {
      if (!board || !player) return;
      boardSockedSend({
      method: 'removeGame',
      body: {
        board_id: board._id,
      }
    })
  }
  navigate('push', '/')
  }

  const winnerPlayer = players.find(player => player._id === board?.players[0])

  return (
    <div className={styles.root}>
      {winnerPlayer && 
    <div className={styles.player}>
      
    <UserAvatar image={winnerPlayer.image} title='победитель' size='lg' />
    <h1 className={styles.winner}>Победитель {winnerPlayer.name} </h1>
    </div>
      }
      <ButtonRG
      handleClick={handleRemoveGame} 
      color="success" 
      type='button'
      >
        {checkLastPlayer ? 'Завершить игру' : 'Вернутся в подбор игр'}
      </ButtonRG>
    </div>
  );
};

export { GameOver };