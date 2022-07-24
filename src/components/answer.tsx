import React, { ChangeEventHandler } from 'react';
import Text from './text';
import '../styles/allstyles.scss';

interface AnswerProps {
  answerText: string;
  handleClick: ChangeEventHandler;
  isEnabled: boolean;
}
const Answer = (props: AnswerProps) => {
  return (
    <label>
      <input
        type="radio"
        onChange={props.handleClick}
        value={props.answerText}
        disabled={props.isEnabled}
        name="asdf"
      />
      <Text styleName="question__answer-text" textString={props.answerText} />
    </label>
  );
};

export default Answer;
