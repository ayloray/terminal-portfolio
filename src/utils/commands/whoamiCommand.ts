import { CommandType } from '../../types';
import { resumeData } from '../../data/resumeData';

export const whoamiCommand: CommandType = {
  name: 'whoami',
  description: 'Display the current user',
  execute: () => {
    return {
      text: resumeData.name,
      type: 'success'
    };
  }
};