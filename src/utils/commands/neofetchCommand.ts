import { CommandType } from '../../types';
import { resumeData } from '../../data/resumeData';

export const neofetchCommand: CommandType = {
  name: 'neofetch',
  description: 'Display system information in a visually pleasing way',
  aliases: ['fetch'],
  execute: () => {
    const { name, title, skills } = resumeData;
    
    // Get primary skills (first 5 from each category)
    const primarySkills = skills.slice(0, 3).flatMap(category => 
      category.skills.slice(0, 2)
    ).join(', ');
    
    // ASCII art representation (simplified)
    const asciiArt = `
      \\\\\\\\\\\\\\\\      
     ////////////     
    ////      \\\\\\\\    
   ////        \\\\\\\\   
  ////          \\\\\\\\  
 ////            \\\\\\\\ 
////              \\\\\\\\
`;

    const systemInfo = `
${name} @ portfolio
---------------------------
OS: Terminal OS
Host: Web Browser
Kernel: JavaScript v18.x
Uptime: ${Math.floor(Math.random() * 24)} hours, ${Math.floor(Math.random() * 60)} mins
Packages: ${Math.floor(Math.random() * 1000)} (npm)
Shell: React Terminal
Resolution: Dynamic
Terminal: Virtual Console
CPU: Browser Engine
GPU: WebGL Renderer
Memory: ${Math.floor(Math.random() * 8) + 2}GB / 16GB
Title: ${title}
Skills: ${primarySkills}
`;

    // Combine ASCII art and system info side by side
    const lines1 = asciiArt.split('\n');
    const lines2 = systemInfo.split('\n');
    const maxLines = Math.max(lines1.length, lines2.length);
    
    let result = '';
    for (let i = 0; i < maxLines; i++) {
      const line1 = i < lines1.length ? lines1[i] : '';
      const line2 = i < lines2.length ? lines2[i] : '';
      result += line1.padEnd(20) + line2 + '\n';
    }

    return {
      text: result,
      type: 'info'
    };
  }
};