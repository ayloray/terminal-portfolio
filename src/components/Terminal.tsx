import React, { useState, useRef, useEffect } from 'react';
import TerminalHeader from './TerminalHeader';
import CommandLine from './CommandLine';
import TerminalOutput from './TerminalOutput';
import { CommandHistoryType } from '../types';
import { handleCommand } from '../utils/commandHandler';
import { useLanguage } from '../contexts/LanguageContext';

const Terminal: React.FC = () => {
  const [commandHistory, setCommandHistory] = useState<CommandHistoryType[]>([]);
  const [inputHistory, setInputHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const terminalBodyRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();

  // Initial welcome message
  useEffect(() => {
    const welcomeOutput = handleCommand('welcome', [], language);
    setCommandHistory([{ command: 'welcome', output: welcomeOutput }]);
  }, [language]);

  // Auto-scroll to bottom when new commands are added
  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [commandHistory]);

  const executeCommand = (command: string) => {
    // Skip empty commands
    if (!command.trim()) return;

    // Parse command and arguments
    const args = command.trim().split(' ');
    const cmd = args.shift()?.toLowerCase() || '';

    // Process command
    const output = handleCommand(cmd, args, language);

    // Update history
    setCommandHistory([...commandHistory, { command, output }]);
    
    // Add to input history for up/down navigation
    if (!inputHistory.includes(command)) {
      setInputHistory([command, ...inputHistory]);
    }
    
    // Reset history index
    setHistoryIndex(-1);
  };

  const clearTerminal = () => {
    setCommandHistory([]);
  };

  const handleHistoryNavigation = (direction: 'up' | 'down') => {
    if (inputHistory.length === 0) return null;

    let newIndex = historyIndex;
    
    if (direction === 'up') {
      newIndex = Math.min(newIndex + 1, inputHistory.length - 1);
    } else {
      newIndex = Math.max(newIndex - 1, -1);
    }
    
    setHistoryIndex(newIndex);
    
    return newIndex >= 0 ? inputHistory[newIndex] : '';
  };

  return (
    <div className="terminal-window">
      <TerminalHeader />
      <div className="terminal-body" ref={terminalBodyRef}>
        {commandHistory.map((item, index) => (
          <div key={index}>
            {item.command !== 'welcome' && (
              <CommandLine 
                command={item.command} 
                readOnly={true} 
                onEnter={() => {}} 
                onArrowUp={() => null}
                onArrowDown={() => null}
                onTabComplete={() => null}
              />
            )}
            <TerminalOutput output={item.output} />
          </div>
        ))}
        <CommandLine 
          command="" 
          readOnly={false} 
          onEnter={executeCommand} 
          onArrowUp={() => handleHistoryNavigation('up')}
          onArrowDown={() => handleHistoryNavigation('down')}
          onTabComplete={(partial) => {
            const suggestions = handleCommand('help', ['--autocomplete', partial], language).text
              .split('\n')
              .filter(s => s.trim().length > 0);
            
            return suggestions.length === 1 ? suggestions[0] : null;
          }}
        />
      </div>
    </div>
  );
};

export default Terminal;