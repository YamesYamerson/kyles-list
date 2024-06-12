import React from 'react';
import KylesPage from './pages/KylesPage';
import medialist from './assets/data/medialist.json'; // Adjust the path if necessary

function App() {
  return (
    <div>
      <KylesPage data={medialist} />
    </div>
  );
}

export default App;
