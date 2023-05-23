import { FC, memo } from 'react';
import { ButtonRG } from '@/shared';
import { ISessionPlayer } from '@/app/types/ISessions';
import { ViewerAvatar } from '@/entities/viewer';

import styles from './SessionGameCard.module.scss';

interface WaitingGameCardProps {
players:  ISessionPlayer[];
clickAvatar: (id: string, sessionId: string, fullName: string) => void;
wathGameRoute?: (id: string) => void;
sessionActive: boolean;
sessionId: string 
}

const SessionGameCard: FC<WaitingGameCardProps> = memo(({ sessionId, sessionActive, wathGameRoute, players, clickAvatar}) => {


  return (
    <li className={sessionActive ? `${styles.root} ${styles.active}` : styles.root}>
    <ul className={styles.player__list}>
      {players.map(player => 
      <li key={player.id} className={styles.player_item}>
      <ViewerAvatar
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
});

SessionGameCard.displayName = 'SessionGameCard'

export  { SessionGameCard };