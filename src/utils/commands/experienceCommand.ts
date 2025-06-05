import { CommandType } from '../../types';
import { resumeData } from '../../data/resumeData';

export const experienceCommand: CommandType = {
  name: 'experience',
  description: 'Display my work experience',
  aliases: ['exp', 'work'],
  execute: () => {
    const { experience } = resumeData;

    if (experience.length === 0) {
      return {
        text: 'No experience data available.',
        type: 'error'
      };
    }

    let experienceText = '===== Work Experience =====\n\n';

    experience.forEach((exp, index) => {
      experienceText += `Company: ${exp.company}\n`;
      experienceText += `Position: ${exp.position}\n`;
      experienceText += `Period: ${exp.startDate} - ${exp.endDate}\n`;
      experienceText += 'Responsibilities:\n';
      
      exp.description.forEach(desc => {
        experienceText += `  • ${desc}\n`;
      });
      
      if (exp.technologies) {
        experienceText += `Technologies: ${exp.technologies.join(', ')}\n`;
      }

      if (index < experience.length - 1) {
        experienceText += '\n-------------------\n\n';
      }
    });

    return {
      text: experienceText,
      type: 'info'
    };
  }
};