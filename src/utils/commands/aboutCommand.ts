import { CommandType } from '../../types';
import { resumeData } from '../../data/resumeData';

export const aboutCommand: CommandType = {
  name: 'about',
  description: 'Toon informatie over mij',
  aliases: ['info', 'bio'],
  execute: () => {
    const { name, title, summary } = resumeData;

    const aboutText = `
===== Over Mij =====

Naam: ${name}
Titel: ${title}

${summary}

Type 'skills' om mijn technische vaardigheden te zien
Type 'experience' om mijn werkervaring te zien
Type 'education' om mijn opleiding te zien
Type 'projects' om mijn projecten te zien
Type 'contact' om mijn contactgegevens te zien
`;

    return {
      text: aboutText,
      type: 'info',
    };
  },
};