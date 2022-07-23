import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import getFormattedDate from '../helpers/getFormattedDate';

export interface triviaState {
  score: number;
  highScore: number;
  highScoreDate: string;
  currentQuestionNum: number;
  isCorrect: boolean;
  isAnswered: boolean;
  selectedAnswers: string[];
}
const localStorageScore = window.localStorage.getItem('highScore') || '';
const initialState: triviaState = {
  score: 0,
  highScore: parseInt(localStorageScore) || 0,
  highScoreDate: window.localStorage.getItem('highScoreDate') || getFormattedDate(),
  currentQuestionNum: 0,
  isCorrect: false,
  isAnswered: false,
  selectedAnswers: []
};

export const triviaSlice = createSlice({
  name: 'trivia',
  initialState,
  reducers: {
    incrementScore: (state) => {
      state.score += 1;
    },
    resetScore: (state) => {
      state.score = 0;
    },
    updateHighScore: (state, action: PayloadAction<number>) => {
      state.highScore = action.payload;
    },
    updateHighScoreDate: (state, action: PayloadAction<string>) => {
      state.highScoreDate = action.payload;
    },
    incrementCurrentQuestionNum: (state) => {
      state.currentQuestionNum += 1;
    },
    setIsCorrect: (state, action: PayloadAction<boolean>) => {
      state.isCorrect = action.payload;
    },
    setIsAnswered: (state, action: PayloadAction<boolean>) => {
      state.isAnswered = action.payload;
    },
    setSelectedAnswers: (state, action: PayloadAction<string>) => {
      state.selectedAnswers = [...state.selectedAnswers, action.payload];
    },
    resetSelectedAnswers: (state) => {
      state.selectedAnswers = [];
    },
    resetState: (state) => {
      state.score = 0;
      state.currentQuestionNum = 0;
      state.isAnswered = false;
      state.isCorrect = false;
    }
  }
});

// Action creators are generated for each case reducer function
export const {
  incrementScore,
  resetScore,
  updateHighScore,
  updateHighScoreDate,
  incrementCurrentQuestionNum,
  setIsCorrect,
  setIsAnswered,
  setSelectedAnswers,
  resetSelectedAnswers,
  resetState
} = triviaSlice.actions;

export default triviaSlice.reducer;
