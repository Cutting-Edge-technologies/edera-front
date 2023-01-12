import { createSlice } from '@reduxjs/toolkit'

export const tokenSlice = createSlice({
  name: 'token',
  initialState: {
    value: '',
  },
  reducers: {
    setToken: (state, actions) => {
      const str = actions.payload;
      return ({value: str});
    },
    resetToken: (state) => {
      return ({value: ''});
    },
  },
})

export const { resetToken, setToken } = tokenSlice.actions

export default tokenSlice.reducer
