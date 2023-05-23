import { PayloadAction } from "@reduxjs/toolkit";
import { ViewerFeatureInit } from "./types";


export const reducers = {

  setFoto(state: ViewerFeatureInit, action: PayloadAction<{ img: string }>) {
    state.activeFoto = action.payload.img
    state.changeViewerStatus = true
  },

  openModal(state: ViewerFeatureInit, action: PayloadAction<{type: string}>) {
    const type = action.payload.type

    if (type === 'update') {
      state.titleModal = 'Edit user ?'
      state.buttonTextModal = 'Edit'
    }

    if (type === 'remove') {
      state.titleModal = 'Delete user ?'
      state.buttonTextModal = 'Delete'
    }
    
    state.modalActive = !state.modalActive
  },

  closeModal(state: ViewerFeatureInit) {
    state.modalActive = false;
    state.activeFoto = null;
    state.changeViewerStatus = false;
    state.newName = ''
  },

  toggleModal(state: ViewerFeatureInit) {
    state.modalActive = !state.modalActive
  },

  changeName(state: ViewerFeatureInit, action: PayloadAction<{ value: string }>){
    state.newName = action.payload.value 
  },

  loginStatusToggle(state: ViewerFeatureInit) {
    if (state.loginStatus === 'login') {
      state.loginStatus = 'registration'
    }  else {
       state.loginStatus = 'login'
    }
   
  },


}