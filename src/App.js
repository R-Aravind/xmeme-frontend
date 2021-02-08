import React from 'react';
import { MemeForm } from './MemeForm';
import { Timeline } from './Timeline';


export const apiUrl = "http://127.0.0.1:8000/api";

function App() {
  
  return (
    <div>
      <MemeForm/>
      <Timeline/>
    </div>
  );
}

export default App;