import { createAsyncThunk } from '@reduxjs/toolkit'
import { ViewerApi } from '../api'
import { ReqAuthLogin, ReqUpdateBody, ReqUserRegistration, ResAuth } from './types';



export const fetchLogin = createAsyncThunk<ResAuth, ReqAuthLogin, { rejectValue: string, getState: RootState }>('viewer/fetchLogin', async(login, {rejectWithValue, getState}) => {
  const { email, password } = login

  const response = await ViewerApi.login<ResAuth>({ email, password })

  if (response.text) {
    return rejectWithValue(response.text)
  }

  return response
})
 
export const fetchRegistration = createAsyncThunk<ResAuth, ReqUserRegistration, { rejectValue: string, getState: RootState }>('viewer/fetchRegistration', async(userData, { rejectWithValue }) => {
  const response = await ViewerApi.registration<ResAuth>(userData)
 
  if (response.text) {
    return rejectWithValue(response.text)
  }

  return response
})

export const fetchGetMy = createAsyncThunk<ResAuth,  string , { rejectValue: string, getState: RootState }>('viewer/fetchGetMy', async(id, { rejectWithValue }) => {
  const response = await ViewerApi.getMy<ResAuth>(id)

  if (response.text) {
    return rejectWithValue(response.text)
  }

  return response
})
 
export const fetchDeleteViewer = createAsyncThunk<{ success: boolean, message: string},  string , { rejectValue: string, getState: RootState }>('viewer/fetchDelete', async(id, { rejectWithValue }) => {
  const response = await ViewerApi.deleteViewer<{ success: boolean, message: string, text?: string}>(id)
  
  if (response.text) {
    return rejectWithValue(response.text)
  }
  
  return response
})

export const fetchUpdateViewer = createAsyncThunk<ResAuth,  ReqUpdateBody , { rejectValue: string, getState: RootState }>('viewer/fetchUpdateViewer', async(body, { rejectWithValue }) => {
  const response = await ViewerApi.updateViewer<ResAuth>(body)

  if (response.text) {
    return rejectWithValue(response.text)
  }
  
  return response
})

