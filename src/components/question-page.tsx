import React, { useEffect, useState } from 'react';

import Text from './text';
import Answer from './answer';
import Button from './button';
import {
  BUTTON_TEXT,
  BUTTON_TEXT_FINAL_QUESTION,
  CORRECT_ANSWER_MESSAGE,
  QUESTION_COUNT
} from '../enums/question-page-enums';
import QUESTION_LIST from '../enums/questions-and-answers-enums';

import { useNavigate } from 'react-router-dom';

const QuestionPage = () => {
  const [score, setScore] = useState(0);
  const [questionNum, setQuestionNum] = useState(0);
  const [complete, setComplete] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const navigate = useNavigate();

  const increaseScore = () => {
    setScore(score + 1);
  };

  const increaseQuestion = () => {
    if (questionNum < QUESTION_LIST.length - 1) {
      setComplete(false);
      setCorrect(false);
      setQuestionNum(questionNum + 1);
      setSelectedAnswers([]);
    } else {
      navigate('/final');
    }
  };

  useEffect(() => {
    if (selectedAnswers.length === QUESTION_LIST[questionNum].ANSWER_INDEX.length) {
      setComplete(true);
      let wrongFlag = false;
      for (const x of QUESTION_LIST[questionNum].ANSWER_INDEX) {
        if (selectedAnswers.indexOf(QUESTION_LIST[questionNum].QUESTION_OPTIONS[x]) === -1) {
          wrongFlag = true;
        }
      }
      if (!wrongFlag) {
        setCorrect(true);
        increaseScore();
      }
    }
  }, [selectedAnswers]);

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedAnswers((prev) => [...prev, e.target.value]);
  };

  const renderAnswers = QUESTION_LIST[questionNum].QUESTION_OPTIONS.map((str) => (
    <Answer handleClick={handleSelect} answerText={str} key={str} isEnabled={complete} />
  ));

  const renderComplete =
    complete &&
    (correct ? <Text textString={CORRECT_ANSWER_MESSAGE} /> : <Text textString="wrong anwswer" />);

  return (
    <div>
      {/* move to a const??? */}
      <Text
        styleName="question-count"
        textString={QUESTION_COUNT(questionNum + 1, QUESTION_LIST.length)}
      />
      <Text styleName="score-count" textString={score.toString()} />
      <Text styleName="question-text" textString={QUESTION_LIST[questionNum]?.QUESTION_TEXT} />
      {renderAnswers}
      {renderComplete}
      <br />
      <Button
        buttonText={
          questionNum === QUESTION_LIST.length - 1 ? BUTTON_TEXT_FINAL_QUESTION : BUTTON_TEXT
        }
        handleClick={increaseQuestion}
      />
    </div>
  );
};

export default QuestionPage;
