import { useState } from 'react'
import './WeatherApp.css'

export const WeatherApp = () => {

    const [city, setCity] = useState('')
    const [weatherData, setWeatherData] = useState(null)

    const urlBase = 'https://api.openweathermap.org/data/2.5/weather'
    const API_KEY = '922805a28c2d470869bd5f0dbdb75e8a'
    const difKelvin = 273.15

    const fetchWeatherData = async () => {
        try {
            const response = await fetch(`${urlBase}?q=${city}&appid=${API_KEY}&lang=en`)
            const data = await response.json()
            setWeatherData(data)
        } catch (error) {
            console.error('Has been an error', error)
        }
    }

    const handleCityChange = (event) => {
        setCity(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        fetchWeatherData()
    }


    return (
        <div className='container'>
            <h1>WeatherApp</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder='Insert a city'
                    value={city}
                    onChange={handleCityChange}
                />
                <button type='submit'>Search</button>
            </form>

            {weatherData && (
                <div>
                    <h2>{weatherData.name}, {weatherData.sys.country}</h2>
                    <p>The current temperature is {Math.floor(weatherData.main.temp - difKelvin)}°C </p>
                    <p>The weather is {weatherData.weather[0].description}</p>
                    <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt={weatherData.weather[0].description} />
                </div>
            )}

        </div>
    )
}
