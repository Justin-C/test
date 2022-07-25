import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import getFormattedDate from '../helpers/getFormattedDate';

export interface triviaState {
  scoreState: {
    score: number; // user score
    highScore: number; // user high score
    highScoreDate: string; // user high score date
  };
  questionState: {
    currentQuestionNum: number; // number question user is on
    isCorrect: boolean; // is answer correct
    isAnswered: boolean; // has user selected an answer
    isSubmited: boolean; // has user clicked submit button
  };
}
const localStorageScore = window.localStorage.getItem('highScore') || '';
const initialState: triviaState = {
  scoreState: {
    score: 0,
    highScore: parseInt(localStorageScore) || 0,
    highScoreDate: window.localStorage.getItem('highScoreDate') || getFormattedDate()
  },
  questionState: {
    currentQuestionNum: 0,
    isCorrect: false,
    isAnswered: false,
    isSubmited: false
  }
};

export const triviaSlice = createSlice({
  name: 'trivia',
  initialState,
  reducers: {
    incrementScore: (state: triviaState) => {
      state.scoreState.score += 1;
    },
    resetScore: (state: triviaState) => {
      state.scoreState.score = 0;
    },
    updateHighScore: (state: triviaState, action: PayloadAction<number>) => {
      state.scoreState.highScore = action.payload;
    },
    updateHighScoreDate: (state: triviaState, action: PayloadAction<string>) => {
      state.scoreState.highScoreDate = action.payload;
    },
    incrementCurrentQuestionNum: (state: triviaState) => {
      state.questionState.currentQuestionNum += 1;
    },
    setIsCorrect: (state: triviaState, action: PayloadAction<boolean>) => {
      state.questionState.isCorrect = action.payload;
    },
    setIsAnswered: (state: triviaState, action: PayloadAction<boolean>) => {
      state.questionState.isAnswered = action.payload;
    },
    setIsSubmited: (state: triviaState, action: PayloadAction<boolean>) => {
      state.questionState.isSubmited = action.payload;
    },
    resetState: (state: triviaState) => {
      state.scoreState.score = 0;
      state.questionState.currentQuestionNum = 0;
      state.questionState.isAnswered = false;
      state.questionState.isCorrect = false;
      state.questionState.isSubmited = false;
    },
    resetQuestionState: (state: triviaState) => {
      state.questionState.isAnswered = false;
      state.questionState.isCorrect = false;
      state.questionState.isSubmited = false;
      state.questionState.currentQuestionNum += 1;
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
  setIsSubmited,
  resetQuestionState,
  resetState
} = triviaSlice.actions;

export default triviaSlice.reducer;
