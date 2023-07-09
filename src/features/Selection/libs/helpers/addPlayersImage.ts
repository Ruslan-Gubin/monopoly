import { selectionConstant, SelectionModel } from "../../../../entities";

export const addPlayersImage = (
  selectioGames: SelectionModel[]
): SelectionModel[] => {
  const result: SelectionModel[] = [];


  selectioGames.forEach((session: SelectionModel) => {

    if (session.players.length < 5 && !session.isConfirm) {
      result.push({
        ...session,
        players: [...session.players, selectionConstant.addPlayerObj],
      });
    } else {
      result.push(session);
    }
    
    
  });
  return result;
};
