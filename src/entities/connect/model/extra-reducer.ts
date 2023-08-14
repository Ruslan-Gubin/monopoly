import { ActionReducerMapBuilder } from '@reduxjs/toolkit'
import { fetchConnect } from './thunk'
import {  ConnectInitState } from './types'



export const extraReducers = (builder: ActionReducerMapBuilder<ConnectInitState>) => {
	builder
		.addCase(fetchConnect.pending, (state) => {
			state.error = null;
			state.loading = true;
		})
		.addCase(fetchConnect.rejected, (state, action) => {
			state.loading = false;
			if (action.payload) {
				state.error = action.payload;
			}
		})
		.addCase(fetchConnect.fulfilled, (state, action) => {
			state.error = null;
			state.loading = false;
			state.isConnect = action.payload.success;
		})
	
}