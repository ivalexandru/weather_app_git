const request = require("postman-request");

// =====  helper func ======
// encodeURIComponent ajuta atunci cand cineva cauta caractere 'speciale'
// de ex daca nu ai pune functia, daca cineva cauta semnulIntrebarii, iei crash

//pt a face func cat mai flexibila, deleg implementarea functiei callback
//astfel functia mare (geocode) poate face mai multe lucruri

//in caz de error, js va seta automat undefined pt response
//dar l-am scris ad labam pt claritate

// features e din api..
const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoiY29kZW1vbmtleTg5ODk5ODkiLCJhIjoiY2p6MWQ0OHR4MDk4bDNkbnJnYWdoODZjbiJ9.sHPTh_5b4gCpYQGWxXJBJA&limit=1";

  request({ url: url, json: true }, (error, { body }) => {
    if (error) {
      callback("unable to conn to location services", undefined);
    } else if (body.features === undefined || body.features.length === 0) {
      callback("unable to find search term", undefined);
    } else {
      //if no err, define what you want returned:
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;

// =====varianta veche ======
// ========================
//geolocation
//  https://api.mapbox.com/geocoding/v5/mapbox.places/Los&20Angeles.json?access_token=pk.eyJ1IjoiY29kZW1vbmtleTg5ODk5ODkiLCJhIjoiY2p6MWQ0OHR4MDk4bDNkbnJnYWdoODZjbiJ9.sHPTh_5b4gCpYQGWxXJBJA&limit=1

// const geocodeURL =
//   "https://api.mapbox.com/geocoding/v5/mapbox.places/Los&20Angeles.json?access_token=pk.eyJ1IjoiY29kZW1vbmtleTg5ODk5ODkiLCJhIjoiY2p6MWQ0OHR4MDk4bDNkbnJnYWdoODZjbiJ9.sHPTh_5b4gCpYQGWxXJBJA&limit=1";

// request({ url: geocodeURL }, (error, response) => {
//   if (error) {
//     console.log("unable to connect to mapbox");
//     return;
//   } else if (response.body.features.length == undefined) {
//     console.log("unable 2 find location");
//     return;
//   } else {
//     let data = JSON.parse(response.body);
//     const latitude = data.features[0].center[1];
//     const longitude = data.features[0].center[0];

//     console.log(`lat: ${latitude}; longitude: ${longitude}`);
//   }
// });

// ====== end of varianta veche ===============
