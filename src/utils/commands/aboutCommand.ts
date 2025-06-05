import { CommandType } from '../../types';
import { resumeData } from '../../data/resumeData';

export const aboutCommand: CommandType = {
  name: 'about',
  description: 'Display information about me',
  aliases: ['info', 'bio'],
  execute: () => {
    const { name, title, summary } = resumeData;

    const aboutText = `
===== About Me =====

Name: ${name}
Title: ${title}

${summary}

Type 'skills' to see my technical skills
Type 'experience' to see my work experience
Type 'education' to see my educational background
Type 'projects' to see my projects
Type 'contact' to see my contact information
`;

    return {
      text: aboutText,
      type: 'info',
    };
  },
};
