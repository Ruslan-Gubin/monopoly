import { memo } from 'react';
import { TimerDecreasing, UserAvatar } from '@/shared';

import styles from './PlayersCard.module.scss';

interface PlayersCardProps {
  money: number;
  image: string;
  name: string;
  totalSum: number;
}

const PlayersCard = memo(({ money, image, name, totalSum }: PlayersCardProps) => {

  return (
    <li className={styles.root}>
      <picture className={styles.picture}>
        <UserAvatar image={image} size='lg' />
      </picture>
      <div className={styles.info_container}>
        <span className={styles.name}>{name}</span>
        <span className={styles.money}>{money}</span>
        <span className={styles.total}>{totalSum}</span>
      </div>
        <div className={styles.process_container}>
        <TimerDecreasing duration={10} endCallback={() => {}}/>
        </div>
    </li>
  );
});

PlayersCard.displayName = 'PlayersCard';

export { PlayersCard };