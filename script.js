class App {
    constructor() {
        this.displayDataLocationAndTime()
        this.displayIcon()
    }
  
    dataWeatherGlobal

    // Getting Weather Data -- API Url - http://api.weatherstack.com/  
    async getWeatherData() {
        try {
            // pulling out data from API
            const request = await fetch(`http://api.weatherstack.com/current?access_key=${this.APIKEY}&query= 98004`)
            const data = await request.json()
            this.dataWeatherGlobal = {
                ...data
            }
        } catch (error) {
            console.log('error occured')
        }
    }

    // display weather icon on UI
    async displayIcon() {
        // wait for getWeatherData fn executes first and sets dataWeatherGlobal variable to data and then use that
        await this.getWeatherData()
        const iconEl = document.querySelector('.temperature-icon')
        const {
            weather_icons
        } = this.dataWeatherGlobal.current
        // setting the source of icon element
        iconEl.setAttribute('src', weather_icons[0])
    }

    // Use Geolocation API to get latitude and longitude
    getCurrentLocation = () =>
        new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(function (data) {
                const {
                    latitude,
                    longitude
                } = data.coords
                resolve([latitude, longitude])
            }, function () {
                // eject(alert('error'))
            })
        })

    async convertLocationData() {
        // contains [latitude, longitude]
        const coords = await this.getCurrentLocation()

        // converting coords to address by using Google Reverse Geocoding
        const apiKey = APIKEY
        const geocodingURL = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords[0]},${coords[1]}&key=${apiKey}`
        const request = await fetch(geocodingURL)
        const data = await request.json()

        // getting address data ex: street, city, state ; zip code, country
        const address = await data.results[4].formatted_address
        return address
    }

    // Displays Current Time(user's time zone) and Current Location on UI
    async displayDataLocationAndTime() {
        // date & time elements
        const date = document.getElementById('date')
        const currentTime = document.getElementById('time')

        // date & time variables
        let now, month, day, hour, minute, second

        // helper function - gets called once in every minute
        function getCurrentTime() {
            // date & time variables based on ${now} variable
            now = new Date()
            month = now.getMonth()
            day = now.getDate()
            hour = now.getHours()
            minute = now.getMinutes()
            second = now.getSeconds()
        }
        getCurrentTime()

        // if second is 59 -- call helper function -- I found this easier than checking and setting (Month, Day, Hour) - each one by one
        setInterval(() => {
            if (second === 59) {
                getCurrentTime()
                currentTime.textContent = `${hour} : ${minute}`
            } else {
                currentTime.textContent = `${hour} : ${minute}`
                second++
            }
        }, 1000)

        const userLocation = document.getElementById('location') // element
        const location = await this.convertLocationData() // data 
        // setting the location data
        userLocation.textContent = `${location}`
    }
}
const app = new App()