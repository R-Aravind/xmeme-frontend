import React from 'react';
import XMemes from './XMemes';

export const apiUrl = "http://127.0.0.1:8000/api";

function App() {
  
  return (
    <div>
      <header className="header">
        <h1 className="font-semibold">XMEME</h1>
      </header>
      <XMemes/>      
    </div>
  );
}

export default App;