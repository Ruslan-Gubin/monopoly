import { useBoard, useBoardAction, usePlayer } from '@/entities';
import { ButtonRG, UserAvatar, useRouterNavigation } from '@/shared';

import styles from './GameOver.module.scss';

const GameOver = () => {
  const { boardSockedSend } = useBoardAction()
  const { board } = useBoard()
  const { players, player } = usePlayer()
  const { navigate } = useRouterNavigation()


  const handleRemoveGame = () => {
    
    if (player?._id === board?.players[0]) {
      if (!board || !player) return;
      boardSockedSend({
      method: 'removeGame',
      body: {
        ws_id: board.ws_id,
        board_id: board._id,
        auction_id: board.auction_id,
        dice_id: board.dice,
        player_id: player._id,
      }
    })
  }
  navigate('push', '/search-games')
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
        {player?._id === players[0]._id ? 'Завершить игру' : 'Вернутся в подбор игр'}
      </ButtonRG>
    </div>
  );
};

export { GameOver };