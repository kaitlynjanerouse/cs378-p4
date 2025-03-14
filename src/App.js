import './App.css';
import React from 'react';
import AddCity from './components/AddCity';
import Weather from './components/Weather';
import Cities from './components/Cities';

import 'bootstrap/dist/css/bootstrap.min.css'; 

function App() {
  const [locations, setLocations] = React.useState([
    { city: 'Austin', latitude: 30.2672, longitude: -97.7431},
    { city: 'San Francisco', latitude: 37.7749, longitude: -122.4194},
    { city: 'New York', latitude: 40.7128, longitude: -74.0060},
  ]);

  const [selectedCity, setSelectedCity] = React.useState(locations[0]);
  const [currWeatherData, setCurrWeatherData] = React.useState(null);
  
  const handleCityClick = (city) => {
    setSelectedCity(city);
  };

  // Add a new city to the list and set it as the selected city
  const handleNewCity = async (newCity) => {
    try {
      const coordinates = await fetchCityCordinates(newCity)
      const newLocation = { city: newCity, latitude: coordinates.latitude, longitude: coordinates.longitude };
      setLocations([...locations, newLocation]);
      setSelectedCity(newLocation);
    } catch {
      alert('Could not find the weather for' + newCity + '. Please try again!')
    }
  };

  // Fetch weather data for the selected city
  async function fetchWeatherData(latitude, longitude) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m&hourly=temperature_2m&temperature_unit=fahrenheit&timezone=auto`;
    try {
      const response = await fetch(url);
      const json = await response.json();
      console.log(json)
      setCurrWeatherData(json);
    } catch(err) {
      alert('There was an error fetching weather data. Please try again!');
    }
  }  
  
  React.useEffect(() => {
    fetchWeatherData(selectedCity.latitude, selectedCity.longitude);
  }, [selectedCity]);

  function getNextHoursForecast(weatherData) {
    const time = new Date().toLocaleString("en-US", {
      timeZone: weatherData.timezone, 
      hour: "2-digit", 
      hour12: false,
    });

    const localHour = parseInt(time);

    const currentHourIndex = weatherData.hourly.time.findIndex((hourTime) => {
      const hour = new Date(hourTime).getHours();
      return hour === localHour;
    });

    return weatherData.hourly.time.slice(currentHourIndex, currentHourIndex + 11)
      .map((time, index) => ({
        time,
        temperature: weatherData.hourly.temperature_2m[currentHourIndex + index],
      }));
  };

  // Fetch the coordinates of a new city
  async function fetchCityCordinates(cityName) {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}`;
    try {
      const response = await fetch(url);
      const json = await response.json();
      return { latitude: json.results[0].latitude, longitude: json.results[0].longitude };
    } catch(err) {
        console.error('Error fetching weather data:', err);
    }
  }

  return (
    <div>
      <AddCity handleNewCity={handleNewCity} />
      <Weather selectedCity={selectedCity} weatherData={currWeatherData} getNextHoursForecast={getNextHoursForecast}/>
      <Cities locations={locations} handleCityClick={handleCityClick} />
    </div>
  );
}

export default App;