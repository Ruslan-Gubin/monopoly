import { CookieService, TokenService } from '@/shared'
import { ViewerInitState } from './types'

export const reducers = {
  clearViewer(state: ViewerInitState) {
    state.accessToken = null
    state.authId = null
    state.autorization = false
    state.viewer = null
    CookieService.remove('token')
    TokenService.remove()
  },

}