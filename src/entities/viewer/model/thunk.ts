import { createAppThunk } from '@/shared';
import { ViewerApi } from '../api'
import { ReqAuthLogin, ReqUpdateBody, ReqUserRegistration, ResAuth } from './types';


export const fetchLogin = createAppThunk('viewer/fetchLogin', async(login: ReqAuthLogin, { rejectWithValue })  => {
  const { email, password } = login

  const response = await ViewerApi.login<ResAuth>({ email, password })

  if (response.text) {
    return rejectWithValue(response.text)
  }

  return response
})

export const fetchRegistration = createAppThunk('viewer/fetchRegistration', async(userData: ReqUserRegistration, { rejectWithValue }) => { 
  const response = await ViewerApi.registration<ResAuth>(userData)

  if (response.error) {
    let errorText = response.text
    if (response.error.keyValue.hasOwnProperty('email')) {
      errorText = 'Такой email уже занят'
    }
    return rejectWithValue(errorText ? errorText : '')
  }

  return response
})

export const fetchGetMy = createAppThunk('viewer/fetchGetMy', async(id: string, { rejectWithValue }) => {
  const response = await ViewerApi.getMy<ResAuth>(id)

  if (response.text) {
    return rejectWithValue(response.text)
  }

  return response
})
 

export const fetchDeleteViewer = createAppThunk('viewer/fetchDelete', async(id: string, { rejectWithValue }) => {
  const response = await ViewerApi.deleteViewer<{ success: boolean, message: string, text?: string}>(id)
  
  if (response.text) {
    return rejectWithValue(response.text)
  }
  
  return response
})

export const fetchUpdateViewer = createAppThunk('viewer/fetchUpdateViewer', async(body: ReqUpdateBody, { rejectWithValue }) => {
  const response = await ViewerApi.updateViewer<ResAuth>(body)

  if (response.text) {
    return rejectWithValue(response.text)
  }
  
  return response
})

