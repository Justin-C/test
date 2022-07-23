import React, { ChangeEventHandler, useEffect, useState } from 'react';
import Text from './text';
import '../styles/allstyles.scss';
import QUESTION_LIST from '../enums/questions-and-answers-enums';
import Answer from './answer';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import {
  incrementScore,
  setIsAnswered,
  setIsCorrect,
  setSelectedAnswers
} from '../redux/triviaSlice';

interface QuestionProps {
  questionObj: {
    QUESTION_TEXT: string;
    QUESTION_OPTIONS: string[];
    ANSWER_INDEX: number[];
  };
}

const Question = (props: QuestionProps) => {
  const currentQuestionNum = useSelector((state: RootState) => state.trivia.currentQuestionNum);
  const isAnswered = useSelector((state: RootState) => state.trivia.isAnswered);
  const selectedAnswers = useSelector((state: RootState) => state.trivia.selectedAnswers);

  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedAnswers.length === props.questionObj.ANSWER_INDEX.length) {
      dispatch(setIsAnswered(true));
      let isWrong = false;
      for (const x of props.questionObj.ANSWER_INDEX) {
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
    dispatch(setSelectedAnswers(e.target.value));
  };

  const renderAnswers = props.questionObj.QUESTION_OPTIONS.map((str) => (
    <Answer handleClick={handleSelect} answerText={str} key={str} isEnabled={isAnswered} />
  ));

  return (
    <div>
      <Text styleName="question__question-text" textString={props.questionObj.QUESTION_TEXT} />
      <div className="question__answer-container">{renderAnswers}</div>
    </div>
  );
};

export default Question;
