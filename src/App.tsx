/** @jsxImportSource @emotion/react */
import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import FinalPage from './components/final-page';
import QuestionPage from './components/question-page';
import { DEFAULT_PATH, FINAL_PATH } from './enums/route-enums';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import AnimationRoute from './components/animation-route';

export default function App() {
  // const location = useLocation()

  return (
    <Fragment>
      <Router>
        <AnimationRoute />
      </Router>
    </Fragment>
  );
}
