import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CategorySelection from './pages/CategorySelection';
import GamePlay from './pages/GamePlay';

const App = () => {

  return(
    <>
    <Router>
      <Routes>
        <Route path="/" element={<CategorySelection />} />
        <Route path="/game" element={<GamePlay />} />
      </Routes>
    </Router>
    </>
  )
}

export default App