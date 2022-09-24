let mainInput = document.getElementById('mainInput')
let weather = {
    "apiKey": "25dab5c01e18f4238210686778fa9b9e",
    fetchWeather: function (city) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=" + this.apiKey)
            .then((response) => response.json())
            .then((data) => this.displayWeather(data))
    },
    displayWeather: function (data) {
        const { name } = data
        const { country } = data.sys
        const { icon, description } = data.weather[0]
        const { temp, feels_like, humidity } = data.main
        const { speed } = data.wind

        let roundTempNum = Math.round(temp)
        let actualTempNum = Math.round(feels_like)

        mainInput.value = ""


        document.querySelector('.city').innerText = "Weather in " + name + ", " + country
        document.querySelector(".icon").src =
            "https://openweathermap.org/img/wn/" + icon + ".png"
        document.querySelector('.temp').innerText = roundTempNum + " °C"
        document.querySelector('.actual-temp').innerText = "Feels like " + actualTempNum + " °C"
        document.querySelector('.description').innerText = description
        document.querySelector('.humidity').innerText = "Humidity: " + humidity + " %"
        document.querySelector('.wind').innerText = "Wind speed: " + speed + " km/h"


    },
    search: function () {
        this.fetchWeather(document.querySelector('.search-bar').value)
    }
}


let greetText = document.getElementById('greetText')

mainInput.addEventListener('keydown', function (event) {
    if (event.key === "Enter") {
        weather.search()
        greetText.remove()
    }
})

document.querySelector('.search-button').addEventListener('click', function () {
if (mainInput.value.length > 0) {
    weather.search()
    greetText.remove()
}
})