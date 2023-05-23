import { FC, memo } from 'react';
import { SessionGameCard } from '@/entities';
import { ISessions } from '@/app/types/ISessions';

import styles from './CreateGameList.module.scss';


interface CreateGameListProps {
  gameSessions: ISessions[]
  handleClickAvatar: (id: string, sessionId: string, fullName: string) => void 
  checkActiveGame: (value: string) => boolean
}

const CreateGameList: FC<CreateGameListProps> = memo(({ handleClickAvatar, checkActiveGame, gameSessions }) => {
  

  return (
    <ul className={styles.root}>
      <ul>
        {gameSessions.map((session) => 
          <SessionGameCard 
          key={session._id}
          sessionActive={checkActiveGame(session._id)}
          players={session.players} 
          clickAvatar={handleClickAvatar}
          sessionId={session._id}
          />
        )}
      </ul>
    </ul>
  );
});

CreateGameList.displayName = 'CreateGameList'

export  {CreateGameList};