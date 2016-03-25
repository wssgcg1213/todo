/**
 * TODO CORE
 */
import store from './store';

/**
 * right-pad 字符串填充
 * @param str
 * @param len
 * @param padWith
 * @returns {string}
 */
function pad (str, len, padWith = ' ') {
  str = ('' + str).split('');
  for (let i = 0; i < len; i ++) {
    str[i] = str[i] || padWith;
  }
  return str.join('');
}

const todo = {
  add (content) {
    if (!content) {
      return console.log('    Nothing todo?'.red);
    }
    const fileData = store.get();
    const newId = fileData.length === 0 ? 1 : fileData[fileData.length - 1]['id'] + 1;
    fileData.push({
      id: newId,
      content
    });
    store.set(fileData);
    console.log(`   Successfully added a todo!`.green);
    console.log(`   Your todo id is ${newId}.`);
    console.log(`   You can del you todo with \`todo del ${newId}\`.`);
    console.log(`   Or show todolist with \`todo list\`.`);
  },

  del (id) {
    const fileData = store.get();
    const newData = fileData.filter(obj => id != obj.id);
    let error;
    if (error = store.set(newData)) {
      console.log(`   Successfully deleted a todo! Id is ${id}`.green);
    } else {
      console.log(`   Unsuccessfully deleted a todo! Id is ${id}`.yellow);
      console.log(`   with error: ${error}`.yellow);
    }
  },

  list () {
    const fileData = store.get();
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

export default todo;
