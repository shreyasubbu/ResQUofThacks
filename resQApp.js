var UI = require('ui');
var ajax = require('ajax');
var wind = new UI.Window();
//var URL = 'https://api.twilio.com/2010-04-01/Accounts/*accountSid here*/Messages.json' ;
var Vibe = require('ui/vibe'); 

var lat;
var lon;

var locationOptions = 
    {
      enableHighAccuracy: true, 
      maximumAge: 10000, 
      timeout: 10000
    };


function locationSuccess(pos) {
  console.log('lat = ' + pos.coords.latitude + ' lon= ' + pos.coords.longitude);
  lat = pos.coords.latitude;
  lon = pos.coords.longitude;
  //var lat = 5;
  //var lon = 7;
  //card.subtitle('latitude = ' + lat + 'longitude = ' + lon);
  //card.show();
    
  var toNumber = '*emergency contact number*';
  var fromNumber = '*Twilio account number*';
  var textBody = 'Help me! My coordinates are: ' + lat + ','+ lon;
  sendText (toNumber, fromNumber, textBody) ;
  Vibe.vibrate('long');
}

function locationError(err) {
  console.log('location error (' + err.code + '): ' + err.message);
}

Pebble.addEventListener('ready', function () 
{
  /*wind.on('click', 'up', function(){ */
  wind.on('click', 'up', function(){
    console.log('Running!');
    // Make an asynchronous request
    navigator.geolocation.getCurrentPosition(locationSuccess, locationError, locationOptions);
  });
  wind.show();
});


// Define the handler before showing.
wind.on('show', function() {
  console.log('Window is shown!');
});

/*wind.on('click', 'up', function(){
    console.log('Running!');
  // Make an asynchronous request
  navigator.geolocation.getCurrentPosition(locationSuccess, locationError, locationOptions);
  });*/

function sendText (toNumber, fromNumber, textBody) {
  ajax(
    {
      url:URL,
      method: "POST",
      data : {
        To: toNumber,
        From: fromNumber,
        Body: textBody
      },
      headers: {
        Authorization: "Basic " + "*authToken converted to base 64 format*"
      }
    }, function (err, res) {
      console.log("Success", err, res);
    }, function (err, res) {
      console.log("error", err, res);
    }
  );  
}