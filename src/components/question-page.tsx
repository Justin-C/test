import React from 'react';
import Text from './text';
import Button from './button';
import {
  BUTTON_TEXT,
  BUTTON_TEXT_FINAL_QUESTION,
  CORRECT_ANSWER_MESSAGE,
  QUESTION_COUNT,
  SCORE_COUNT,
  WRONG_ANSWER_MESSAGE
} from '../enums/question-page-enums';
import QUESTION_LIST from '../enums/questions-and-answers-enums';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  incrementCurrentQuestionNum,
  resetSelectedAnswers,
  setIsAnswered,
  setIsCorrect
} from '../redux/triviaSlice';
import { RootState } from '../redux/store';
import { FINAL_PATH } from '../enums/route-enums';
import Question from './question';

const QuestionPage = () => {
  const score = useSelector((state: RootState) => state.trivia.score);
  const isCorrect = useSelector((state: RootState) => state.trivia.isCorrect);
  const isAnswered = useSelector((state: RootState) => state.trivia.isAnswered);
  const currentQuestionNum = useSelector((state: RootState) => state.trivia.currentQuestionNum);

  const questionCount = QUESTION_LIST.length;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const increaseQuestion = () => {
    if (currentQuestionNum < questionCount - 1) {
      dispatch(setIsCorrect(false));
      dispatch(setIsAnswered(false));
      dispatch(incrementCurrentQuestionNum());
      dispatch(resetSelectedAnswers());
    } else {
      navigate(FINAL_PATH);
    }
  };

  // todo rename
  const renderFeedback =
    isAnswered &&
    (isCorrect ? (
      <Text
        textString={CORRECT_ANSWER_MESSAGE}
        styleName="question__feedback question__feedback--correct"
      />
    ) : (
      <Text
        textString={WRONG_ANSWER_MESSAGE}
        styleName="question__feedback question__feedback--incorrect"
      />
    ));

  return (
    <div className="question__page-wrapper">
      <Text
        styleName="question__counter"
        textString={QUESTION_COUNT(currentQuestionNum + 1, questionCount)}
      />
      <Text styleName="question__score" textString={SCORE_COUNT(score.toString())} />
      <Question questionObj={QUESTION_LIST[currentQuestionNum]} />
      {renderFeedback}
      <Button
        buttonText={
          currentQuestionNum === questionCount - 1 ? BUTTON_TEXT_FINAL_QUESTION : BUTTON_TEXT
        }
        isEnabled={isAnswered}
        handleClick={increaseQuestion}
      />
    </div>
  );
};

export default QuestionPage;
