import { CommandType } from '../../types';
import { helpCommand } from './helpCommand';
import { aboutCommand } from './aboutCommand';
import { clearCommand } from './clearCommand';
import { educationCommand } from './educationCommand';
import { experienceCommand } from './experienceCommand';
import { skillsCommand } from './skillsCommand';
import { projectsCommand } from './projectsCommand';
import { contactCommand } from './contactCommand';
import { lsCommand } from './lsCommand';
import { catCommand } from './catCommand';
import { whoamiCommand } from './whoamiCommand';
import { neofetchCommand } from './neofetchCommand';

// Main command list
export const commandList: CommandType[] = [
  helpCommand,
  clearCommand,
  aboutCommand,
  educationCommand,
  experienceCommand,
  skillsCommand,
  projectsCommand,
  contactCommand,
  lsCommand,
  catCommand,
  whoamiCommand,
  neofetchCommand,
];

// Export all commands
export {
  helpCommand,
  clearCommand,
  aboutCommand,
  educationCommand,
  experienceCommand,
  skillsCommand,
  projectsCommand,
  contactCommand,
  lsCommand,
  catCommand,
  whoamiCommand,
  neofetchCommand,
};