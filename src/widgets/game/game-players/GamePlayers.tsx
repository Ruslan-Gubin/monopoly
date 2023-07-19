import { PlayersCard } from '@/entities';
import styles from './GamePlayers.module.scss';

const mockImg = 'https://res.cloudinary.com/ds289tkqj/image/upload/v1688415759/Player/n4cyp6mxp5mg6cutf7vg.webp'

const GamePlayers = () => {

  return (
    <ul className={styles.root}>
      <PlayersCard img={mockImg} money={1500} />
      <PlayersCard img={mockImg} money={1500} />
      <PlayersCard img={mockImg} money={1500} />
      <PlayersCard img={mockImg} money={1500} />
      <PlayersCard img={mockImg} money={1500} />
      <PlayersCard img={mockImg} money={1500} />
    </ul>
  );
};

export { GamePlayers };