import { ActionReducerMapBuilder } from '@reduxjs/toolkit'
import { fetchAllCells } from './thunk'
import {  CellInitState } from './types'



export const extraReducers = (builder: ActionReducerMapBuilder<CellInitState>) => {
	builder
		.addCase(fetchAllCells.pending, (state) => {
			state.loading = true
			state.error = null
		})
		.addCase(fetchAllCells.rejected, (state, action) => {
			state.loading = false
			state.error = `${action.error.name}: cells ${action.payload}`
		})
		.addCase(fetchAllCells.fulfilled, (state, action) => {
			const { cells } = action.payload
			
			state.loading = false
			state.error = null
			state.cells = cells
		})
}