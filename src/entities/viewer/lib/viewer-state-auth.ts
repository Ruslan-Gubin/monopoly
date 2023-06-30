import { CookieService,  TokenService } from "@/shared"
import { ResAuth, ViewerInitState } from "../model"

export const viewerPending = (state: ViewerInitState) => {
	state.autorization = false
	state.loading = true
	state.error = null
	state.accessToken = null
	state.authId = null
	state.viewer = null
}

export const viewerRejected = (state: ViewerInitState, action: { payload: string | undefined }) => {
	state.loading = false
	state.error = action.payload ? action.payload : null
	state.autorization = false 
	state.accessToken = null
	state.authId = null
	state.viewer = null
	
	CookieService.remove('token')
	TokenService.remove()
}

export const viewerFulfiled = (state: ViewerInitState, action: {payload: ResAuth}) => {
	const { token, _id, email, fullName, image } = action.payload
			state.loading = false
			state.error = null

			CookieService.set(token)
			TokenService.set(token)

			state.autorization = true
			state.accessToken = token
			state.authId = _id
			state.viewer = { email, fullName, image, viewerId: _id }
}

export const removeViewerfulfiled = (state: ViewerInitState) => {
	    state.loading = false
			state.accessToken = null
			state.autorization = false
			state.error = null
			state.authId = null
			state.viewer = null
			CookieService.remove('token')
	    TokenService.remove()
}