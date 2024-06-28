import React from 'react';
import TodoApp from './pages/todoApp';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';

function App(): JSX.Element {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<TodoApp />} />
          <Route path="/TodoApp" element={<TodoApp />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
