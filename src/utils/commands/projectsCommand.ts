import { CommandType } from '../../types';
import { resumeData } from '../../data/resumeData';

export const projectsCommand: CommandType = {
  name: 'projects',
  description: 'Display my projects',
  aliases: ['project', 'proj'],
  execute: () => {
    const { projects } = resumeData;

    if (projects.length === 0) {
      return {
        text: 'No projects data available.',
        type: 'error'
      };
    }

    let projectsText = '===== Projects =====\n\n';

    projects.forEach((project, index) => {
      projectsText += `Title: ${project.title}\n`;
      projectsText += `Description: ${project.description}\n`;
      projectsText += `Technologies: ${project.technologies.join(', ')}\n`;
      
      if (project.link) {
        projectsText += `Demo: ${project.link}\n`;
      }
      
      if (project.githubLink) {
        projectsText += `GitHub: ${project.githubLink}\n`;
      }

      if (index < projects.length - 1) {
        projectsText += '\n-------------------\n\n';
      }
    });

    return {
      text: projectsText,
      type: 'info'
    };
  }
};