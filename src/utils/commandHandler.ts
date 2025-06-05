import { CommandOutput, CommandType } from '../types';
import { commandList } from './commands';

export const handleCommand = (cmd: string, args: string[]): CommandOutput => {
  if (cmd === 'welcome') {
    return {
      text: `






  .---.-.--.--.-----.|  |--.---.-.
  |  _  |  |  |__ --||     |  _  |
  |___._|___  |_____||__|__|___._|
        |_____|      


                                               
                                                                                                                                                                                                                                                                                  
Welkom bij mijn terminal portfolio! Dit is een interactieve terminal-interface waar je mijn profiel kunt verkennen.

Type 'help' om een lijst van beschikbare commando's te zien.
Type 'about' om meer over mij te leren.
`,
      type: 'info',
    };
  }

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

  const command = commandList.find(
    (c) => c.name === cmd || c.aliases?.includes(cmd)
  );

  if (command) {
    return command.execute(args);
  }

  return {
    text: `Commando niet gevonden: ${cmd}\nType 'help' om beschikbare commando's te zien.`,
    type: 'error',
  };
};

export const registerCommand = (command: CommandType): void => {
  commandList.push(command);
};
