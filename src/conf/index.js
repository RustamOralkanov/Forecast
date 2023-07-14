const url = import.meta.env.VITE_API_BASE_URL
const apiKey = import.meta.env.VITE_APP_API_KEY

export default function getWeather(city, weather) {
  fetch(`${url}q=${city}&appid=${apiKey}`)
    .then((response) => response.json())
    .then((data) => {
      weather = data
      return weather
    })

  console.log('weather', weather)
}
