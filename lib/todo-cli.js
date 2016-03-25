#!/usr/bin/env node
/**
 * TODO CLI
 */

import pkg from '../package.json';
import program from 'commander';
import 'colors';
import todo from './todo';
import init from 'init';

// init
init();

const version = pkg.version;
program.version(version, '-v, --version');

program
  .command('add [content]')
  .description('add a todo to your list;')
  .alias('a')
  .action(todo.add);

program.command('del [id]')
  .description('delete(finish) a todo from you list;')
  .alias('d')
  .alias('done')
  .alias('ok')
  .action(todo.del);

program.command('list')
  .description('list your todo list;')
  .alias('l')
  .action(todo.list);

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}
