import { PayloadAction } from '@reduxjs/toolkit/dist/createAction'
import { SelectNotificationInitState } from './types'


export const reducers = { 

  setNotification(state: SelectNotificationInitState, action: PayloadAction<string>) {
    state.notification = action.payload;
  },
  
}