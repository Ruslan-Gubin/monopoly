import { TimerDecreasing, UserAvatar } from '@/shared';

import styles from './PlayersCard.module.scss';

interface PlayersCardProps {
  money: number;
  image: string;
  name: string;
}

const PlayersCard = ({ money, image, name }: PlayersCardProps) => {

  return (
    <div className={styles.root}>
      <picture className={styles.picture}>
        <UserAvatar image={image} size='lg' />
      </picture>
      <div className={styles.info_container}>
        <span className={styles.name}>{name}</span>
        <div className={styles.price_container}>
        <span className={styles.money}>{money}</span>
        <span className={styles.total}>3000</span>
        </div>
        <div className={styles.process_container}>
        <TimerDecreasing duration={10} endCallback={() => {}}/>
          
        </div>
      </div>
    </div>
  );
};

export { PlayersCard };