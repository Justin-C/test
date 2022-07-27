import React, { ChangeEvent, Fragment, useState } from 'react';
import Text from './text';
import '../styles/styles.scss';
import QUESTION_LIST from '../enums/questions-and-answers-enums';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import {
  incrementScore,
  resetQuestionState,
  setIsAnswered,
  setIsCorrect,
  setIsSubmited
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
import '../styles/styles.scss';

interface QuestionProps {
  questionObj: {
    QUESTION_TEXT: string; // question text
    QUESTION_OPTIONS: string[]; // array of options
    ANSWER_INDEX: number[]; // array of the index of correct answers
    IS_MULTI: boolean; // whether question has multiple answers
  };
}

/**
 * The Question component. Renders the question text, question options (radio or checkbox),
 * and submit/next question button
 * @param props see QuestionProps
 */
const Question = (props: QuestionProps) => {
  const currentQuestionNum = useSelector(
    (state: RootState) => state.trivia.questionState.currentQuestionNum
  );
  const isAnswered = useSelector((state: RootState) => state.trivia.questionState.isAnswered);
  const isSubmited = useSelector((state: RootState) => state.trivia.questionState.isSubmited);
  const isCorrect = useSelector((state: RootState) => state.trivia.questionState.isCorrect);

  // array of indexes of currently selected answer(s)
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const questionCount = QUESTION_LIST.length;

  // update component to next question or final page if last question
  const increaseQuestion = () => {
    if (currentQuestionNum < questionCount - 1) {
      dispatch(resetQuestionState());
      setSelectedAnswers([]);
    } else {
      navigate(FINAL_PATH);
    }
  };

  // handle submit when multi question
  const handleSubmitMulti = () => {
    dispatch(setIsSubmited(true));
    // check that all answers exist in selected answers array
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
      // correct answer
      if (!didError) {
        dispatch(setIsCorrect(true));
        dispatch(incrementScore());
      }
    } else {
      dispatch(setIsCorrect(false));
    }
  };

  // handle submit non multi question.
  const handleSubmitRadio = () => {
    dispatch(setIsSubmited(true));
    // is selected index same as answer index
    if (selectedAnswers?.[0] === props.questionObj?.ANSWER_INDEX?.[0]) {
      dispatch(setIsCorrect(true));
      dispatch(incrementScore());
    }
  };

  // Render feedback message when submitted, correct or incorrect
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

  // update selected index array for non multi question
  const handleSelectRadio = (index: number) => {
    dispatch(setIsAnswered(true));
    setSelectedAnswers([index]);
  };

  // update selected index array for multi question
  const handleSelectCheckbox = (e: ChangeEvent<Element>, index: number) => {
    if ((e.target as HTMLInputElement).checked) {
      // selected index is pushed to array, enable submit button
      if (selectedAnswers.length + 1 === 1) {
        dispatch(setIsAnswered(true));
      }
      setSelectedAnswers((arr) => [...arr, index]);
    } else {
      if (selectedAnswers.length === 1) {
        dispatch(setIsAnswered(false));
      }
      setSelectedAnswers((arr) => arr.filter((ind) => ind !== index));
    }
  };

  // Render radio or checkbox answer options based on is_multi flag
  const renderAnswers = props.questionObj.QUESTION_OPTIONS.map((str, index) =>
    props.questionObj.IS_MULTI ? (
      <AnswerCheckbox
        handleChange={(e) => handleSelectCheckbox(e, index)}
        answerText={str}
        key={str}
        name={'checkbox'}
        isChecked={selectedAnswers.indexOf(index) !== -1}
        isEnabled={isSubmited}
      />
    ) : (
      <AnswerRadio
        handleChange={() => handleSelectRadio(index)}
        answerText={str}
        key={str}
        name={'radio'}
        isChecked={selectedAnswers.length ? selectedAnswers[0] === index : false}
        isEnabled={isSubmited}
      />
    )
  );

  return (
    <Fragment>
      <Text styleName="question__question-text" textString={props.questionObj.QUESTION_TEXT} />
      <div className="question__answer-container">{renderAnswers}</div>
      <div aria-live="polite">
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
      </div>
    </Fragment>
  );
};

export default Question;
