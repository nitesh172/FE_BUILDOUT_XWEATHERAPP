const API_KEY = import.meta.env.VITE_API_KEY
const API_URL = import.meta.env.VITE_API_URL

export const fetchData = async (endpoint) => {
  try {
    let response = await fetch(API_URL + endpoint + `&key=${API_KEY}`)

    response = await response.json()

    return response
  } catch (error) {
    alert("Failed to fetch weather data")
    return { error }
  }
}
