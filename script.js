class App {
    // API Url - http://api.weatherstack.com/ 
    // API Key 
    #apiKey = 'bee46877a770c74747524a7443ff4c04' 

    async getData() {
        // pulling out data from API
        const request = await fetch(`http://api.weatherstack.com/current?access_key=${this.#apiKey}&query= 98004`)
        const data = await request.json()
  
        // variables - temperature, weather descriptions, weather icons
        const {
            temperature,
            weather_descriptions,
            weather_icons
        } = data.current
    }
}

const app = new App() 
app.getData()