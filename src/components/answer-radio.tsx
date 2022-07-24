import React, { ChangeEventHandler } from 'react';
import Text from './text';
import '../styles/allstyles.scss';

interface AnswerRadioProps {
  answerText: string;
  handleClick: ChangeEventHandler;
  isEnabled: boolean;
}
const AnswerRadio = (props: AnswerRadioProps) => {
  return (
    <label>
      <input
        type="radio"
        onChange={props.handleClick}
        value={props.answerText}
        disabled={props.isEnabled}
        name="radio"
      />
      <Text styleName="question__answer-text" textString={props.answerText} />
    </label>
  );
};

export default AnswerRadio;
