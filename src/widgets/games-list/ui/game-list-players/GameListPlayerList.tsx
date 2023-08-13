import { FC, memo } from 'react';
import { AllBoardPlayersList } from '@/entities';
import { UserAvatar } from '@/shared';

import styles from './GameListPlayerList.module.scss';

interface GameListPlayerListProps {
  players: AllBoardPlayersList[];
  handleClickAvatar: (id: string) => void
}

const GameListPlayerList: FC<GameListPlayerListProps> = memo(({ players, handleClickAvatar }) => {
  
  return (
    <ul className={styles.players_list}>
      {players.map(player => 
        <li key={player.color} className={styles.player}>
        <UserAvatar onClick={() => handleClickAvatar(player.user_id)} image={player.image } size='md' />
        <span  className={`${styles.player_name}  ${styles[`color_${player.color}`]}`}>{player.name}</span>
        </li>
      )}
      </ul>
  );
});

GameListPlayerList.displayName = 'GameListPlayerList'

export { GameListPlayerList };