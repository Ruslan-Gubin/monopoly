import { SelectionGameList } from '@/features';

import styles from './SelectionGames.module.scss';

const SelectionGames = () => {
 
  return (
    <div className={styles.root}>
    <SelectionGameList />
    </div>
  );
};

SelectionGames.displayName = 'SelectionGames'

export  { SelectionGames };