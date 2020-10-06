'use strict';

const functions = require('firebase-functions');
const { dialogflow } = require('actions-on-google');

const app = dialogflow();

var place;
var massage;

app.intent("Today's weather", conv => {
  conv.json(
    JSON.stringify({
      "fulfillmentText": "東京ですかい大阪ですかい" 
    })
  );
});

app.intent("Today's weather - custom", (conv, {Place}) => {
  placeAnswer(Place);
  conv.json(
    JSON.stringify({
      "fulfillmentText": massage
    })
  );
});

app.intent("Today's weather - custom-2", (conv, {Place}) => {
  massage = "大阪の天気は晴れです";
  conv.json(
    JSON.stringify({
      "fulfillmentText": massage
    })
  );
});

function placeAnswer(place){
  if (place == 'Tokyo'){
     massage = "東京の天気は曇りです";
  } else {
    massage = "error";
  }
}

exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);