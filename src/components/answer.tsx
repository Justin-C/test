import React, { ChangeEventHandler } from 'react';
import Text from './text';
import '../styles/allstyles.scss';

interface AnswerProps {
  answerText: string;
  handleClick: ChangeEventHandler;
}
const Answer = (props: AnswerProps) => {
  return (
    <label>
      <input type="radio" onChange={props.handleClick} value={props.answerText} />{' '}
      <Text styleName="answer-text" textString={props.answerText} />
    </label>
  );
};

export default Answer;
