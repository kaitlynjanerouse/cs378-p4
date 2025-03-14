import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
);

// Dynamically displays the weather for the selected city in a line chart format.
const Weather = ({ selectedCity, weatherData, getNextHoursForecast }) => {
    if (!weatherData) { // Check if weatherData is available before rendering
        return <div>Loading weather data...</div>;
    }

    const formatCurrentTime = (timezone) => {
        const options = { 
            weekday: 'long', 
            hour: 'numeric', 
            minute: 'numeric', 
            timeZone: timezone };
        return new Intl.DateTimeFormat('en-US', options).format( new Date());
    };

    const forecastData = getNextHoursForecast(weatherData);

    // Prepare chart data
    const chartData = {
        labels: forecastData.map((point) => {
            const pointTime = new Date(point.time).getHours();
            const time = new Date().toLocaleString("en-US", {
                timeZone: weatherData.timezone, 
                hour: "2-digit", 
                hour12: false,
              });
          
            const localHour = parseInt(time);
            return pointTime === localHour ? "Now" : new Date(point.time).toLocaleTimeString([], { hour: "numeric" });
        }),
        datasets: [
            {
                data: forecastData.map((point) => point.temperature),
                borderColor: "rgba(0,123,255,1)",
            },
        ],
    };

    // Prepare chart options
    const options = {
        plugins: {
            title: {
                display: true,
                text: `Weather forecast for ${selectedCity.city}`,
            },
            legend: {
                display: false
            }
        },
        interaction: {
            intersect: false,
        },
    };

    return (
        <div className="weather-container">
            <div className="selected-city">{selectedCity.city}</div>
            <div className="current-time">{formatCurrentTime(weatherData.timezone)}</div>
            <div className="current-temperature">{Math.round(weatherData.current.temperature_2m)}°F</div>
            <div>
                <Line data={chartData} options={options} />
            </div>
        </div>
    );
};


export default Weather;
