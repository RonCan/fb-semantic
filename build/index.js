'use strict';

var _fb = require('fb');

var _db = require('./db');

/* jshint esversion: 6 */

var FB = new _fb.Facebook({});

FB.setAccessToken('1661911667402870|QBkaCq53E8pvhw8u16y2yzG3vmo');

FB.api('traversepakistan/feed', function (response) {
  var db = _db.getDatabase.then(function (db) {
    var posts = db.collection('posts');
    console.log(response);
    posts.insert(response.data, function (err, result) {
      console.log(result);
    });
    (0, _db.closeDb)();
  });
});

console.log("Here");
//# sourceMappingURL=index.js.map