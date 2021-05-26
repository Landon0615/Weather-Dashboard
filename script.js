let button = document.querySelector('.button')
let inputValue = document.querySelector('.inputValue')
let name =  document.querySelector('.name')
let wind =  document.querySelector('.wind')
let temp =  document.querySelector('.temp')
let date =  document.querySelector('.date')
let UV =  document.querySelector('.UV')
const weatherKey = "f4048cf303566008248577ccd1cef8a8"


button.addEventListener('click',function(){
    fetch('http://api.openweathermap.org/data/2.5/weather?q='+inputValue.value+'&appid=f4048cf303566008248577ccd1cef8a8&units=imperial')
    .then(response => response.json())
    .then(data => {
        let nameValue = data['name'];
        let dateValue = data['timezone'];
        let tempVAlue = data['main']['temp'];
        let windValue = data['wind']['speed'];
        let uvValue = data[''];
        

        name.innerHTML = nameValue;
        temp.innerHTML = tempVAlue;
        wind.innerHTML = windValue;
        date.innerHTML = dateValue;
        UV.innerHTML = uvValue;
console.log(data);
    })
    
    .catch(err => alert("Wrong city name!"))
})



// function fiveDayForecast(){

//     let apiKey = "f4048cf303566008248577ccd1cef8a8"


//     var fiveDayURL = "https://api.openweathermap.org/data/2.5/forecast?q=San+Diego&appid=" + apiKey;
    
    
  