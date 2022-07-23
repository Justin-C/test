/** @jsxImportSource @emotion/react */
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import FinalPage from './components/final-page';
import QuestionPage from './components/question-page';
import { DEFAULT_PATH, FINAL_PATH } from './enums/route-enums';
export default function App() {
  return (
    <div>
      <Router>
        <div>
          <Routes>
            <Route path={DEFAULT_PATH} element={<QuestionPage />} />
            <Route path={FINAL_PATH} element={<FinalPage />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}
