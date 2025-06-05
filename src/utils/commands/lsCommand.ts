import { CommandType } from '../../types';

// Mock file system structure
const fileSystem = {
  'about.txt': 'Information about me',
  'resume.pdf': 'My resume in PDF format',
  'projects/': {
    'project1.md': 'Secure File Encryption Tool',
    'project2.md': 'Network Intrusion Detection System',
    'project3.md': 'Web Application Vulnerability Scanner',
  },
  'skills.json': 'My technical skills',
  'contact.txt': 'My contact information',
  'certificates/': {
    'cert1.pdf': 'Security+ Certification',
    'cert2.pdf': 'Ethical Hacking Certification',
  }
};

export const lsCommand: CommandType = {
  name: 'ls',
  description: 'List directory contents',
  usage: 'ls [directory]',
  aliases: ['dir', 'll'],
  execute: (args: string[]) => {
    const path = args[0] || '';
    
    // Handle root directory
    if (!path) {
      const items = Object.keys(fileSystem);
      const directories = items.filter(item => item.endsWith('/'));
      const files = items.filter(item => !item.endsWith('/'));
      
      let output = '';
      
      directories.forEach(dir => {
        output += `\x1b[34m${dir}\x1b[0m\n`;
      });
      
      files.forEach(file => {
        output += `${file}\n`;
      });
      
      return {
        text: output || 'Directory is empty.',
        type: 'info'
      };
    }
    
    // Handle directories
    if (path === 'projects/' || path === 'projects') {
      const items = Object.keys(fileSystem['projects/']);
      return {
        text: items.join('\n') || 'Directory is empty.',
        type: 'info'
      };
    }
    
    if (path === 'certificates/' || path === 'certificates') {
      const items = Object.keys(fileSystem['certificates/']);
      return {
        text: items.join('\n') || 'Directory is empty.',
        type: 'info'
      };
    }
    
    return {
      text: `ls: cannot access '${path}': No such file or directory`,
      type: 'error'
    };
  }
};