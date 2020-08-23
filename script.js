var APIKey = "c5fdd3b4aab154c96dea704a586cd167"; 
var city = "";
var todayDate= "";
var tempF = "";
var humidity = "";
var windSpeed = "";
var uvIndex = "";
var lat = "";
var long = "";
var minTK = "";
var maxTK = "";
var minTF = "";
var maxTF = "";
var humidityDay = "";
var currentWeatherIconCode = "";
var currentWeatherIconUrl = "";
var iconcode = "";
var iconurl = "";
var country = "";
var placesSearched = [];

var placesLocaStorage = JSON.parse(localStorage.getItem("places-searched"));
if (placesLocaStorage !== null) {
    placesLocaStorage.forEach(function(place) {place.toUpperCase();});
    placesSearched = placesLocaStorage;
}

$(document).ready(function(){
    showPlaces(placesSearched);
    if (placesLocaStorage !== null) {
        var lastPlace = placesSearched[0];
        searchPlace(lastPlace);
    }
});

$("#search-btn").on("click", function (){
    event.preventDefault();
    clearrCurrentWeatherInfo()
    resetIt()
    var placeName = $("input").val().toUpperCase().trim();
    $("#search-input").va;("");
    searchPlace(placeName);

    if(placeName !=="" && placesSearched[0] !== placeName) {
        placesSearched.unshift(placeName);
        localStorage.setItem("places-searched", JSON.stringify(placesSearched));
        if(placesSearched === 1) {
            $("#places-searched-card").removeClass("hide");
        }
        console.log($("ul#places-searched-list a").length);
        if ($("ul#places-searched-list a").length >=5) {
            ($("ul#places-searched-list a:eq(4)").remove());
        }
        $("#places-searched-list").prepend(`<a href="#" class="list-group-item" style="text-decoration: none; color: black;">
        <li>${placeName}</li>
        </a>`);         
        }
});

$(document).on('click', '.list-group-item', function() {
    var placeName = $(this).text();
    clearrCurrentWeatherInfo()
    resetIt();
    searchPlace(placeName);
});

function showCurrentWeather () {
    var cardDiv = $("<div class='container border bg-light'>");
    var weatherImage = $("<img>").attr('src', currentWeatherIconUrl);
    var cardHeader = $("<h4>").text(city + " " + currentDate.toString());
    cardHeader.append(weatherImage);
    var tempEl = $("<p>").text("Temperature: " + tempF+ " F");
    var humidityEl = $("<p>").text("Humidity: " + humidityValue + "%");
    var windSpeedEl = $("<p>").text("Wind Speed: " + windSpeed + " MPH");
    var uvIndexEl = $("<p>").text("UV Index: ");
    var uvIndexValueEl = $("<span>").text(uvIndexValue).css("background-color", uvIndexColors(uvIndexValue)); 
    uvIndexEl.append(uvIndexValueEl);
    cardDiv.append(cardHeader);
    cardDiv.append(tempEl);
    cardDiv.append(humidityEl);
    cardDiv.append(windSpeedEl);
    cardDiv.append(uvIndexEl);
    $("#current-weather-conditions").append(cardDiv);
  }
  
function forecast() {
    var imgEl = $("<img>").attr("src", iconurl);  
    var cardEl = $("<div class='card'>").addClass("pl-1 bg-primary text-light");
    var cardBlockDiv = $("<div>").attr("class", "card-block");
    var cardTitleDiv = $("<div>").attr("class", "card-block");
    var cardTitleHeader = $("<h6>").text(dateValue).addClass("pt-2");
    var cardTextDiv = $("<div>").attr("class", "card-text");
    var minTempEl = $("<p>").text("Min Temp: " + minTempF + " ºF").css("font-size", "0.60rem");
    var maxTempEl = $("<p>").text("Max Temp: " + maxTempF + " ºF").css("font-size", "0.60rem");
    var humidityEl = $("<p>").text("Humidity: " + dayhumidity + "%").css("font-size", "0.60rem");
  
    cardTextDiv.append(imgEl);
    cardTextDiv.append(minTempEl);
    cardTextDiv.append(maxTempEl);
    cardTextDiv.append(humidityEl);
    cardTitleDiv.append(cardTitleHeader);
    cardBlockDiv.append(cardTitleDiv);
    cardBlockDiv.append(cardTextDiv);
    cardEl.append(cardBlockDiv);
    $(".card-deck").append(cardEl);
  }

  function addCardDeckHeader() {
    deckHeader = $("<h4>").text("5-Day Forecast").attr("id", "card-deck-title");
    deckHeader.addClass("pt-4 pt-2");
    $(".card-deck").before(deckHeader);
}
function clearrCurrentWeatherInfo(){
    $("#current-conditions").empty();
    $("#card-deck-title").remove();
    $(".card-deck").empty();
}

function showPlaces(listOfPlaces) {
    $("#places-searched-card").removeClass("hide");
    var count =0;
    listOfPlaces.length > 5 ? count = 5:count=listOfPlaces.length
    for (var i=0; i < count; i++) {
        $("#places-searched-list").css("list-style-type", "none");
        $("#places-searched-list").append(`<a href="#" class="list-group-item" style="text-decoration: none; color: black;">
        <li>${listOfPlaces[i]}</li>
        </a>`);
    }
}

function uvIndexColors(uvIndex) {
    var uvIndexValue = parseFloat(uvIndex);
    var color = "";
    if (uvIndexValue <= 2) {
        colorcode = "#00ff00";
      }
      else if ((uvIndexValue > 2) && (uvIndexValue <= 5)) {
        colorcode = "#ffff00";
      }
      else if ((uvIndexValue > 5) && (uvIndexValue <= 7)) {
        colorcode = "#ffa500";
      }
      else if ((uvIndexValue > 7) && (uvIndexValue <= 10)) {
        colorcode = "#9e1a1a";
      }
      else if (uvIndexValue > 10) {
        colorcode = "#7f00ff";
      }
      return colorcode;
    }
function resetIt() {
var city = "";
var todayDate= "";
var tempF = "";
var humidity = "";
var windSpeed = "";
var uvIndex = "";
var lat = "";
var long = "";
var minTK = "";
var maxTK = "";
var minTF = "";
var maxTF = "";
var humidityDay = "";
var currentWeatherIconCode = "";
var currentWeatherIconUrl = "";
var iconcode = "";
var iconurl = "";
var country = "";
}

function searchPlace(placeName){
    console.log(placeName);


var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + 
placeName + "&appid=" + APIKey;
// var queryURL = "https://api.openweathermap.org/data/2.5/weather?id=524901&appid:c5fdd3b4aab154c96dea704a586cd167"


// function searchPlace(placeName)
//     console.log(placeName);


$.ajax({
    url: queryURL,
    method: "GET"
})

.then(function(response){
    var result = response;
    console.log(result);
    place = result.name.trim();


    currentDate = moment.unix(result.dt).format("l");
    console.log(currentDate);
    var tempK = result.main.temp;
    tempF = ((tempK - 273.15) * 1.8 + 32).toFixed(1);
    windSpeed = result.wind.speed;
    humidityValue = result.main.humidity;
    currentWeatherIconCode = result.weather[0].icon;
    currentWeatherIconUrl = "https://openweathermap.org/img/w/" + currentWeatherIconCode + ".png";
    var lat = result.coord.lat;
    var long = result.coord.lon;
    var uvIndexQueryUrl = "https://api.openweathermap.org/data/2.5/uvi?&appid=" + APIKey + "&lat=" + lat + "&lon=" + long;
    $.ajax({
      url: uvIndexQueryUrl,
      method: "GET"
    })

    .then(function(response) {
        uvIndexValue = response.value;
        showCurrentWeather()

        var fiveDayQueryUrl = "https://api.openweathermap.org/data/2.5/forecast/daily?q=" + city + "&appid=" + APIKey + "&cnt=5";
     $.ajax({
       url: fiveDayQueryUrl,
       method: "GET"
     })

     .then(function(response) {

     })
        
        var vDayForecast = response.list;
        addCardDeckHeader()
        for (var i=0; i < 5; i++) {
        iconcode = vDayForecast[i].weather[0].icon;
        iconurl = "https://openweathermap.org/img/w/" + iconcode + ".png";
        dateValue = moment.unix(vDayForecast[i].dt).format('l');
        minTK = vDayForecast[i].temp.min;
        minTempF =  ((minTempK - 273.15) * 1.8 + 32).toFixed(1);
        maxTK = vDayForecast[i].temp.max;
        maxTempF =  (((vDayForecast[i].temp.max) - 273.15) * 1.8 + 32).toFixed(1);
        dayhumidity = vDayForecast[i].humidity;
        forecast()
         }
        });
      });
    };
    