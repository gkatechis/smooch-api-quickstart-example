'use strict';

// Imports
const express = require('express');
const bodyParser = require('body-parser');
const Smooch = require('smooch-core');

// Config
const PORT = 80;
const KEY_ID = 'app_5f04d0d83dfc64000c143f7c';
const SECRET = API_SECRET;

const smooch = new Smooch({
    keyId: KEY_ID,
    secret: SECRET,
    scope: 'app'
});

// Server https://expressjs.com/en/guide/routing.html
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


// Expose /messages endpoint to capture webhooks https://docs.smooch.io/rest/#webhooks-payload
app.post('/messages', function(req, res) {
  // console.log('webhook PAYLOAD:\n', JSON.stringify(req.body, null, 4));

  const appUserId = req.body.appUser._id;
  // Call REST API to send message https://docs.smooch.io/rest/#post-message

  const x = req.body

  if ((x.trigger === 'message:appUser') && (x.messages[0].source.type === 'messenger')) {

    console.log('REQUEST BODY:\n', JSON.stringify(x, null, 4)); 
    smooch.appUsers.sendMessage(appUserId, {
          type: 'text',
          text: 'Live long and prosper',
          role: 'appMaker'
      })
          .then((response) => {
              console.log('API RESPONSE:\n', response);
              res.end();
          })
          .catch((err) => {
              console.log('API ERROR:\n', err);
              res.end();
          });
  }
});

// Listen on port
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
