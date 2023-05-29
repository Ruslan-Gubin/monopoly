import { SelectInitState, SelectionModel } from "../../model"


export const updateSessions = (arr: SelectionModel[], id: string, updateObj: SelectionModel): SelectionModel[] => {
 return  arr.map(session => session._id === id ? updateObj : session)
}

export const selectionEmptyArray = (array: SelectionModel[], state: SelectInitState) => {
  if (array.length === 0) {
    state.joinSession = null
    state.owner = null
    return true
  }
  return false
}

export const selectionFindViewer = (array: SelectionModel[], state: SelectInitState) => {
  array.forEach(session => {
    if (session.owner === state.authId) {
     state.owner = session._id
     state.playersCount = session.players.length
     state.joinSession = null
    }

     session.players.forEach( (player, ind) => {
       if (player.id === state.authId && ind >= 1 ) {
           state.owner = null
           state.playersCount = 0
           state.joinSession = session._id
       }

     })
   })
}

export const updateCountPlayers = ({id, state, length}: {id: string, state: SelectInitState, length: number}) => {
  if (id !== state.owner) return;
    state.playersCount = length
}

