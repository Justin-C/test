import React from 'react';
import Text from './text';
import { QUESTION_COUNT, SCORE_COUNT } from '../enums/question-page-enums';
import QUESTION_LIST from '../enums/questions-and-answers-enums';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import Question from './question';
import '../styles/styles.scss';

/**
 * This is the Question Page.  It will render the question count, score,
 * and each question.
 */
const QuestionPage = () => {
  const score = useSelector((state: RootState) => state.trivia.scoreState.score);
  const currentQuestionNum = useSelector(
    (state: RootState) => state.trivia.questionState.currentQuestionNum
  );

  const questionCount = QUESTION_LIST.length;

  return (
    <div className="question__page-wrapper">
      <Text
        styleName="question__counter"
        textString={QUESTION_COUNT(currentQuestionNum + 1, questionCount)}
      />
      <Text styleName="question__score" textString={SCORE_COUNT(score.toString())} />
      <Question questionObj={QUESTION_LIST[currentQuestionNum]} />
    </div>
  );
};

export default QuestionPage;
