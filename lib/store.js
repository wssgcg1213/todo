/**
 * 存储
 */
import fs from 'graceful-fs';
import path from 'path';
import config from '../config';

const dataFilePath = path.join(config.storePath, config.storeFile);

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

export default {
  get: getStore,
  set: setStore
};
