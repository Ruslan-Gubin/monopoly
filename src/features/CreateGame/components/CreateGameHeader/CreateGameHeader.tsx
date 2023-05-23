import { FC, memo } from 'react';
import { ButtonRG } from '@/shared';
import { UserHeaderActiveType } from '../../libs/types/UserHeaderActiveType';

import styles from './CreateGameHeader.module.scss';

interface CreateGameHeaderProps {
  createSession: () => void
  removeSession: () => void
  userHeaderActive: UserHeaderActiveType
} 

const CreateGameHeader: FC<CreateGameHeaderProps> = memo(({ removeSession,  createSession, userHeaderActive }) => {


  return (
    <div className={styles.root}>
      <h1 className={styles.title}>Ожидают игры</h1>
      {userHeaderActive.joinGame && 
      <p className={styles.expectation_text}>Игра скоро начнется...</p>
      }
      {userHeaderActive.noSessions  && 
        <ButtonRG
        color='success'
        handleClick={createSession}
        >
        Создать игру
        </ButtonRG>
      }
     {userHeaderActive.startGame &&
     <ButtonRG
     color='success'
     handleClick={() => {}}
      >
      Начать игру
      </ButtonRG>
    }
     {userHeaderActive.removeGame && 
     <ButtonRG
     color='danger'
     handleClick={removeSession}
     >
      Удалить игру
      </ButtonRG>
      }
    </div>
  );
});

CreateGameHeader.displayName = 'CreateGameHeader'

export  { CreateGameHeader };