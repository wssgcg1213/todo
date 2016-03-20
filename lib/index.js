#!/usr/bin/env node
/**
 * TODO CLI
 */

import pkg from '../package.json';
import config from '../config';
import program from 'commander';
import colors from 'colors';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(config.storePath, config.storeFile);
try {
  fs.readdirSync(config.storePath)
} catch (e) {
  fs.mkdirSync(config.storePath);
  console.log(`Storage directory created at ${config.storePath}`);
}

function getStore () {
  let fileData;
  try {
    fileData = fs.readFileSync(dataFilePath);
  } catch (e) {
    fs.appendFileSync(dataFilePath, '[]');
    return [];
  }
  return JSON.parse(fileData);
}

function setStore (newData) {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(newData));
  } catch (e) {
    console.log(e);
    return false;
  }
  return true;
}

const todo = {
  add (content) {
    if (!content) {
      return console.log('    Nothing todo?'.red);
    }
    const fileData = getStore();
    const newId = fileData.length === 0 ? 1 : fileData[fileData.length - 1]['id'] + 1;
    fileData.push({
      id: newId,
      content
    });
    setStore(fileData);
    console.log(`   Successfully added a todo!`.green);
    console.log(`   Your todo id is ${newId}.`);
    console.log(`   You can del you todo with \`todo del ${newId}\`.`);
    console.log(`   Or show todolist with \`todo list\`.`);
  },

  del (id) {
    const fileData = getStore();
    const newData = fileData.filter(obj => id != obj.id);
    let error;
    if (error = setStore(newData)) {
      console.log(`   Successfully deleted a todo! Id is ${id}`.green);
    } else {
      console.log(`   Unsuccessfully deleted a todo! Id is ${id}`.yellow);
      console.log(`   with error: ${error}`.yellow);
    }
  },

  list () {
    const fileData = getStore();

    function pad (str, len, padWith = ' ') {
      str = ('' + str).split('');
      for (let i = 0; i < len; i ++) {
        str[i] = str[i] || padWith;
      }
      return str.join('');
    }
    if (fileData.length === 0) {
      return console.log(`   You have nothings todo!!!`.green);
    }

    console.log(`   You have ${fileData.length} things todo!!!`);
    console.log(' ');
    console.log(`   Id     | Content`.cyan);
    console.log(`   --------`);
    fileData.forEach(obj => {
      console.log(`   ${pad(obj.id, 7)}| ${obj.content}`.yellow);
    });
    console.log(' ');
  }
};

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


export default todo;
