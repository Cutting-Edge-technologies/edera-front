import { configureStore } from '@reduxjs/toolkit'
import tokenReducer from './slices/tokenSlice'

export const tokenStore = configureStore({
  reducer: {
    token: tokenReducer
  },
})

export type tokenStateType = ReturnType <typeof tokenStore.getState>