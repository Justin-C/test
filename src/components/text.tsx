import React from 'react';
import '../styles/allstyles.scss';

interface TextProps {
  textString: string;
  styleName?: string;
}
const Text = (props: TextProps) => {
  return <p className={`${props.styleName} text--default`}>{props.textString}</p>;
};

export default Text;
