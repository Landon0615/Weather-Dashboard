let button = document.querySelector(".button");
let name = document.querySelector(".name");
let date = document.querySelector(".date");
let fiveDate = document.querySelector(".fiveDate");
let searchHistory;
let card;

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

        let fiveDayTemp = filteredArr[0]["main"]["temp"];
        let fiveDayDate = filteredArr[0]["dt"];
        let fiveDayWind = filteredArr[0]["wind"]["speed"];
        let fiveDayHumidity = filteredArr[0]["main"]["humidity"];
        let fiveIconValue = filteredArr[0]["weather"][0]["icon"];
        

        document.querySelector(".fiveTemp").innerText = fiveDayTemp + "°F";

        document.querySelector(".fiveDate").innerText = moment
        .unix(fiveDayDate)
        .format("dddd, MMMM Do YYYY");


        document.querySelector(".fiveWind").innerText =
          "Wind Speed: " + fiveDayWind + "mph";


        document.querySelector(".fiveHumidity").innerText =
          "Humidity: " + fiveDayHumidity + "%";



        document.querySelector(".fiveIcon").src =
          "http://openweathermap.org/img/wn/" + fiveIconValue + ".png";


          let fiveDayTemp1 = filteredArr[1]["main"]["temp"];
          let fiveDayDate1 = filteredArr[1]["dt"];
          let fiveDayWind1 = filteredArr[1]["wind"]["speed"];
          let fiveDayHumidity1 = filteredArr[1]["main"]["humidity"];
          let fiveIconValue1 = filteredArr[1]["weather"][0]["icon"];
          
  
          document.querySelector(".fiveTemp1").innerText = fiveDayTemp1 + "°F";
  
          document.querySelector(".fiveDate1").innerText = moment
          .unix(fiveDayDate1)
          .format("dddd, MMMM Do YYYY");
  
  
          document.querySelector(".fiveWind1").innerText =
            "Wind Speed: " + fiveDayWind1 + "mph";
  
  
          document.querySelector(".fiveHumidity1").innerText =
            "Humidity: " + fiveDayHumidity1 + "%";
  
  
  
          document.querySelector(".fiveIcon1").src =
            "http://openweathermap.org/img/wn/" + fiveIconValue1 + ".png";
            let fiveDayTemp2 = filteredArr[2]["main"]["temp"];
            let fiveDayDate2 = filteredArr[2]["dt"];
            let fiveDayWind2 = filteredArr[2]["wind"]["speed"];
            let fiveDayHumidity2 = filteredArr[2]["main"]["humidity"];
            let fiveIconValue2 = filteredArr[2]["weather"][0]["icon"];
            
    
            document.querySelector(".fiveTemp2").innerText = fiveDayTemp2 + "°F";
    
            document.querySelector(".fiveDate2").innerText = moment
            .unix(fiveDayDate2)
            .format("dddd, MMMM Do YYYY");
    
    
            document.querySelector(".fiveWind2").innerText =
              "Wind Speed: " + fiveDayWind2 + "mph";
    
    
            document.querySelector(".fiveHumidity2").innerText =
              "Humidity: " + fiveDayHumidity2 + "%";
    
    
    
            document.querySelector(".fiveIcon2").src =
              "http://openweathermap.org/img/wn/" + fiveIconValue2 + ".png";
    
    
              let fiveDayTemp3 = filteredArr[3]["main"]["temp"];
              let fiveDayDate3 = filteredArr[3]["dt"];
              let fiveDayWind3 = filteredArr[3]["wind"]["speed"];
              let fiveDayHumidity3 = filteredArr[3]["main"]["humidity"];
              let fiveIconValue3 = filteredArr[3]["weather"][0]["icon"];
              
      
              document.querySelector(".fiveTemp3").innerText = fiveDayTemp3 + "°F";
      
              document.querySelector(".fiveDate3").innerText = moment
              .unix(fiveDayDate3)
              .format("dddd, MMMM Do YYYY");
      
      
              document.querySelector(".fiveWind3").innerText =
                "Wind Speed: " + fiveDayWind3 + "mph";
      
      
              document.querySelector(".fiveHumidity3").innerText =
                "Humidity: " + fiveDayHumidity3 + "%";
      
      
      
              document.querySelector(".fiveIcon3").src =
                "http://openweathermap.org/img/wn/" + fiveIconValue3 + ".png";

                let fiveDayTemp4 = filteredArr[4]["main"]["temp"];
                let fiveDayDate4 = filteredArr[4]["dt"];
                let fiveDayWind4 = filteredArr[4]["wind"]["speed"];
                let fiveDayHumidity4 = filteredArr[4]["main"]["humidity"];
                let fiveIconValue4 = filteredArr[4]["weather"][0]["icon"];
                
        
                document.querySelector(".fiveTemp4").innerText = fiveDayTemp4 + "°F";
        
                document.querySelector(".fiveDate4").innerText = moment
                .unix(fiveDayDate4)
                .format("dddd, MMMM Do YYYY");
        
        
                document.querySelector(".fiveWind4").innerText =
                  "Wind Speed: " + fiveDayWind4 + "mph";
        
        
                document.querySelector(".fiveHumidity4").innerText =
                  "Humidity: " + fiveDayHumidity4 + "%";
        
        
        
                document.querySelector(".fiveIcon4").src =
                  "http://openweathermap.org/img/wn/" + fiveIconValue4 + ".png";
})

      }
    


    
    


