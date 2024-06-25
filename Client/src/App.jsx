import React from 'react';
import TodoApp from './todoApp';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';

function App() {
 
  return (
    <div>
      <Router>
      <Routes>
      <Route exact path="/" element={<TodoApp/>} />
        <Route path="/TodoApp" element={<TodoApp />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;