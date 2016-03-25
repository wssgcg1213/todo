import config from '../config';
import fs from 'graceful-fs';

try {
  fs.readdirSync(config.storePath)
} catch (e) {
  fs.mkdirSync(config.storePath);
  console.log(`Storage directory created at ${config.storePath}`);
}
