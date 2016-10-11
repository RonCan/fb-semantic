/* jshint esversion: 6 */

import { MongoClient } from 'mongodb';
import Promise from 'bluebird';

let url = 'mongodb://localhost:27017/fb-semantic';
var db = null;

function getDb(){
  // Use connect method to connect to the Server 
  return new Promise(function(resolve, reject){
    MongoClient.connect(url, (err, dtb) => {
      if(err) { 
        reject(err);
      }
      console.log("Connected correctly to server");
      db = dtb;
      resolve(db);
    });
  });
}

function closeDb(){
  if(!db)
    db.close();
}

var getDatabase = getDb();

export {closeDb, getDatabase};
