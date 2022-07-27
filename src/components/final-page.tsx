import React, { useEffect } from 'react';
import Button from './button';
import Text from './text';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import QUESTION_LIST from '../enums/questions-and-answers-enums';
import { resetState, updateHighScore, updateHighScoreDate } from '../redux/triviaSlice';
import '../styles/styles.scss';
import getFormattedDate from '../helpers/getFormattedDate';
import { DEFAULT_PATH } from '../enums/route-enums';
import finalImg from '../img/book.png';
import getFinalHeaderString from '../helpers/getFinalHeaderString';
import { FINAL_SCORE, HIGH_SCORE, RESTART_BUTTON_TEXT } from '../enums/final-page-enums';

/**
 * This is the Final page component that is rendered after the user completes all the
 * questions.  An image, score, highscore, highscore date, and restart button are
 * displayed.
 */
const FinalPage = () => {
  const score = useSelector((state: RootState) => state.trivia.scoreState.score);
  const highScore = useSelector((state: RootState) => state.trivia.scoreState.highScore);
  const highScoreDate = useSelector((state: RootState) => state.trivia.scoreState.highScoreDate);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const questionCount = QUESTION_LIST.length;

  // Navigate the user back to the first question
  const handleReplayClick = () => {
    dispatch(resetState());
    navigate(DEFAULT_PATH);
  };

  // watch the score values and if there is a new highscore, update it
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
    <div className="final__page-wrapper">
      <img src={finalImg} className="final__image" alt="brain on top of book" />
      <Text textString={getFinalHeaderString(score, questionCount)} styleName="final__header" />
      <Text textString={FINAL_SCORE(score, questionCount)} styleName="final__score" />
      <Text
        textString={HIGH_SCORE(highScore, questionCount, highScoreDate)}
        styleName="final__highscore"
      />
      <Button buttonText={RESTART_BUTTON_TEXT} handleClick={handleReplayClick} isEnabled={true} />
    </div>
  );
};

export default FinalPage;
