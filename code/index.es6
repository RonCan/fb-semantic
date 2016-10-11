/* jshint esversion: 6 */

import {Facebook, FacebookApiException} from 'fb';
import {closeDb, getDatabase} from './db';
import _ from 'lodash';



var FB= new Facebook({ });


FB.setAccessToken('1661911667402870|QBkaCq53E8pvhw8u16y2yzG3vmo');



function loadPosts(){
  return FB.api('traversepakistan/feed', (response)=> {
    getDatabase.then((db)=>{
      let postsCollection = db.collection('posts');
      postsCollection.insert(response.data, (err, result) =>{
        console.log(result);
      });
    });
  });
}

function loadComments(){
  getDatabase.then((db)=>{
    let postsCollection = db.collection('posts');
    postsCollection.find().toArray((err, documents)=>{
      if(err){
        console.error("Unable to fetch posts");
        return ;
      } else {
        let commentsCollection = db.collection('comments');
        let totalResponses = 0;
        let fetchCommentsAndSave = function (documents){

          FB.api(`${documents.id}/comments`, (response) =>{
            console.log(++totalResponses);
            if(response.data.length > 0){
              commentsCollection.insert(response.data, (err, result) =>{
                console.log("here");
                console.log(result);
              });
            }
          });
        };

        console.log(documents.length);
        _.each(documents, fetchCommentsAndSave);
      }
    });
  });
}

//loadComments();
