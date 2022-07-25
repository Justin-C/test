import React, { ChangeEvent, Fragment, useState } from 'react';
import Text from './text';
import '../styles/allstyles.scss';
import QUESTION_LIST from '../enums/questions-and-answers-enums';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import {
  incrementScore,
  resetQuestionState,
  setIsAnswered,
  setIsCorrect,
  setIsSubmited,
} from '../redux/triviaSlice';
import Button from './button';
import { useNavigate } from 'react-router-dom';
import { FINAL_PATH } from '../enums/route-enums';
import {
  BUTTON_TEXT_FINAL_QUESTION,
  BUTTON_TEXT_NEXT,
  BUTTON_TEXT_SUBMIT,
  CORRECT_ANSWER_MESSAGE,
  WRONG_ANSWER_MESSAGE
} from '../enums/question-page-enums';
import AnswerRadio from './answer-radio';
import AnswerCheckbox from './answer-checkbox';

interface QuestionProps {
  questionObj: {
    QUESTION_TEXT: string;
    QUESTION_OPTIONS: string[];
    ANSWER_INDEX: number[];
    IS_MULTI: boolean;
  };
}

const Question = (props: QuestionProps) => {
  const currentQuestionNum = useSelector(
    (state: RootState) => state.trivia.questionState.currentQuestionNum
  );
  const isAnswered = useSelector((state: RootState) => state.trivia.questionState.isAnswered);
  const isSubmited = useSelector((state: RootState) => state.trivia.questionState.isSubmited);
  const isCorrect = useSelector((state: RootState) => state.trivia.questionState.isCorrect);

  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([])

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const questionCount = QUESTION_LIST.length;

  const increaseQuestion = () => {
    if (currentQuestionNum < questionCount - 1) {
      dispatch(resetQuestionState());
      setSelectedAnswers([]);
    } else {
      navigate(FINAL_PATH);
    }
  };

  const handleSubmitMulti = () => {
    dispatch(setIsSubmited(true));
    if (selectedAnswers.length === props.questionObj.ANSWER_INDEX.length) {
      const sortedAnswers = [...selectedAnswers].sort();
      const sortedAnswerIndex = [...props.questionObj.ANSWER_INDEX].sort();
      let ind = selectedAnswers.length;
      let didError = false;
      while (ind--) {
        if (sortedAnswers[ind] !== sortedAnswerIndex[ind]) {
          didError = true;
          dispatch(setIsCorrect(false));
        }
      }
      if (!didError) {
        dispatch(setIsCorrect(true));
        dispatch(incrementScore());
      }
    } else {
      dispatch(setIsCorrect(false));
    }
  };

  const handleSubmitRadio = () => {
    dispatch(setIsSubmited(true));
    if (selectedAnswers?.[0] === props.questionObj?.ANSWER_INDEX?.[0]) {
      dispatch(setIsCorrect(true));
      dispatch(incrementScore());
    }
  };

  const renderFeedback =
    isSubmited &&
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

  const handleSelectRadio = (index: number) => {
    dispatch(setIsAnswered(true));
    setSelectedAnswers([index])
  };

  const handleSelectCheckbox = (e: ChangeEvent<Element>, index: number) => {
    if ((e.target as HTMLInputElement).checked) {
      if (selectedAnswers.length + 1 === props.questionObj.ANSWER_INDEX.length) {
        dispatch(setIsAnswered(true));
      }
      setSelectedAnswers(arr => [...arr, index])
    } else {
      if (selectedAnswers.length === props.questionObj.ANSWER_INDEX.length) {
        dispatch(setIsAnswered(false));
      }
      setSelectedAnswers(arr => arr.filter((ind) => ind !== index))

    }
  };

  const renderAnswers = props.questionObj.QUESTION_OPTIONS.map((str, index) =>
    props.questionObj.IS_MULTI ? (
      <AnswerCheckbox
        handleClick={(e) => handleSelectCheckbox(e, index)}
        answerText={str}
        key={str}
        isEnabled={isSubmited}
      />
    ) : (
      <AnswerRadio
        handleClick={() => handleSelectRadio(index)}
        answerText={str}
        key={str}
        isEnabled={isSubmited}
      />
    )
  );

  return (
    <Fragment>
      <Text styleName="question__question-text" textString={props.questionObj.QUESTION_TEXT} />
      <div className="question__answer-container">{renderAnswers}</div>
      {renderFeedback}
      <Button
        buttonText={
          isSubmited
            ? currentQuestionNum === questionCount - 1
              ? BUTTON_TEXT_FINAL_QUESTION
              : BUTTON_TEXT_NEXT
            : BUTTON_TEXT_SUBMIT
        }
        isEnabled={isAnswered}
        handleClick={
          isSubmited
            ? increaseQuestion
            : props.questionObj.IS_MULTI
            ? handleSubmitMulti
            : handleSubmitRadio
        }
      />
    </Fragment>
  );
};

export default Question;
