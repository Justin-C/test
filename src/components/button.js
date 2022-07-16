import React  from 'react';

const clickHandler = () => {
    console.log('asdf')
}
const Button = (props) => {
  return <button onClick={clickHandler}>{props.buttonText}</button>;
};

export default Button;
