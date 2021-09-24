console.log("client side js");

const weatherForm = document.getElementById("form_weather");
const search = document.querySelector("input");
const p_location = document.getElementById("p_location");
const p_forecast = document.getElementById("p_forecast");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;

  // fetch is async
  fetch("http://localhost:3000/weather?address=" + location).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          p_location = data.error;
        } else {
          p_location.textContent = data.location;
          p_forecast.textContent = data.forecast;
        }
      });
    }
  );

  console.log(location + " was typed in form_weather");
});
