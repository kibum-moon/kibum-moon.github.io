import React, { useEffect } from 'react';
import HomeEditorial from './components/HomeEditorial';

const App: React.FC = () => {
  useEffect(() => {
    const backgroundContainer = document.getElementById('background-container');
    if (backgroundContainer) {
      backgroundContainer.style.display = 'none';
    }
  }, []);

  return <HomeEditorial onShowFullCV={() => {}} />;
};

export default App;
