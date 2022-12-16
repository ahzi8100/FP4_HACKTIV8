// Fetch API Weather
let searchTerm = document.getElementById("searchTerm");
let searchButton = document.getElementById("searchButton");
let temp = document.getElementById("temp");
let city = document.getElementById("city");
let desc = document.getElementById("desc");
let img = document.getElementById("img");
let humidity = document.getElementById("humidity");
let windSpeed = document.getElementById("windSpeed");
let feels = document.getElementById("feels");

searchButton.addEventListener("click", function() {
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + searchTerm.value + "&appid=fccc21c6b69fdb5a90e968e63bfc3ff0&units=metric").then((response) => response.json()).then((data) => {
        let nameValue = data["name"];
        let countryValue = data["sys"]["country"];
        let countryName = new Intl.DisplayNames(["EN"], { type: "region"});
        let country = countryName.of(countryValue);
        let tempValue = data["main"]["temp"];
        let id = data["weather"][0]["id"];
        let descValue = data["weather"][0]["description"];
        let mainValue = data["weather"][0]["main"];
        let humidityValue = data["main"]["humidity"];
        let windValue = data["wind"]["speed"];
        let feelTempValue = data["main"]["feels_like"];

        if (id == 800) {
            img.src = "assets/sun.png"
        }
        else if (id >= 200 && id <= 232) {
            img.src = "assets/thunder.png"
        }
        else if (id >= 300 && id <= 321) {
            img.src = "assets/rain.png"
        }
        else if (id >= 500 && id <= 531) {
            img.src = "assets/cloudy-rain.png"
        }else if (id >= 600 && id <= 622) {
            img.src = "assets/snow.png"
        }else if (id >= 801 && id <= 804) {
            img.src = "assets/cloudy.png"
        }
        else {
            img.src = "assets/season.png"
        }

        city.innerHTML = nameValue + ", " + country;
        temp.innerHTML = tempValue + "°C";
        desc.innerHTML = descValue;
        humidity.innerHTML = humidityValue + " %";
        windSpeed.innerHTML = windValue + " m/s";
        feels.innerHTML = feelTempValue + "°C";

    })
    .catch((err)=> Swal.fire({
        icon: 'error',
        title: 'Data Not Found',
        text: 'Please Try Again!'
      }))
});

// Time
function showTime() {
    let a_p = "";
    let today = new Date();
    let curr_hour = today.getHours();
    let curr_minute = today.getMinutes();
    if (curr_hour < 12) {
        a_p = "AM";
    } else {
        a_p = "PM";
    }
    if (curr_hour == 0) {
        curr_hour = 12;
    }
    if (curr_hour > 12) {
        curr_hour = curr_hour - 12;
    }
    curr_hour = checkTime(curr_hour);
    curr_minute = checkTime(curr_minute);
    document.getElementById('time').innerHTML=curr_hour + ":" + curr_minute + " " + a_p;
    }

function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}
setInterval(showTime, 500);

// Date
let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
			let myDays = ['Sunday', 'Monday', 'Tuessday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
			var date = new Date();
			var day = date.getDate();
			var month = date.getMonth();
			var thisDay = date.getDay(),
			    thisDay = myDays[thisDay];
			var yy = date.getYear();
			var year = (yy < 1000) ? yy + 1900 : yy;
			document.getElementById('date').innerHTML=thisDay + ', ' + day + ' ' + months[month] + ' ' + year;