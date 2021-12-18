console.log("Client side JS file is loaded!");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const forecast = document.querySelector(".forecast");
const place = document.querySelector(".location");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const location = search.value;

  forecast.innerHTML = `<img class="loader" src="./img/loading.gif" alt="Loading...">`;
  place.innerText = "";

  fetch(`http://localhost:3000/weather?location=${location}`).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          forecast.innerText = data.error;
        } else {
          forecast.innerText = data.forecast;
          place.innerText = data.location;
        }
      });
    }
  );
});
