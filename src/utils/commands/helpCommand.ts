import { CommandType } from '../../types';
import { commandList } from './index';

export const helpCommand: CommandType = {
  name: 'help',
  description: 'Display available commands and their descriptions',
  usage: 'help [command]',
  aliases: ['?', 'h'],
  execute: (args: string[]) => {
    // If a specific command is asked for
    if (args.length > 0) {
      const commandName = args[0];
      const command = commandList.find(
        cmd => cmd.name === commandName || cmd.aliases?.includes(commandName)
      );

      if (command) {
        let helpText = `Command: ${command.name}\n`;
        helpText += `Description: ${command.description}\n`;
        
        if (command.usage) {
          helpText += `Usage: ${command.usage}\n`;
        }
        
        if (command.aliases && command.aliases.length > 0) {
          helpText += `Aliases: ${command.aliases.join(', ')}\n`;
        }

        return {
          text: helpText,
          type: 'info'
        };
      } else {
        return {
          text: `Command '${commandName}' not found. Type 'help' to see all available commands.`,
          type: 'error'
        };
      }
    }

    // Default help menu
    let helpText = 'Available Commands:\n\n';
    
    commandList
      .sort((a, b) => a.name.localeCompare(b.name))
      .forEach(cmd => {
        helpText += `${cmd.name.padEnd(12)} - ${cmd.description}\n`;
      });

    helpText += '\nType \'help [command]\' to get more information about a specific command.';
    helpText += '\nUse TAB to autocomplete commands and UP/DOWN arrows to navigate command history.';

    return {
      text: helpText,
      type: 'info'
    };
  }
};