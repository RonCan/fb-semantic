/* jshint esversion: 6 */


import {Facebook, FacebookApiException} from 'fb';
import {closeDb, getDatabase} from './db';



var FB= new Facebook({
});


FB.setAccessToken('1661911667402870|QBkaCq53E8pvhw8u16y2yzG3vmo');


FB.api('traversepakistan/feed', (response)=> {
  let db = getDatabase.then((db)=>{
    let posts = db.collection('posts');
    console.log(response);
    posts.insert(response.data, (err, result) =>{
      console.log(result);
    });
    closeDb();
  });
});

console.log("Here");
