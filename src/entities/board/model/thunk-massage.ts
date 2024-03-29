import {
  auctionAction,
  cellAction,
  actionDice,
  playerAction,
  actionProperty,
  gameNotificationAction,
} from "@/entities";
import { createAppThunk } from "@/shared";
import { boardAction } from "./selector";
import { getNextPlayer } from "../libs";

export const resetBoardState = (dispatch: any) => {
  dispatch(auctionAction.resetAuction());
  dispatch(boardAction.resetBoard());
  dispatch(cellAction.resetCells());
  dispatch(actionDice.resetDice());
  dispatch(gameNotificationAction.resetGameNotification());
  dispatch(playerAction.resetPlayer());
  dispatch(actionProperty.resetPropertys());
}

export const boardSocketMessage = createAppThunk(
  "sessionSlice/boardSocketMessage",
  async (e: MessageEvent, { rejectWithValue, dispatch, getState }) => {
    try {
      const messageEvent = JSON.parse(e.data);
      const { authId } = getState().viewer;
      const { cells, smallSize } = getState().cells;
      const { board } = getState().board;
      const { players } = getState().player;

      let nextPlayer = null;

      if (messageEvent.title && messageEvent.method !== "connection") {
        dispatch(
          gameNotificationAction.addNotification({
            notification: messageEvent.title,
          })
        );
      }

      switch (messageEvent.method) {
        case "connectData":
          dispatch(cellAction.getAllCells({ cells: messageEvent.data.cells }));
          dispatch(
            playerAction.initAllPlayers({
              players: messageEvent.data.players,
              authId,
            })
          );
          dispatch(boardAction.updateBoard({ board: messageEvent.data.board }));
          dispatch(actionDice.setDice({ dice: messageEvent.data.dice }));
          dispatch(
            actionProperty.initProperty({
              propertys: messageEvent.data.propertys,
            })
          );
          dispatch(
            auctionAction.updateAuction({ auction: messageEvent.data.auction })
          );
          break;
        case "roolDice":
          dispatch(actionDice.setDice({ dice: messageEvent.data.dice }));
          if (!messageEvent.data.board) {
            dispatch(
              playerAction.moveActive({
                cells,
                diceValue: messageEvent.data.dice.value,
                board,
              })
            );
          }
          dispatch(boardAction.updateBoard({ board: messageEvent.data.board }));
          dispatch(
            playerAction.updatePlayer({ player: messageEvent.data.player })
          );
          break;
        case "finishedMove":
          if (!cells) return;
          dispatch(
            playerAction.finishedMoveUpdatePosition({
              player: messageEvent.data.player,
              cellSize: smallSize,
              cells,
            })
          );
          dispatch(boardAction.updateBoard({ board: messageEvent.data.board }));
          dispatch(
            playerAction.updatePlayer({ player: messageEvent.data.player })
          );

          if (messageEvent.data.board) {
            nextPlayer = getNextPlayer(
              players,
              messageEvent.data.board.currentPlayerId
            );
            if (nextPlayer) {
              dispatch(
                gameNotificationAction.addNotification({
                  notification: `Ход игрока ${nextPlayer.name}`,
                })
              );
            }
          }
          break;
        case "buyProperty":
          dispatch(boardAction.updateBoard({ board: messageEvent.data.board }));
          dispatch(
            playerAction.updatePlayer({ player: messageEvent.data.player })
          );
          dispatch(
            actionProperty.updatePropertys({
              property: messageEvent.data.property,
              manyProperty: messageEvent.data.manyProperty,
            })
          );

          nextPlayer = getNextPlayer(
            players,
            messageEvent.data.board.currentPlayerId
          );
          if (nextPlayer) {
            dispatch(
              gameNotificationAction.addNotification({
                notification: `Ход игрока ${nextPlayer.name}`,
              })
            );
          }
          break;
        case "pay":
          dispatch(boardAction.updateBoard({ board: messageEvent.data.board }));
          dispatch(
            playerAction.updatePlayer({ player: messageEvent.data.player })
          );
          if (messageEvent.data.propertyOwner) {
            dispatch(
              playerAction.updatePlayer({
                player: messageEvent.data.propertyOwner,
              })
            );
          }

          nextPlayer = getNextPlayer(
            players,
            messageEvent.data.board.currentPlayerId
          );
          if (nextPlayer) {
            dispatch(
              gameNotificationAction.addNotification({
                notification: `Ход игрока ${nextPlayer?.name}`,
              })
            );
          }
          break;
        case "updateProperty":
          dispatch(
            playerAction.updatePlayer({ player: messageEvent.data.player })
          );
          dispatch(
            actionProperty.updateProperty({
              property: messageEvent.data.property,
            })
          );
          break;
        case "mortgageProperty":
          dispatch(
            playerAction.updatePlayer({ player: messageEvent.data.player })
          );
          dispatch(
            actionProperty.updateProperty({
              property: messageEvent.data.property,
            })
          );
          break;
        case "auctionRefresh":
          dispatch(boardAction.updateBoard({ board: messageEvent.data.board }));
          dispatch(
            auctionAction.updateAuction({ auction: messageEvent.data.auction })
          );
          break;
        case "auctionAction":
          dispatch(boardAction.updateBoard({ board: messageEvent.data.board }));
          dispatch(
            auctionAction.updateAuction({ auction: messageEvent.data.auction })
          );
          dispatch(
            playerAction.updatePlayer({ player: messageEvent.data.player })
          );
          dispatch(
            actionProperty.updatePropertys({
              property: messageEvent.data.property,
              manyProperty: messageEvent.data.manyProperty,
            })
          );
          break;
        case "playerGameOver":
          dispatch(boardAction.updateBoard({ board: messageEvent.data.board }));
          dispatch(
            playerAction.overPlayer({ player: messageEvent.data.player })
          );
          dispatch(
            actionProperty.overPropertys({
              owner_id: messageEvent.data.player._id,
            })
          );
          break;
      }
    } catch (error) {
      console.error("Failed to get message in WebSocket game board:", error);
      return rejectWithValue(
        `Failed to get message in WebSocket game board: ${error}`
      );
    }
  }
);
