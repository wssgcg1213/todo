import assert from 'assert';
import store from '../lib/store';
import todo from '../lib/todo';

describe('todo.Store module', function () {
  it('should get store data and type is array', function () {
    "use strict";
    assert.strictEqual(Array.isArray(store.get()), true);
  });
  it('should set store data', function () {
    "use strict";
    var storeRawData = store.get();
    var success = store.set(storeRawData);
    assert.strictEqual(success, true);
  });
});

describe('todo core', function () {
  "use strict";
  var rawData;
  before (function () {
    rawData = store.get();
  });

  it ('should list all todos', function (done) {
    todo.list();
    // 没法测试啊 看看吧
    done();
  });

  it ('should add a todo', function () {
    var rawLen = rawData.length;
    todo.add("mocha test ins");
    assert.strictEqual(store.get().length, rawLen + 1);
  });

  it ('should remove a todo', function () {
    var rawData = store.get();
    var rawLen = rawData.length;
    var ids = rawData.map(function (obj) {
      return obj.id;
    });
    var lastId = ids[ids.length - 1];
    todo.del(lastId);
    assert.strictEqual(store.get().length, rawLen - 1);
  });

  after (function () {
    store.set(rawData);
  });
});
