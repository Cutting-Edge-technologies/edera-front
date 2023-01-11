import { createSlice } from '@reduxjs/toolkit'

export const tokenSlice = createSlice({
  name: 'token',
  initialState: {
    value: '',
  },
  reducers: {
    setToken: (state) => {
      state.value = '17606f36ad237d52809d9f4576f0b009990f0718'
    },
    resetToken: (state) => {
      state.value = ''
    },
  },
})

// Action creators are generated for each case reducer function
export const { setToken, resetToken } = tokenSlice.actions

export default tokenSlice.reducer