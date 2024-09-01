import { useEffect, useState } from "react";
import "./App.css";
import cities from "./constant/citiesData";


  

function App() {
  const {}= cities
  const [chosen, setChosen] = useState(cities[0]);
  const [weatherData, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  

  useEffect(() => {
    const { latitude, longitude } = chosen;
    const api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=1f136667cfcdb418bf8b7a4c5a542f00`;
    setLoading(true);
    fetch(api)
      .then((res) => res.json())
      .then((data) => {
        setWeather(data);
        setLoading(false);
      });
  }, [chosen]);

  const handleChange = (e) => {
    setChosen(cities[e.target.value]);
  };

  if (loading) {
    return (
      <div className={`flex justify-center items-center min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
        <h1 className="text-4xl font-bold text-blue-600 dark:text-blue-400">
<div class="loading">
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
</div></h1>
      </div>
    );
  }

  const { main, weather, sys, name, wind, clouds, visibility, rain, dt } = weatherData;
  const weatherIcon = `https://openweathermap.org/img/wn/${weather[0].icon}@4x.png`;
  const temperature = Math.round(main.temp - 273.15);
  const feelsLike = Math.round(main.feels_like - 273.15);
  const date = new Date(dt * 1000).toLocaleDateString();
  const time = new Date(dt * 1000).toLocaleTimeString();

  return (
    <div className={`bodyy min-h-screen flex flex-col items-center justify-center ${darkMode ? 'bg-gradient-to-b from-gray-800 to-gray-900' : 'bg-gradient-to-b from-blue-500 to-purple-900'} text-white py-20`}>
      <button
        onClick={() => setDarkMode(!darkMode)}
        className={`togglemq absolute top-5 right-5 p-2 px-3 rounded-full ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-300 text-black'} transition-all`}>
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </button>

      <h1 className="text-4xl font-bold mb-9 uppercase text-center">Weather App</h1>
      <select
        onChange={handleChange}
        value={cities.indexOf(chosen)}
        className={`inputmq p-3 mb-5 border w-96 rounded-lg ${darkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-800 border-gray-300'} shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}>
        {cities.map((data, ind) => (
          <option key={ind} value={ind}>
            {data.name}
          </option>
        ))}
      </select>

      <div className={`bg-white bg-opacity-20 p-10 rounded-lg shadow-2xl text-center max-w-lg w-full ${darkMode ? 'bg-gray-600 text-white' : ''}`}>
        <img
          src={weatherIcon}
          alt={weather[0].description}
          className="mx-auto" />
        <h1 className="text-4xl font-bold uppercase">{name}</h1>
        <h2 className="text-3xl font-semibold mt-4">{weather[0].main}</h2>
        <h2 className="text-2xl my-4">
          {temperature}°C <span className="text-xl">(Feels like: {feelsLike}°C)</span>
        </h2>
        <div className="text-lg my-2 flex justify-between">
          <span className="font-semibold">Humidity:</span>
          <span>{main.humidity}%</span>
        </div>
        <div className="text-lg my-2 flex justify-between">
          <span className="font-semibold">Pressure:</span>
          <span>{main.pressure} hPa</span>
        </div>
        <div className="text-lg my-2 flex justify-between">
          <span className="font-semibold">Wind Speed:</span>
          <span>{wind.speed} m/s</span>
        </div>
        {/* <div className="text-lg my-2 flex justify-between">
          <span className="font-semibold">Cloudiness:</span>
          <span>{clouds.all}%</span>
        </div> */}
        <div className="text-lg my-2 flex justify-between">
          <span className="font-semibold">Visibility:</span>
          <span>{visibility / 1000} km</span>
        </div>
        {/* <div className="text-lg my-2 flex justify-between">
          <span className="font-semibold">Rain (Last Hour):</span>
          <span>{rain?.['1h'] || '0'} mm</span>
        </div> */}
        <div className="text-lg my-2 flex justify-between">
          <span className="font-semibold">Sunrise:</span>
          <span>{new Date(sys.sunrise * 1000).toLocaleTimeString()}</span>
        </div>
        <div className="text-lg my-2 flex justify-between">
          <span className="font-semibold">Sunset:</span>
          <span>{new Date(sys.sunset * 1000).toLocaleTimeString()}</span>
        </div>
        <div className="text-lg my-2 flex justify-between">
          <span className="font-semibold">Date:</span>
          <span>{date}</span>
        </div>
        <div className="text-lg my-2 flex justify-between">
          <span className="font-semibold">Time:</span>
          <span>{time}</span>
        </div>
      </div>
    </div>
  );
}

export default App;