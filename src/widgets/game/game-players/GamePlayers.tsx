import { useCallback } from 'react';
import { PlayersCard, usePlayer, useProperty } from '@/entities';

import styles from './GamePlayers.module.scss';

const GamePlayers = () => {
  const { players, player } = usePlayer()
  const { propertyes } = useProperty()

  const getTotalSumPlayer = useCallback((id: string, money: number): number => {
    if (!player || !player.money) return 0;
    const playerProperty = propertyes.filter(property => property.owner === id && !property.is_mortgage)
    const totoalSumProperty = playerProperty.reduce((acc, prop) => acc + prop.mortgage_price, 0)
    return money + totoalSumProperty 
  }, [propertyes, player])

  return (
    <ul className={styles.root}>
      {players.map(player => 
      <PlayersCard 
      key={player._id} 
      image={player.image}
      money={player.money}
      name={player.name}
      totalSum={getTotalSumPlayer(player._id, player.money)} 
      />
        )}
    </ul>
  );
};

export { GamePlayers };