import { PayloadAction } from '@reduxjs/toolkit/dist/createAction'
import { SelectMessageInitState, MessageModel } from './types'


export const reducers = { 

  addNewMessage(state: SelectMessageInitState, action: PayloadAction<MessageModel>) {
    state.messages.unshift(action.payload)
  },

  setMessages(state: SelectMessageInitState, action: PayloadAction<MessageModel[]>) {
    if (state.messages.length === 0) {
      state.messages = action.payload
    } else {
      return
    }
  },

  clearMessages(state: SelectMessageInitState) {
    state.messages = []
  },
  
}