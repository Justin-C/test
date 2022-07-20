import React, { MouseEventHandler }  from 'react';

const clickHandler = () => {
    console.log('asdf')
}

interface ButtonProps {
  buttonText: string;
  handleClick: MouseEventHandler
}
const Button = (props: ButtonProps) => {
  return <button onClick={props.handleClick}>{props.buttonText}</button>;
};

export default Button;
