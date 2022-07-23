import React, { MouseEventHandler } from 'react';
interface ButtonProps {
  buttonText: string;
  handleClick: MouseEventHandler;
  isEnabled: boolean;
}
const Button = (props: ButtonProps) => {
  return (
    <button onClick={props.handleClick} disabled={!props.isEnabled}>
      {props.buttonText}
    </button>
  );
};

export default Button;
