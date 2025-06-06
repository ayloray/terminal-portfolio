import React from 'react';
import Terminal from './components/Terminal';
import { LanguageProvider } from './contexts/LanguageContext';

function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-'https://www.kali.org/wallpapers/images/2024/kali-ferrofluid.jpg'>
        <Terminal />
      </div>
    </LanguageProvider>
  );
}

export default App;