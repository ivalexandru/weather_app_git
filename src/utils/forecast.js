const request = require("postman-request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=aa976a521037af28ea711807663ec3a2&query=" +
    String(latitude) +
    "," +
    String(longitude);

  // response.body is now {body}
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("could NOT connect to location service");
    } else if ((body.error, undefined)) {
      callback("unable2find location", undefined);
    } else {
      let city = body.location.name;
      const temp = body.current.temperature;
      const feel = body.current.feelslike;
      const windSpeed = body.current.wind_speed;
      const description = body.current.weather_descriptions[0];
      callback(
        undefined,
        `${description} -  it is ${temp} degrees in ${city}. 
         It feels like ${feel}. 
         Wind speed is: ${windSpeed}`
      );
    }
  });
};

module.exports = forecast;

// =====  varianta veche ==========
// const url =
//   "http://api.weatherstack.com/current?access_key=aa976a521037af28ea711807663ec3a2&query=44.4268,26.1025";

// request({ url, json: true }, (error, response) => {
//   if (error) {
//     console.log(error);
//     return;
//   } else if (response.body.error) {
//     console.log("unable2find loc");
//   } else {
//     const data = response.body;
//     // console.log(data.current);
//     // const { name, country } = response.location;

//     let city = response.body.location.name;
//     const temp = data.current.temperature;
//     const feel = data.current.feelslike;
//     const description = data.current.weather_descriptions[0];
//     console.log(
//       `${description} -  it is ${temp} degrees in ${city}. It feels like ${feel}`
//     );
//   }
// });
