import { SessionGameCard } from '@/entities';
import { useRouters } from '@/app/hooks/useRouter';

import styles from './WatchSession.module.scss';


const WatchSession = () => {
  const { routerPushPage } = useRouters();

  const handleClickAvatar = (id: string) => {
    routerPushPage(`/profile/${id}`)
  }

  const handleWatchGameRouter = (id: string) => {
    routerPushPage(`/game/${id}`)
  }


  return (
    <div className={styles.root}>
      <div className={styles.title_container}> 
      
      <h1 className={styles.title}>
        Игры онлайн 
      </h1>
      <span className={styles.count}>{342}</span>
      </div>
      {/* <SessionGameCard
      sessionId='0'
      sessionActive={false}
       wathGameRoute={handleWatchGameRouter} 
       players={mockPrayers} 
       clickAvatar={handleClickAvatar}
       /> */}
    </div>
  );
};

export  { WatchSession };