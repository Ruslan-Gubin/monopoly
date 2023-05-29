import { FC } from 'react';
import { PlayerModel } from '@/entities';

import styles from './CardPlayers.module.scss';
import { UserAvatar } from '../user-avatar/UserAvatar';
import { ButtonRG } from '../button-rg/ButtonRG';

interface CardPlayersProps {
players:  PlayerModel[];
clickAvatar: (id: string, sessionId: string, fullName: string) => void;
wathGameRoute?: (id: string) => void;
sessionActive: boolean;
sessionId: string 
}

const CardPlayers: FC<CardPlayersProps> = ({ sessionId, sessionActive, wathGameRoute, players, clickAvatar}) => {


  return (
    <li className={sessionActive ? `${styles.root} ${styles.active}` : styles.root}>
    <ul className={styles.player__list}>
      {players.map(player => 
      <li key={player.id} className={styles.player_item}>
      <UserAvatar
      size='md'
      image={player.img}
      onClick={() => clickAvatar(player.id, sessionId, player.fullName)}
      title={player.fullName}
      />
      <span className={styles.player__name}>{player.fullName}</span>
      </li>
      )}
    </ul>
      {wathGameRoute && 
       <div className={styles.footer_card}>
       <ButtonRG
         handleClick={() => wathGameRoute("235jkl325jlkj")}
         size="sm"
         color="success"
         className={styles.header_btn}
       >
         Смотреть
       </ButtonRG>
     </div>
      }
      </li>
  );
};

export { CardPlayers };