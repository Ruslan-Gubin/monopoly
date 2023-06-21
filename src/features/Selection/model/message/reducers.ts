import { PayloadAction } from '@reduxjs/toolkit/dist/createAction'
import { SelectMessageInitState, MessageModel } from './types'


export const reducers = { 

  addNewMessage(state: SelectMessageInitState, action: PayloadAction<MessageModel>) {
    state.messages.push(action.payload)
  },

  setMessages(state: SelectMessageInitState, action: PayloadAction<MessageModel[]>) {
    state.messages = action.payload
  },

  clearMessages(state: SelectMessageInitState) {
    state.messages = []
  },
  
}