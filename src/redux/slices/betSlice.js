// redux/slices/betSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  canPlaceBet: false,
  currentBetSize: '',
  selectedColor: 'red',
  userWins: undefined,
  announceResult: false,
  winningColor: '',
  lastBetSize: '',
};

const betSlice = createSlice({
  name: 'bet',
  initialState,
  reducers: {
    setCanPlaceBet: (state, action) => {
      state.canPlaceBet = action.payload;
    },
    setCurrentBetSize: (state, action) => {
      state.currentBetSize = action.payload;
    },
    setSelectedColor: (state, action) => {
      state.selectedColor = action.payload;
    },
    setUserWins: (state, action) => {
      state.userWins = action.payload;
    },
    setAnnounceResult: (state, action) => {
      state.announceResult = action.payload;
    },
    setWinningColor: (state, action) => {
      state.winningColor = action.payload;
    },
    setLastBetSize: (state, action) => {
      state.lastBetSize = action.payload;
    },
  },
});

export const { setCanPlaceBet, setCurrentBetSize, setSelectedColor, setUserWins, setAnnounceResult, setLastBetSize, setWinningColor } = betSlice.actions;
export default betSlice.reducer;
