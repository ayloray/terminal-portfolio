import React from 'react';
import { Terminal } from 'lucide-react';
import LanguageSwitch from './LanguageSwitch';
import { useLanguage } from '../contexts/LanguageContext';

const TerminalHeader: React.FC = () => {
  const { language } = useLanguage();

  return (
    <div className="terminal-header">
      <div className="terminal-controls">
        <div className="terminal-control close"></div>
        <div className="terminal-control minimize"></div>
        <div className="terminal-control maximize"></div>
      </div>
      <div className="terminal-title flex items-center">
        <Terminal className="w-8 h-8 mr-8" />
        <span>aysha@amsterdam ~ </span>
      </div>
      <LanguageSwitch />
    </div>
  );
};

export default TerminalHeader;