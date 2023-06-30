import { ActionReducerMapBuilder } from '@reduxjs/toolkit'
import { connectSelection } from './thunk'
import { SelectInitState } from './types'



export const extraReducers = (builder: ActionReducerMapBuilder<SelectInitState>) => {

		builder
		.addCase(connectSelection.pending, (state) => {
			state.isConnected = false
			state.isEstablishingConnection = false
		})
		.addCase(connectSelection.rejected, (state, action) => {
			state.isConnected = false
			state.isEstablishingConnection = false
			if (action.payload) {
				state.error = action.payload
			}
		})
		.addCase(connectSelection.fulfilled, (state, action) => {
			state.error = null
			if (action.payload.type === 'disconect') {
				state.isEstablishingConnection = false;
				state.isConnected = false;
				state.authId = null;
				state.joinSession = null;
				state.owner = null;
				state.playersCount = 0;
				state.selectioGames = [];
			} else {
				state.isEstablishingConnection = true;
				state.isConnected = true;
				state.authId = action.payload.viewerId
			}
		})
	
}