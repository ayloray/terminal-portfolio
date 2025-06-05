import { CommandType } from '../../types';
import { commandList } from './index';

export const helpCommand: CommandType = {
  name: 'help',
  description: 'Toon beschikbare commando\'s en hun beschrijvingen',
  usage: 'help [commando]',
  aliases: ['?', 'h'],
  execute: (args: string[]) => {
    if (args.length > 0) {
      const commandName = args[0];
      const command = commandList.find(
        cmd => cmd.name === commandName || cmd.aliases?.includes(commandName)
      );

      if (command) {
        let helpText = `Commando: ${command.name}\n`;
        helpText += `Beschrijving: ${command.description}\n`;
        
        if (command.usage) {
          helpText += `Gebruik: ${command.usage}\n`;
        }
        
        if (command.aliases && command.aliases.length > 0) {
          helpText += `Aliassen: ${command.aliases.join(', ')}\n`;
        }

        return {
          text: helpText,
          type: 'info'
        };
      } else {
        return {
          text: `Commando '${commandName}' niet gevonden. Type 'help' om alle beschikbare commando's te zien.`,
          type: 'error'
        };
      }
    }

    let helpText = 'Beschikbare Commando\'s:\n\n';
    
    commandList
      .sort((a, b) => a.name.localeCompare(b.name))
      .forEach(cmd => {
        helpText += `${cmd.name.padEnd(12)} - ${cmd.description}\n`;
      });

    helpText += '\nType \'help [commando]\' voor meer informatie over een specifiek commando.';
    helpText += '\nGebruik TAB om commando\'s automatisch aan te vullen en PIJL OMHOOG/OMLAAG om door de commandogeschiedenis te navigeren.';

    return {
      text: helpText,
      type: 'info'
    };
  }
};