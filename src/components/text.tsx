
import React  from 'react';

interface TextProps {
    textString: string;
}
const Text = (props: TextProps) => {
    return(
        <p>{props.textString}</p>
    )
}

export default Text;