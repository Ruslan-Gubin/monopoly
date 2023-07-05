import { PayloadAction } from '@reduxjs/toolkit/dist/createAction'
import { SelectMessageInitState, MessageModel } from './types'


export const reducers = { 

  addNewMessage(state: SelectMessageInitState, action: PayloadAction<MessageModel>) {
    state.messages.unshift(action.payload)

    if (state.messages) {
      state.error = null;
    }
  },

  setMessages(state: SelectMessageInitState, action: PayloadAction<MessageModel[]| { text: string }>) {
    if (!Array.isArray(action.payload)) {
      state.error = action.payload.text
      return;
    }
   
    if (state.messages.length === 0) {
      state.messages = action.payload

      if (state.messages) {
        state.error = null;
      }
      
    } else {
      return
    }
  },

  clearMessages(state: SelectMessageInitState) {
    state.messages = []

    if (state.messages) {
      state.error = null;
    }
  },
  
}