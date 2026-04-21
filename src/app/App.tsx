import React, { useEffect } from 'react';
import HomePage from '../pages/HomePage';

const App: React.FC = () => {
  useEffect(() => {
    const backgroundContainer = document.getElementById('background-container');
    if (backgroundContainer) {
      backgroundContainer.style.display = 'none';
    }
  }, []);

  return <HomePage />;
};

export default App;
