/** @jsxImportSource @emotion/react */
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import FinalPage from './components/final-page';
import QuestionPage from './components/question-page';
export default function App() {
  return (
    <div>
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/">questions</Link>
            </li>
            <li>
              <Link to="/final">final</Link>
            </li>
          </ul>

          <Routes>
            <Route path="/" element={<QuestionPage />} />
            <Route path="/final" element={<FinalPage />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}
