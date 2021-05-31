let button = document.querySelector(".button");
let name = document.querySelector(".name");
let date = document.querySelector(".date");
let fiveDate = document.querySelector(".fiveDate");
let searchHistory;
//Search for city submit button
button.addEventListener("click", function () {
  let inputValue = document.querySelector(".inputValue").value;
  currentWeather(inputValue);
  fiveDayForecast(inputValue);
  printHistory();

  if (localStorage.getItem("history")) {
    searchHistory = JSON.parse(localStorage.getItem("history"));
  } else {
    searchHistory = [];
  }
  searchHistory.push(inputValue);

  localStorage.setItem("history", JSON.stringify(searchHistory));
});
//search history
let printHistory = function () {
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = JSON.parse(localStorage.getItem(key));
    value.forEach((value) => {
      let list = $("li");
      let searchHistoryList = $("<button>");
      let searchHistoryListContents = value.concat("");
      searchHistoryList.addClass("search"[i]).text(searchHistoryListContents);
      searchHistoryList.appendTo(list);
    });
    if (i === 8) {
      !printHistory();
    }
  }
};

//API call to print data on button click
function currentWeather(cityName) {
  fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=f4048cf303566008248577ccd1cef8a8&units=imperial`
  )
    .then((response) => response.json())
    .then((data) => {
      let nameValue = data["name"];
      let tempValue = data["main"]["temp"];
      let windValue = data["wind"]["speed"];
      let lat = data["coord"]["lat"];
      let lon = data["coord"]["lon"];
      let iconValue = data["weather"][0]["icon"];

      name.innerHTML = nameValue;
      document.querySelector(".temp").innerText = tempValue + "°F";
      document.querySelector(".wind").innerText =
        "Wind Speed: " + windValue + "mph";
      document.querySelector(".icon").src =
        "http://openweathermap.org/img/wn/" + iconValue + ".png";

      getUvIndex(lat, lon);
    })

    .catch((err) => alert("Wrong city name!"));
}
//API call to get Lat and Lon
function getUvIndex(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=f4048cf303566008248577ccd1cef8a8&units=imperial`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      let uvValue = data["current"]["uvi"];
      document.querySelector(".UV").innerText = "UV Index: " + uvValue;
      let dateValue = data["current"]["dt"];
      date.innerHTML = moment.unix(dateValue).format("dddd, MMMM Do YYYY, LT");
    });
}

function fiveDayForecast(cityName) {
  var fiveDayURL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=f4048cf303566008248577ccd1cef8a8&units=imperial`;
  fetch(fiveDayURL)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      let dataArr = data["list"];
      let filteredArr = dataArr.filter((index) =>
        index["dt_txt"].includes("12:00:00")
      );
      for (let i = 0; i < filteredArr.length; i++) {
        let forecastDay = filteredArr[i];
        let dayData = formatDayOfWeek(forecastDay);
        let dayList = document.createElement("p");
        let dayContentList = document.createElement("p");
        moment.unix(dayData.fiveDayDate).format("dddd, MMMM Do YYYY");
        let fTemp = document.createTextNode(dayData.fiveDayTemp + "°F");
        let fWind = document.createTextNode(
          "Wind Speed: " + dayData.fiveDayWind + "mph"
        );
        let fHumidity = document.createTextNode(
          "Humidity: " + dayData.fiveDayHumidity + "%"
        );
        let fIcon = document.createTextNode(
          "http://openweathermap.org/img/wn/" + dayData.fiveIconValue + ".png"
        );
        console.log(filteredArr);
        dayContentList.appendChild(fTemp);
        dayContentList.appendChild(dayList);
        const currentDiv = document.getElementById("div1");
        document.body.insertBefore(dayList, currentDiv);

        console.log(JSON.stringify(forecastDay));
      }
    });
}
function formatDayOfWeek(forecastDay) {
  let fiveDayTemp = forecastDay["main"]["temp"];
  let fiveDayDate = forecastDay["dt"];
  let fiveDayWind = forecastDay["wind"]["speed"];
  let fiveDayHumidity = forecastDay["main"]["humidity"];
  let fiveIconValue = forecastDay["weather"][0]["icon"];
  return {
    fiveDayTemp,
    fiveDayDate,
    fiveDayWind,
    fiveDayHumidity,
    fiveIconValue,
  };
}
