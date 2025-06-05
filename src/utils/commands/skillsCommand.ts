import { CommandType } from '../../types';
import { resumeData } from '../../data/resumeData';

export const skillsCommand: CommandType = {
  name: 'skills',
  description: 'Display my technical skills',
  aliases: ['skill'],
  execute: () => {
    const { skills } = resumeData;

    if (skills.length === 0) {
      return {
        text: 'No skills data available.',
        type: 'error'
      };
    }

    let skillsText = '===== Technical Skills =====\n\n';

    skills.forEach(category => {
      skillsText += `${category.category}:\n`;
      skillsText += `  ${category.skills.join(', ')}\n\n`;
    });

    return {
      text: skillsText,
      type: 'info'
    };
  }
};