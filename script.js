class App {
    // API Url - http://api.weatherstack.com/ 
    // API Key 
    #apiKey = 'bee46877a770c74747524a7443ff4c04'
    dataWeatherGlobal

    // Getting Data
    async getWeatherData() {
        try {
            // pulling out data from API
            const request = await fetch(`http://api.weatherstack.com/current?access_key=${this.#apiKey}&query= 98004`)
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
                reject(alert('error'))
            })
        })

    async convertLocationData() {
        // return longitude & latitude
        const coords = await this.getCurrentLocation()
        console.log(coords[0], coords[1])
        // converting coords to address by using geocoding
        const apiKey = 'AIzaSyD5hQYLNns7DfUnSqvsCaxT31YNerP2xxw'
        const geocodingURL = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords[0]},${coords[1]}&key=${apiKey}`
        const request = await fetch(geocodingURL)
        const data = await request.json()
        
        // street, city, state ; zip code, country
        const address = data.results[4].formatted_address
        console.log(address)
    }
}
const app = new App()
app.displayIcon()
app.getCurrentLocation()
app.convertLocationData()