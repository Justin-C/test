import React, { MouseEventHandler } from 'react';
interface ButtonProps {
  buttonText: string;
  handleClick: MouseEventHandler;
  isEnabled: boolean;
  styleName?: string;
}
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
