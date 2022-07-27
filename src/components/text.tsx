import React from 'react';
import '../styles/styles.scss';

interface TextProps {
  textString: string; // text string
  styleName?: string; // css classnames to append
}

/**
 * Text Component to display text
 * @param props see TextProps
 */
const Text = (props: TextProps) => {
  return <p className={`${props.styleName} text--default`}>{props.textString}</p>;
};

export default Text;
