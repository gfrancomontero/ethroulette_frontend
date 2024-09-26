import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  canPlaceBet: false,
  currentBetSize: '',
  selectedColor: '',
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
    setSelectedColor: (state, action) => {
      state.selectedColor = action.payload
    },
  },
})

export const { setCanPlaceBet, setCurrentBetSize, setSelectedColor } = betSlice.actions
export default betSlice.reducer
