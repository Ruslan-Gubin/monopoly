import { useCallback, useEffect, useMemo } from "react";
import { AllBoardPlayersList, useBoard, useBoardAction, useViewer } from "@/entities";
import { Loader, useRouterNavigation } from "@/shared";
import { GameListBoard } from "../game-list-board/GameListBoard";

import styles from "./GamesList.module.scss";

const GamesList = () => {
  const { navigate } = useRouterNavigation();
  const { getAllBoards, resetAllBoardGame } = useBoardAction();
  const { allBoardsGames, loading, error } = useBoard();
  const { authId } = useViewer()

  useEffect(() => {
    getAllBoards();

    return () => {
      resetAllBoardGame();
    };
  }, []);

  const handleClickAvatar = useCallback((id: string) => {
    navigate("push", `/profile/${id}`);
  }, []);

  const handleWatchGameRouter = useCallback((id: string) => {
    navigate("push", `/game-board/${id}`);
  }, []);

  const checkActiveGame = useMemo(() => (players: AllBoardPlayersList[]) => {
    if (!authId) return false;
    let active = false;

    for (const player of players) {
      if (player.user_id === authId) {
        active = true
      }
    }
    return active
  }, [authId])
 
  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={styles.root} data-testid="games-list-testid">
      <div className={styles.title_container}>
        <h1 className={styles.title}>Игры онлайн</h1>
        <span className={styles.count}>{allBoardsGames.length}</span>
      </div>
      <ul>
        {allBoardsGames &&
          allBoardsGames.map((board) => (
            <GameListBoard
              key={board.board_id}
              active={checkActiveGame(board.player_list)}
              board={board}
              handleClickAvatar={handleClickAvatar}
              handleWatchGameRouter={handleWatchGameRouter}
            />
          ))}
      </ul>
    </div>
  );
};

export { GamesList };
