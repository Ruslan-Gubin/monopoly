import { useRouterNavigation } from '@/shared';

import styles from './GamesList.module.scss';


const GamesList = () => {
  const { navigate } = useRouterNavigation();

  const handleClickAvatar = (id: string) => {
    navigate('push', `/profile/${id}`)
  }

  const handleWatchGameRouter = (id: string) => {
    navigate('push', `/game/${id}`)
  }


  return (
    <div className={styles.root} data-testid='games-list-testid'>
      <div className={styles.title_container}> 
      <h1 className={styles.title}>
        Игры онлайн 
      </h1>
      <span className={styles.count}>{342}</span>
      </div>
      {/* <CardPlayers
      sessionId='0'
      sessionActive={false}
       wathGameRoute={handleWatchGameRouter} 
       players={mockPrayers} 
       clickAvatar={handleClickAvatar}
       /> */}
    </div>
  );
};

export  { GamesList };