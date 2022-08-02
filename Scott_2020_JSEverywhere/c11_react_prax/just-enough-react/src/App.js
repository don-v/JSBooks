import React from 'react';
import './App.css';

function App() {
  const name = 'Adam';
  const now = String(new Date());
  return (
    <div className="App">
      <p>Hello {name}!</p>
      <p>The current time is {now}</p>
      <p>Two plus two is {2+2}</p>
    </div>
  );
}

export default App;