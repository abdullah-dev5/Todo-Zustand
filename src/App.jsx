import React from 'react';
import Column from './components/Column';

function App() {
  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-start space-x-4 p-4">
      <Column state="PLANNED" />
      <Column state="ONGOING" />
      <Column state="DONE" />
    </div>
  );
}

export default App;
