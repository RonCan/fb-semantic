'use strict';

var _fb = require('fb');

var _db = require('./db');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FB = new _fb.Facebook({}); /* jshint esversion: 6 */

FB.setAccessToken('1661911667402870|QBkaCq53E8pvhw8u16y2yzG3vmo');

function loadPosts() {
  return FB.api('traversepakistan/feed', function (response) {
    _db.getDatabase.then(function (db) {
      var postsCollection = db.collection('posts');
      postsCollection.insert(response.data, function (err, result) {
        console.log(result);
      });
    });
  });
}

function loadComments() {
  _db.getDatabase.then(function (db) {
    var postsCollection = db.collection('posts');
    postsCollection.find().toArray(function (err, documents) {
      if (err) {
        console.error("Unable to fetch posts");
        return;
      } else {
        (function () {
          var commentsCollection = db.collection('comments');
          var totalResponses = 0;
          var fetchCommentsAndSave = function fetchCommentsAndSave(documents) {

            FB.api(documents.id + '/comments', function (response) {
              console.log(++totalResponses);
              if (response.data.length > 0) {
                commentsCollection.insert(response.data, function (err, result) {
                  console.log("here");
                  console.log(result);
                });
              }
            });
          };

          console.log(documents.length);
          _lodash2.default.each(documents, fetchCommentsAndSave);
        })();
      }
    });
  });
}

//loadComments();
//# sourceMappingURL=index.js.map