import { CommandType } from '../../types';
import { resumeData } from '../../data/resumeData';

export const contactCommand: CommandType = {
  name: 'contact',
  description: 'Display my contact information',
  execute: () => {
    const { contact } = resumeData;

    let contactText = '===== Contact Information =====\n\n';

    contactText += `Email: ${contact.email}\n`;
    
    if (contact.phone) {
      contactText += `Phone: ${contact.phone}\n`;
    }
    
    if (contact.linkedin) {
      contactText += `LinkedIn: ${contact.linkedin}\n`;
    }
    
    if (contact.github) {
      contactText += `GitHub: ${contact.github}\n`;
    }
    
    if (contact.website) {
      contactText += `Website: ${contact.website}\n`;
    }

    return {
      text: contactText,
      type: 'info'
    };
  }
};