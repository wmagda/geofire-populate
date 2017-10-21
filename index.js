/**
 * @Author: Wojciech Magda <wojciech>
 * @Date:   2017-10-14T13:25:56-06:00
 * @Last modified by:   wojciech
 * @Last modified time: 2017-10-21T12:06:47-06:00
 */

const firebase=require('firebase');
const GeoFire=require('geofire');
var Promise = require('promise');

function addLocations(locations){
  var firebaseRef = firebase.database().ref("locations");
  var geoFire = new GeoFire(firebaseRef);
  console.log(locations);
  return geoFire.set(locations).then(function() {
            // console.log("fish" + index + " initially set to [" + location + "]");
            console.log("Done:)")
            exit();
          });
}

function readJson() {
  firebase.initializeApp({
    apiKey: <api_key>,
    databaseURL: "https://<db>.firebaseio.com"
  });
  var ref = firebase.database().ref();
  // var firebaseRef = firebase.database().ref("locations");
  // var geoFire = new GeoFire(firebaseRef);



  // /once('value').then(function (snapshot) {
  ref.on('value', function (snapshot) {
    // console.log("done?");
    // console.log("children:",snapshot.getChildren());
      // console.log("val:",snapshot.val());
    var addressInfo = snapshot.val().AddressInfo;
    // console.log("addressInfo:",addressInfo)
    var db=snapshot.val();
    var locations={};
    var keys=Object.keys(db);
    var arrLength=keys.length;
    var itemsProcessed = 0;

    keys.forEach((key) => {
      var addressInfo = db[key].AddressInfo;
      if(addressInfo) {
        locations[key]=[parseFloat(addressInfo.Latitude), parseFloat(addressInfo.Longitude)];
      }
      itemsProcessed++;
      if(itemsProcessed === keys.length) {
        addLocations(locations);
        return;
      }
    })

  });
  // for(var i = 0; i < 55701;i++){
  //   ref.orderByKey().equalTo(i.toString()).on("child_added", function(snapshot) {
  //     console.log("i:", i)
  //   })
  // }


  // ref.orderByKey().on("child_added", function(snapshot) {
  //   // console.log(snapshot.val());
  //   if(snapshot.val().AddressInfo) {
  //     var addressInfo = snapshot.val().AddressInfo;
  //     // console.log("addressInfo:",addressInfo)
  //     geoFire.set(snapshot.key, [parseFloat(addressInfo.Latitude), parseFloat(addressInfo.Longitude)]);
  //     // return geoFire.set(snapshot.key, [parseFloat(addressInfo.Latitude), parseFloat(addressInfo.Longitude)]).then(function() {
  //     //       // console.log("fish" + index + " initially set to [" + location + "]");
  //     //       console.log("key processed:", snapshot.key)
  //     //     });
  //     return;
  //   }
  // });
}

readJson();

 // (function() {
 //   // Initialize the Firebase SDK
 //   firebase.initializeApp({
 //     apiKey: <apiKey>,
 //     databaseURL: "https://<db>.firebaseio.com"
 //   });
 //
 //   // Generate a random Firebase location
 //   var firebaseRef = firebase.database().ref().push();
 //
 //   // Create a new GeoFire instance at the random Firebase location
 //   var geoFire = new GeoFire(firebaseRef);
 //
 //   // Create the locations for each fish
 //   var fishLocations = [
 //     [-40, 159],
 //     [90, 70],
 //     [-46, 160],
 //     [0, 0]
 //   ];
 //
 //   // Set the initial locations of the fish in GeoFire
 //   console.log("*** Setting initial locations ***");
 //   var promises = fishLocations.map(function(location, index) {
 //     return geoFire.set("fish" + index, location).then(function() {
 //       console.log("fish" + index + " initially set to [" + location + "]");
 //     });
 //   });
 //
 //   // Once all the fish are in GeoFire, log a message that the user can now move fish around
 //   Promise.all(promises).then(function() {
 //     console.log("*** Creating GeoQuery ***");
 //     // Create a GeoQuery centered at fish2
 //     var geoQuery = geoFire.query({
 //       center: fishLocations[2],
 //       radius: 3000
 //     });
 //
 //     var onKeyEnteredRegistration = geoQuery.on("key_entered", function(key, location) {
 //       console.log(key + " entered the query. Hi " + key + "!");
 //     });
 //
 //     var onReadyRegistration = geoQuery.on("ready", function() {
 //       console.log("*** 'ready' event fired - cancelling query ***");
 //       geoQuery.cancel();
 //     })
 //   });
 //
 //
 //   /*************/
 //   /*  HELPERS  */
 //   /*************/
 //   /* Logs to the page instead of the console */
 //  //  function console.log(message) {
 //  //    var childDiv = document.createElement("div");
 //  //    var textNode = document.createTextNode(message);
 //  //    childDiv.appendChild(textNode);
 //  //    document.getElementById("log").appendChild(childDiv);
 //  //  }
 // })();
