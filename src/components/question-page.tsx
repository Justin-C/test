import React, { useEffect, useState } from 'react';

import Text from './text';
import Answer from './answer';
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
  incrementScore,
  setIsAnswered,
  setIsCorrect
} from '../redux/triviaSlice';
import { RootState } from '../redux/store';
import { FINAL_PATH } from '../enums/route-enums';

const QuestionPage = () => {
  // const [score, setScore] = useState(0);
  const score = useSelector((state: RootState) => state.trivia.score);
  const isCorrect = useSelector((state: RootState) => state.trivia.isCorrect);
  const isAnswered = useSelector((state: RootState) => state.trivia.isAnswered);
  const currentQuestionNum = useSelector((state: RootState) => state.trivia.currentQuestionNum);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);

  const questionCount = QUESTION_LIST.length;
  // const [questionNum, setQuestionNum] = useState(0);
  // const [complete, setComplete] = useState(false);
  // const [correct, setCorrect] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const increaseQuestion = () => {
    if (currentQuestionNum < questionCount - 1) {
      // setComplete(false);
      // setCorrect(false);
      // setQuestionNum(questionNum + 1);
      dispatch(setIsCorrect(false));
      dispatch(setIsAnswered(false));
      dispatch(incrementCurrentQuestionNum());
      setSelectedAnswers([]);
    } else {
      navigate(FINAL_PATH);
    }
  };

  useEffect(() => {
    if (selectedAnswers.length === QUESTION_LIST[currentQuestionNum].ANSWER_INDEX.length) {
      // setComplete(true);
      dispatch(setIsAnswered(true));
      let isWrong = false;
      for (const x of QUESTION_LIST[currentQuestionNum].ANSWER_INDEX) {
        if (selectedAnswers.indexOf(QUESTION_LIST[currentQuestionNum].QUESTION_OPTIONS[x]) === -1) {
          isWrong = true;
        }
      }
      if (!isWrong) {
        dispatch(setIsCorrect(true));
        dispatch(incrementScore());
      }
    }
  }, [selectedAnswers]);

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedAnswers((prev) => [...prev, e.target.value]);
  };

  const renderAnswers = QUESTION_LIST[currentQuestionNum].QUESTION_OPTIONS.map((str) => (
    <Answer handleClick={handleSelect} answerText={str} key={str} isEnabled={isAnswered} />
  ));

  // todo rename
  const renderAnswered =
    isAnswered &&
    (isCorrect ? (
      <Text textString={CORRECT_ANSWER_MESSAGE} styleName="answer-correct" />
    ) : (
      <Text textString={WRONG_ANSWER_MESSAGE} styleName="answer-incorrect" />
    ));

  return (
    <div className="question-page-wrapper">
      {/* TODO move to a const??? */}
      <Text
        styleName="question-count"
        textString={QUESTION_COUNT(currentQuestionNum + 1, questionCount)}
      />
      <Text styleName="score-count" textString={SCORE_COUNT(score.toString())} />
      <Text
        styleName="question-text"
        textString={QUESTION_LIST[currentQuestionNum]?.QUESTION_TEXT}
      />
      <div className="answers">{renderAnswers}</div>
      {renderAnswered}
      <br />
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
