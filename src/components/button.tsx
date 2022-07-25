import React, { MouseEventHandler } from 'react';
import '../styles/styles.scss';

interface ButtonProps {
  buttonText: string; // text displayed in button
  handleClick: MouseEventHandler; // Click handler
  isEnabled: boolean; // enabled or disabled
  styleName?: string; // style classname or classnames
}

/**
 * Button component
 * @param props see ButtonProps
 */
const Button = (props: ButtonProps) => {
  return (
    <button
      className={`${props.styleName} button`}
      onClick={props.handleClick}
      disabled={!props.isEnabled}
    >
      {props.buttonText}
    </button>
  );
};

export default Button;
