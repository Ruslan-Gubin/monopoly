import { useMemo } from "react";
import {
  SelectionCard,
  SelectionModel,
  useSelect,
} from "../../../../entities";
import { SelectionAvatar } from "../selection-avatar/SelectionAvatar";

import styles from "./SelectionGameList.module.scss";
import { addPlayersImage } from "../../libs/helpers/addPlayersImage";
import { NoContent } from "@/shared";

const SelectionGameList = () => {
  const { selectioGames, joinSession, owner } = useSelect(); 

  const sessionsMapUpdate = useMemo((): SelectionModel[] => {
    if (owner || joinSession) {
      return selectioGames;
    }
    
    return addPlayersImage(selectioGames);

  }, [selectioGames, joinSession, owner]);

  const handleCheckActiveGame = useMemo(
    () =>
      (id: string): boolean => {
        return id === owner || id === joinSession;
      },
    [owner, joinSession]
  );

  return (
    <ul className={styles.root}>
      {sessionsMapUpdate.length === 0 && <NoContent title='Игры не найдены' hint='Можете создать игру' />}
      {sessionsMapUpdate.map((session) => (
        <SelectionCard key={session._id} cardActive={handleCheckActiveGame(session._id)} >
            {session.players.map(player => 
        <SelectionAvatar key={player.id} fullName={player.fullName} img={player.img} prayerId={player.id} sessionId={session._id} />
               )}
        </SelectionCard>
      ))}
    </ul>
  );
};

SelectionGameList.displayName = "SelectionGameList";

export { SelectionGameList };
