import { CommandOutput, CommandType } from '../types';
import { commandList } from './commands';
import { translations } from '../translations';
import { useLanguage } from '../contexts/LanguageContext';

export const handleCommand = (cmd: string, args: string[]): CommandOutput => {
  const { language } = useLanguage();
  const t = translations[language];

  if (cmd === 'welcome') {
    return {
      text: t.welcome,
      type: 'info',
    };
  }

  if (cmd === 'help' && args.length > 0 && args[0] === '--autocomplete') {
    const partial = args[1] || '';
    const suggestions = commandList
      .filter(
        (c) =>
          c.name.startsWith(partial) ||
          c.aliases?.some((a) => a.startsWith(partial))
      )
      .map((c) => c.name);

    return {
      text: suggestions.join('\n'),
      type: 'info',
    };
  }

  const command = commandList.find(
    (c) => c.name === cmd || c.aliases?.includes(cmd)
  );

  if (command) {
    return command.execute(args, language);
  }

  return {
    text: t.errors.commandNotFound.replace('{command}', cmd),
    type: 'error',
  };
};

export const registerCommand = (command: CommandType): void => {
  commandList.push(command);
};