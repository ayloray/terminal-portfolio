import React from 'react';
import { CommandOutput } from '../types';

interface TerminalOutputProps {
  output: CommandOutput;
}

const TerminalOutput: React.FC<TerminalOutputProps> = ({ output }) => {
  if (output.type === 'html') {
    return (
      <div 
        className="terminal-output" 
        dangerouslySetInnerHTML={{ __html: output.text }}
      />
    );
  }

  const getOutputClass = () => {
    switch (output.type) {
      case 'success':
        return 'output-success';
      case 'error':
        return 'output-error';
      case 'warning':
        return 'output-warning';
      case 'info':
        return 'output-info';
      default:
        return '';
    }
  };

  // Split by newlines to render each line separately
  const lines = output.text.split('\n');

  return (
    <div className="terminal-output">
      {lines.map((line, index) => (
        <div key={index} className={`output-text ${getOutputClass()}`}>
          {line}
        </div>
      ))}
    </div>
  );
};

export default TerminalOutput;