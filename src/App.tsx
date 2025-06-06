import React from 'react';
import Terminal from './components/Terminal';
import { LanguageProvider } from './contexts/LanguageContext';

function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-black">
        <Terminal />
      </div>
    </LanguageProvider>
  );
}

export default App;