import React, { useState }  from 'react';

import Text from './text';
import Answer from './answer';
import Button from './button';
import { BUTTON_TEXT } from '../enums/question-page-enums';
import QUESTION_LIST from '../enums/questions-and-answers-enums';


import {
  useNavigate
} from "react-router-dom";




const QuestionPage = () => {


  const [score, setScore] = useState(0);
  const [questionNum, setQuestionNum] = useState(0)
  const navigate = useNavigate();
  
  const increaseScore = () => {
    setScore(score+1);
  }
  
  
  const increaseQuestion = () => {

    
    if(questionNum < QUESTION_LIST.length-1){
      console.log('increasing q', questionNum, QUESTION_LIST.length)
      setQuestionNum(questionNum+1);
    } else {
      // go to final page
      navigate('/final')
    }
  }  


  return (
    <div>
      <Text textString={QUESTION_LIST[questionNum]?.QUESTION_TEXT}/>
      <Answer />
      <Button buttonText={BUTTON_TEXT} handleClick={increaseQuestion}/>
      {questionNum}
    </div>
  );
};

export default QuestionPage;
