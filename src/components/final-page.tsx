

import Button from './button';
import Text from './text';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import QUESTION_LIST from '../enums/questions-and-answers-enums';
import {
  resetCurrentQuestionNum,
  resetScore,
  setIsAnswered,
  setIsCorrect,
  updateHighScore,
  updateHighScoreDate
} from '../redux/triviaSlice';
import React, { useEffect } from 'react';
import getFormattedDate from '../helpers/getFormattedDate';
import { DEFAULT_PATH } from '../enums/route-enums';
import finalImg from '../img/book.png'
import getFinalHeaderString from '../helpers/getFinalHeaderString';
import { FINAL_SCORE, HIGH_SCORE, RESTART_BUTTON_TEXT } from '../enums/final-page-enums';

// TODO docs
const FinalPage = () => {
  const score = useSelector((state: RootState) => state.trivia.score);
  const highScore = useSelector((state: RootState) => state.trivia.highScore);
  const highScoreDate = useSelector((state: RootState) => state.trivia.highScoreDate);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const questionCount = QUESTION_LIST.length;

  const handleReplayClick = () => {
    dispatch(resetScore());
    dispatch(resetCurrentQuestionNum());
    dispatch(setIsAnswered(false));
    dispatch(setIsCorrect(false));
    navigate(DEFAULT_PATH);
  };

  useEffect(() => {
    if (score > highScore) {
      const newDate = getFormattedDate();
      dispatch(updateHighScore(score));
      dispatch(updateHighScoreDate(newDate));
      window.localStorage.setItem('highScore', score.toString());
      window.localStorage.setItem('highScoreDate', newDate);
    }
  }, [score, highScore]);


  return (
    <div className='final-page-wrapper'>
        {/* todo dynamic messaging */}
        <img src={finalImg} className='final-image' alt='brain on top of book'/>

      <Text textString={getFinalHeaderString(score, questionCount)} styleName='final-header' />
      <Text textString={FINAL_SCORE(score, questionCount)} styleName='final-score'/>
      <Text textString={HIGH_SCORE(highScore, questionCount, highScoreDate) } styleName='final-score'/>
      <Button buttonText={RESTART_BUTTON_TEXT} handleClick={handleReplayClick} isEnabled={true} />
    </div>
  );
};

export default FinalPage;
