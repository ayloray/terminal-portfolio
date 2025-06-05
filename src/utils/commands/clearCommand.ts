import { CommandType } from '../../types';

export const clearCommand: CommandType = {
  name: 'clear',
  description: 'Clear the terminal screen',
  aliases: ['cls'],
  execute: () => {
    // The actual clearing is handled in the Terminal component
    // This is just a dummy return value that gets intercepted
    return {
      text: '',
      type: 'success'
    };
  }
};