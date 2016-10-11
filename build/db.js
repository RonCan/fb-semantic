'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sampleOb1 = exports.sampleOb = undefined;

var _mongodb = require('mongodb');

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* jshint esversion: 6 */

var url = 'mongodb://localhost:27017/fb-semantic';
var db = null;

function getDb() {
  // Use connect method to connect to the Server 
  return new _bluebird2.default(function (resolve, reject) {
    _mongodb.MongoClient.connect(url, function (err, dtb) {
      if (err) {
        reject(err);
      }
      console.log("Connected correctly to server");
      db = dtb;
      resolve(db);
    });
  });
}

function closeDb() {
  if (!db) db.close();
}

//var getDatabase = getDb();
var sampleOb = getDb();
var sampleOb1 = {};

exports.sampleOb = sampleOb;
exports.sampleOb1 = sampleOb1;
//# sourceMappingURL=db.js.map