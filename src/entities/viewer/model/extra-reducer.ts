import { ActionReducerMapBuilder } from '@reduxjs/toolkit'
import { fetchDeleteViewer, fetchLogin, fetchRegistration, fetchUpdateViewer } from './thunk'
import {  ViewerInitState } from './types'
import { removeViewerfulfiled, viewerFulfiled, viewerPending, viewerRejected } from '../lib'



export const extraReducers = (builder: ActionReducerMapBuilder<ViewerInitState>) => {
	builder
		.addCase(fetchLogin.pending, (state) => {
			viewerPending(state)
		})
		.addCase(fetchLogin.rejected, (state, action) => {
			 viewerRejected(state, action)
		})
		.addCase(fetchLogin.fulfilled, (state, action) => {
			viewerFulfiled(state, action)
		})

		builder
		.addCase(fetchRegistration.pending, (state) => {
			viewerPending(state)
		})
		.addCase(fetchRegistration.rejected, (state, action) => {
			viewerRejected(state, action)
		})
		.addCase(fetchRegistration.fulfilled, (state, action) => {
			viewerFulfiled(state, action)
		})

		builder
		.addCase(fetchDeleteViewer.pending, (state) => {
			viewerPending(state)
		})
		.addCase(fetchDeleteViewer.rejected, (state, action) => {
			viewerRejected(state, action)
		})
		.addCase(fetchDeleteViewer.fulfilled, (state, action) => {
			removeViewerfulfiled(state)
		})

		builder
		.addCase(fetchUpdateViewer.pending, (state) => {
			state.loading = true
			state.error = null
		})
		.addCase(fetchUpdateViewer.rejected, (state, action) => {
			state.loading = false
			state.error = action.payload ? action.payload : null
		})
		.addCase(fetchUpdateViewer.fulfilled, (state, action) => {
			const { _id, email, fullName, image } = action.payload
			

			state.loading = false
			state.error = null
			state.viewer = { email, fullName, image, viewerId: _id }
		})
	
}