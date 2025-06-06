import { CommandType } from '../../types';
import { resumeData } from '../../data/resumeData';
import { translations } from '../../translations';

export const aboutCommand: CommandType = {
  name: 'about',
  description: 'Display information about me',
  aliases: ['info', 'bio'],
  execute: (args: string[], language: 'en' | 'nl') => {
    const { name, title, summary } = resumeData;
    const t = translations[language].about;

    const aboutText = `
${t.title}

${t.name}: ${name}
${t.title}: ${title}

${summary}

${t.viewMore.skills}
${t.viewMore.experience}
${t.viewMore.education}
${t.viewMore.projects}
${t.viewMore.contact}
`;

    return {
      text: aboutText,
      type: 'info',
    };
  },
};