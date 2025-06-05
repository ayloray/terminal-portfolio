import React, { useState, useRef, useEffect } from 'react';

interface CommandLineProps {
  command: string;
  readOnly: boolean;
  onEnter: (command: string) => void;
  onArrowUp: () => string | null;
  onArrowDown: () => string | null;
  onTabComplete: (partial: string) => string | null;
}

const CommandLine: React.FC<CommandLineProps> = ({ 
  command: initialCommand, 
  readOnly, 
  onEnter,
  onArrowUp,
  onArrowDown,
  onTabComplete
}) => {
  const [command, setCommand] = useState(initialCommand);
  const [cursorPosition, setCursorPosition] = useState(initialCommand.length);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!readOnly && inputRef.current) {
      inputRef.current.focus();
    }
  }, [readOnly]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (readOnly) return;

    switch (e.key) {
      case 'Enter':
        e.preventDefault();
        onEnter(command);
        setCommand('');
        setCursorPosition(0);
        break;
      case 'ArrowUp':
        e.preventDefault();
        const prevCommand = onArrowUp();
        if (prevCommand !== null) {
          setCommand(prevCommand);
          setCursorPosition(prevCommand.length);
        }
        break;
      case 'ArrowDown':
        e.preventDefault();
        const nextCommand = onArrowDown();
        if (nextCommand !== null) {
          setCommand(nextCommand);
          setCursorPosition(nextCommand.length);
        }
        break;
      case 'Tab':
        e.preventDefault();
        const completion = onTabComplete(command);
        if (completion) {
          setCommand(completion);
          setCursorPosition(completion.length);
        }
        break;
      case 'ArrowLeft':
        if (cursorPosition > 0) {
          setCursorPosition(cursorPosition - 1);
        }
        break;
      case 'ArrowRight':
        if (cursorPosition < command.length) {
          setCursorPosition(cursorPosition + 1);
        }
        break;
      case 'Home':
        setCursorPosition(0);
        break;
      case 'End':
        setCursorPosition(command.length);
        break;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (readOnly) return;
    setCommand(e.target.value);
    setCursorPosition(e.target.selectionStart || e.target.value.length);
  };

  const handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
    if (readOnly) return;
    setCursorPosition(inputRef.current?.selectionStart || 0);
  };

  // Display the command with cursor at the right position
  const displayCommand = () => {
    if (readOnly) return command;
    
    const beforeCursor = command.slice(0, cursorPosition);
    const afterCursor = command.slice(cursorPosition);
    
    return (
      <>
        {beforeCursor}
        <span className="cursor"></span>
        {afterCursor}
      </>
    );
  };

  return (
    <div className="command-line">
      <span className="prompt">$</span>
      {readOnly ? (
        <span>{command}</span>
      ) : (
        <div className="relative flex-1">
          <input
            ref={inputRef}
            type="text"
            className="user-input w-full"
            value={command}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onClick={handleClick}
            readOnly={readOnly}
            autoFocus={!readOnly}
            aria-label="Terminal input"
          />
          <div className="absolute top-0 left-0 text-white pointer-events-none">
            {displayCommand()}
          </div>
        </div>
      )}
    </div>
  );
};

export default CommandLine;