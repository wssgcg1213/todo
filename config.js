var os = require('os');
var path = require('path');
var tmpDir = os.tmpdir();
var storeFile = 'todolist.json';

module.exports = {
  storePath: tmpDir,
  storeFile: storeFile,
  storeFullPath: path.join(tmpDir, storeFile)
};
