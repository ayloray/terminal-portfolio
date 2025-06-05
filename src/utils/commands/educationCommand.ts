import { CommandType } from '../../types';
import { resumeData } from '../../data/resumeData';

export const educationCommand: CommandType = {
  name: 'education',
  description: 'Display my educational background',
  aliases: ['edu'],
  execute: () => {
    const { education } = resumeData;

    if (education.length === 0) {
      return {
        text: 'No education data available.',
        type: 'error'
      };
    }

    let educationText = '===== Education =====\n\n';

    education.forEach((edu, index) => {
      educationText += `Institution: ${edu.institution}\n`;
      educationText += `Degree: ${edu.degree} in ${edu.field}\n`;
      educationText += `Period: ${edu.startDate} - ${edu.endDate}\n`;
      
      if (edu.description) {
        educationText += `Details: ${edu.description}\n`;
      }

      if (index < education.length - 1) {
        educationText += '\n-------------------\n\n';
      }
    });

    return {
      text: educationText,
      type: 'info'
    };
  }
};