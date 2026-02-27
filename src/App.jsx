import "./App.css"
import { useState } from "react"
import { fetchData } from "./config/server"

function App() {
  const [isLoading, setIsLoding] = useState(false)
  const [weather, setWeather] = useState({})

  const fetchByCity = async (e) => {
    e.preventDefault()

    const formData = new FormData(e.target)
    const city = formData.get("city")

    setIsLoding(true)
    const { current } = await fetchData(`/current.json?q=${city}`)

    if (!current) {
      alert("Failed to fetch weather data")
      setIsLoding(false)
      return
    }

    setWeather({
      temperature: { c: current.temp_c, f: current.temp_f },
      humidity: current.humidity,
      condition: current.condition,
      wind: current.wind_kph,
    })
    setIsLoding(false)
  }

  return (
    <div className="main">
      <form onSubmit={fetchByCity}>
        <input type="text" name="city" placeholder="Enter city name" required />
        <button type="submit">Search</button>
      </form>
      {!!isLoading ? (
        <p>Loading data…</p>
      ) : (
        <div className="weather-cards">
          {Object.keys(weather).map((key) => {
            let value
            if (key === "temperature") value = weather[key].c
            else if (key === "condition") value = weather[key].text
            else value = weather[key]

            return (
              <div key={key} className="weather-card">
                <div>{key}</div>
                <p>{value}</p>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default App
