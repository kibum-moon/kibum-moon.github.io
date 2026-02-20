import React, { useState } from 'react';
import Header from './components/Header';
import Home from './components/Home';
import Research from './components/Research';
import CV from './components/CV';
import Blog from './components/Blog';

import Footer from './components/Footer';
import CVPage from './components/CVPage';

const App: React.FC = () => {
  const [showFullCV, setShowFullCV] = useState(false);

  if (showFullCV) {
    return <CVPage onBack={() => setShowFullCV(false)} />;
  }

  return (
    <div className="font-sans text-text-light">
      <Header />
      <main>
        <Home />
        <Blog />
        <Research />
        <CV onShowFullCV={() => setShowFullCV(true)} />
      </main>
      <Footer />
    </div>
  ); 
};

export default App;