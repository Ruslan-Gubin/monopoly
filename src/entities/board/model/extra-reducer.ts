import { ActionReducerMapBuilder } from '@reduxjs/toolkit'
import { fetchBoard } from './thunk'
import {  BoardInitState } from './types'


export const extraReducers = (builder: ActionReducerMapBuilder<BoardInitState>) => {
	builder
		.addCase(fetchBoard.pending, (state) => {
			state.loading = true
			state.error = null
		})
		.addCase(fetchBoard.rejected, (state, action) => {
			state.loading = false
			state.error = `${action.error.name}: board ${action.payload}`
		})
		.addCase(fetchBoard.fulfilled, (state, action) => {
			state.loading = false
			state.error = null
			state.board = action.payload
		})
}