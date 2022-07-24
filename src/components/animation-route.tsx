import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import FinalPage from '../components/final-page';
import QuestionPage from '../components/question-page';
import { DEFAULT_PATH, FINAL_PATH } from '../enums/route-enums';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const AnimationRoute = () => {
  const location = useLocation();

  return (
    <TransitionGroup>
      <CSSTransition key={location.key} classNames="fade" timeout={5000}>
        <Routes location={location}>
          <Route path={DEFAULT_PATH} element={<QuestionPage />} />
          <Route path={FINAL_PATH} element={<FinalPage />} />
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default AnimationRoute;
