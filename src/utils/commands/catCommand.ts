import { CommandType } from '../../types';
import { resumeData } from '../../data/resumeData';

// Mock file content based on the file name
const getFileContent = (filename: string) => {
  switch (filename) {
    case 'about.txt':
      return resumeData.summary;
    
    case 'contact.txt':
      const { contact } = resumeData;
      let contactText = `Email: ${contact.email}\n`;
      if (contact.phone) contactText += `Phone: ${contact.phone}\n`;
      if (contact.linkedin) contactText += `LinkedIn: ${contact.linkedin}\n`;
      if (contact.github) contactText += `GitHub: ${contact.github}\n`;
      if (contact.website) contactText += `Website: ${contact.website}\n`;
      return contactText;
    
    case 'skills.json':
      return JSON.stringify(resumeData.skills, null, 2);
    
    case 'projects/project1.md':
      const project1 = resumeData.projects[0] || null;
      if (!project1) return 'Project not found';
      return `# ${project1.title}\n\n${project1.description}\n\nTechnologies: ${project1.technologies.join(', ')}`;
    
    case 'projects/project2.md':
      const project2 = resumeData.projects[1] || null;
      if (!project2) return 'Project not found';
      return `# ${project2.title}\n\n${project2.description}\n\nTechnologies: ${project2.technologies.join(', ')}`;
    
    case 'projects/project3.md':
      const project3 = resumeData.projects[2] || null;
      if (!project3) return 'Project not found';
      return `# ${project3.title}\n\n${project3.description}\n\nTechnologies: ${project3.technologies.join(', ')}`;
    
    default:
      return null;
  }
};

export const catCommand: CommandType = {
  name: 'cat',
  description: 'Display the contents of a file',
  usage: 'cat <filename>',
  execute: (args: string[]) => {
    if (args.length === 0) {
      return {
        text: 'Usage: cat <filename>',
        type: 'error'
      };
    }

    const filename = args[0];
    const content = getFileContent(filename);

    if (content === null) {
      return {
        text: `cat: ${filename}: No such file or directory`,
        type: 'error'
      };
    }

    return {
      text: content,
      type: 'info'
    };
  }
};