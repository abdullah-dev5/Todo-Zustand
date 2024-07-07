import React from 'react';
import Column from './components/Column';

function App() {
  return (
    <div className="bg-gray min-h-screen flex justify-center items-start">
      <Column state="PLANNED" />
      <Column state="ONGOING" />
      <Column state="DONE" />
    </div>
  );
}

export default App;
