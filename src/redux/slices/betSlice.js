import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  canPlaceBet: false,
  currentBetSize: '',
}

const betSlice = createSlice({
  name: 'bet',
  initialState,
  reducers: {
    setCanPlaceBet: (state, action) => {
      state.canPlaceBet = action.payload
    },
    setCurrentBetSize: (state, action) => {
      state.currentBetSize = action.payload
    },
  },
})

export const { setCanPlaceBet, setCurrentBetSize } = betSlice.actions
export default betSlice.reducer
