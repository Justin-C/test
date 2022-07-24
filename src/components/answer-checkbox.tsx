import React, { ChangeEventHandler } from 'react';
import Text from './text';
import '../styles/allstyles.scss';

interface AnswerCheckboxProps {
  answerText: string;
  handleClick: ChangeEventHandler;
  isEnabled: boolean;
}
const AnswerCheckbox = (props: AnswerCheckboxProps) => {
  return (
    <label>
      <input
        type="checkbox"
        onChange={props.handleClick}
        value={props.answerText}
        disabled={props.isEnabled}
        name="checkbox"
      />
      <Text styleName="question__answer-text" textString={props.answerText} />
    </label>
  );
};

export default AnswerCheckbox;
