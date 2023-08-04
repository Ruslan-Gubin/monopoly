import { PlayersCard, usePlayer } from '@/entities';
import styles from './GamePlayers.module.scss';

const GamePlayers = () => {
  const { players } = usePlayer()

  return (
    <ul className={styles.root}>
      {players.map(player => 
      <PlayersCard 
      key={player._id} 
      image={player.image}
      money={player.money}
      name={player.name} 
      />
        )}
    </ul>
  );
};

export { GamePlayers };