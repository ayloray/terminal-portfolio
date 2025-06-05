import { CommandOutput, CommandType } from '../types';
import { commandList } from './commands';

// Function to handle commands
export const handleCommand = (cmd: string, args: string[]): CommandOutput => {
  // Special case for welcome message
  if (cmd === 'welcome') {
    return {
      text: `






      █████╗ ██╗   ██╗███████╗██╗  ██╗ █████╗ 
      ██╔══██╗╚██╗ ██╔╝██╔════╝██║  ██║██╔══██╗
      ███████║ ╚████╔╝ ███████╗███████║███████║
      ██╔══██║  ╚██╔╝  ╚════██║██╔══██║██╔══██║
      ██║  ██║   ██║   ███████║██║  ██║██║  ██║
      ╚═╝  ╚═╝   ╚═╝   ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝
                                               
                                                                                                                                                                                                                                                                                  
Welcome to my terminal portfolio! This is an interactive terminal-like interface where you can explore my profile.

Type 'help' to see a list of available commands.
Type 'about' to learn more about me.
`,
      type: 'info',
    };
  }

  // Handle autocomplete requests
  if (cmd === 'help' && args.length > 0 && args[0] === '--autocomplete') {
    const partial = args[1] || '';
    const suggestions = commandList
      .filter(
        (c) =>
          c.name.startsWith(partial) ||
          c.aliases?.some((a) => a.startsWith(partial))
      )
      .map((c) => c.name);

    return {
      text: suggestions.join('\n'),
      type: 'info',
    };
  }

  // Find the command in the command list
  const command = commandList.find(
    (c) => c.name === cmd || c.aliases?.includes(cmd)
  );

  // If command exists, execute it
  if (command) {
    return command.execute(args);
  }

  // Command not found
  return {
    text: `Command not found: ${cmd}\nType 'help' to see available commands.`,
    type: 'error',
  };
};

// Export command registration function
export const registerCommand = (command: CommandType): void => {
  commandList.push(command);
};
