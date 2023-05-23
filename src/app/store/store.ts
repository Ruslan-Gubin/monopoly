import { configureStore } from "@reduxjs/toolkit";
import {  persistStore } from "redux-persist";
import { setupListeners } from '@reduxjs/toolkit/query'

import { persistedReducer } from "./config";
import * as reducer from "@/features";
import { baseApi } from "@/shared/api";
import { serializable } from "./middleware";



export const store = configureStore({
    reducer: persistedReducer,
  
  middleware: (getDefaultMiddleware) =>
  
  getDefaultMiddleware(serializable)
  .concat(baseApi.middleware)
  .concat(reducer.sessionMiddleware) 
    })
    
setupListeners(store.dispatch)
 

export const persist = persistStore(store)

export type AppDispatch = typeof store.dispatch;