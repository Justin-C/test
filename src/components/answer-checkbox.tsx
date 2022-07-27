import React, { ChangeEventHandler } from 'react';
import Text from './text';
import '../styles/styles.scss';

interface AnswerCheckboxProps {
  answerText: string; // string displayed next to checkbox
  handleChange: ChangeEventHandler; // onchange handler for checkbox
  isEnabled: boolean; // enabled or disabled
  isChecked: boolean; // checked stated
  name: string; // name value
}
/**
 * Component that renders a checkbox with text displayed
 * @param props see AnswerCheckboxProps
 */
const AnswerCheckbox = (props: AnswerCheckboxProps) => {
  return (
    <label>
      <input
        type="checkbox"
        onChange={props.handleChange}
        value={props.answerText}
        disabled={props.isEnabled}
        checked={props.isChecked}
        name={props.name}
      />
      <Text styleName="question__answer-text" textString={props.answerText} />
    </label>
  );
};

export default AnswerCheckbox;
