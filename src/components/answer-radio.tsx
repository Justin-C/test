import React, { ChangeEventHandler } from 'react';
import Text from './text';
import '../styles/styles.scss';

interface AnswerRadioProps {
  answerText: string; // display text
  handleChange: ChangeEventHandler; // change handler
  isEnabled: boolean; // enabled or disabled
  isChecked: boolean; // checked value
  name: string; // name value
}

/**
 * Component that renders a radio input with text
 * @param props see AnswerRadioProps
 */
const AnswerRadio = (props: AnswerRadioProps) => {
  return (
    <label>
      <input
        type="radio"
        onChange={props.handleChange}
        value={props.answerText}
        disabled={props.isEnabled}
        checked={props.isChecked}
        name="radio"
      />
      <Text styleName="question__answer-text" textString={props.answerText} />
    </label>
  );
};

export default AnswerRadio;
