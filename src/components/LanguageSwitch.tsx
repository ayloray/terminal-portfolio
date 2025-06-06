import React from 'react';
import { Languages } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const LanguageSwitch: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <button
      onClick={() => setLanguage(language === 'nl' ? 'en' : 'nl')}
      className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white transition-colors"
      aria-label="Switch language"
    >
      <Languages className="w-4 h-4" />
      <span>{language === 'nl' ? 'EN' : 'NL'}</span>
    </button>
  );
};

export default LanguageSwitch;