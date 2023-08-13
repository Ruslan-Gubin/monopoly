import { FC, memo } from 'react';
import { AllBoardGames } from '@/entities';
import { TimeServices } from '@/shared';
import { GameListPlayerList } from '../game-list-players/GameListPlayerList';
import styles from './GameListBoard.module.scss';
import { RemoveBoard } from '@/features';


interface GameListBoardProps {
  board: AllBoardGames
  handleWatchGameRouter: (id: string) => void
  handleClickAvatar: (id: string) => void
  active: boolean;
}

const GameListBoard: FC<GameListBoardProps> = memo(({  board, handleWatchGameRouter, handleClickAvatar, active }) => {

  return (
    <li className={styles.game_card}>
        <div className={styles.card_header}>
          <button onClick={() => handleWatchGameRouter(board.board_id)} className={active ? `${styles.card_header__watch} ${styles.watch_active}` : styles.card_header__watch}>{active ? 'Войти в игру' : 'Смотреть'}</button>
          <RemoveBoard boardId={board.board_id} />
          <span className={styles.card_header__create}>Игра создана: {TimeServices.getDayMouthYearStr(board.date_create)}</span>
        </div>
        <GameListPlayerList players={board.player_list} handleClickAvatar={handleClickAvatar} />
    </li>
  );
});

GameListBoard.displayName = 'GameListBoard'

export { GameListBoard };