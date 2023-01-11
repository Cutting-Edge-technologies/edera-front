import { createSlice } from '@reduxjs/toolkit'
export const tokenSlice = createSlice({
  name: 'token',
  initialState: {
    value: '',
  },
  reducers: {
    setToken: (state) => {
      return ({value: '17606f36ad237d52809d9f4576f0b009990f0718'});
    },
    resetToken: (state) => {
      return ({value: ''});
    },
  },
})

export const { setToken, resetToken } = tokenSlice.actions

export default tokenSlice.reducer
