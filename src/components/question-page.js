import React  from 'react';

import Question from './question';
import Button from './button';
import { BUTTON_TEXT } from '../enums/question-page-enums';

const QuestionPage = () => {
  return (
    <div>
      <Question />
      <Button buttonText={BUTTON_TEXT} />
      <p>asdf</p>
    </div>
  );
};

export default QuestionPage;
