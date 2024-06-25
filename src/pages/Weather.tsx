import * as React from "react";
import Grid from "@mui/material/Grid";
import "./Weather.css";
import cloudyDay_1 from "../assets/amcharts_weather_icons_1.0.0/animated/cloudy-day-1.svg"

import { Weatherforcastdata, weatherConditions } from "../constant/weather";
import WeatherCard from "./weatherforcast/WeatherCard";
import { getWeather } from "../services/weatherService";
import { IWeatherforcastdata } from "../types/weather";

export default function Weather() {

  //#region variable region
  const [city, setCity] = React.useState<string>("Ahmedabad");
  const [weather, setWeather] = React.useState<IWeatherforcastdata>(Weatherforcastdata);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);

  //#endregion
  //#region  methods region
  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
    debouncedSearch(e.target.value);
  };

  const handleSearch = (city: string) => {
    if (city.trim() !== "") {
      fetchWeather(city)
    }
  };

  const getWeatherDescription = (code: number, cloudCover: number): string => {


    if (code === 1000 && cloudCover > 90) return "Overcast";
    if (code === 1000 && cloudCover > 60) return "Mostly Cloudy";
    if (code === 1000 && cloudCover > 30) return "Partly Cloudy";

    return weatherConditions[code] || "Unknown Weather";
  };

    const weatherDescription = getWeatherDescription(weather.data.values.weatherCode, weather.data.values.cloudCover);


  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const debounce = (func:any, delay: number) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let timeout: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return function executedFunction(...args: any[]) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, delay);
    };
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = React.useCallback(debounce(handleSearch, 500), []);

  // api async function
  const fetchWeather = async (city:string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getWeather(city);
      setWeather(data);
    } catch (error) {
      setError('Error fetching weather data');
    } finally {
      setLoading(false);
    }
  };

  //#endregion

  //#region useEffect region
  // React.useEffect(() => {
  //   fetchWeather(city)
  // }, []);

  //#endregion

  return (
    <>
      <Grid sx={{ flexGrow: 1 }} container spacing={2} className="matte-background" margin={'auto'}>
        <Grid item xs={12}>
          <div className="one">
            <h1>Weather Forcasting</h1>
          </div>
          <Grid container justifyContent="center" spacing={5} mt={2}>
            <Grid className="glass-card glass card-temp " item m={2} width={'25%'}>
              <Grid className="weather-temperature">
                <img src={cloudyDay_1} style={{}} />
                <p style={{ fontSize: '80px', color: "gray", marginTop: '20px' }}>{`${weather.data.values.temperature}${'\u00B0'}C `}</p>
                <h3>{weatherDescription}</h3>
                <p style={{ color: 'black' }}>{weather.location.name}</p>
              </Grid>

            </Grid>
            <Grid className="glass-card glass card-temp" style={{ display: 'flex', alignItems: 'stretch', justifyContent: 'center' }} item m={2} width={'68%'}>
              <WeatherCard weather={weather} />
            </Grid>

          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container alignItems="center" justifyContent="center" className="search-grid glass search-card" >
            <Grid item xs={12} sm={8} md={6} >
              <div className="search">
                <input
                  type="text"
                  value={city}
                  onChange={handleCityChange}
                  placeholder="Enter city"
                  className="search-input"
                />
                <button onClick={() => handleSearch(city)} className="search-button">
                  Search
                </button>

              </div>
            </Grid>
          </Grid>

        </Grid>
      </Grid>
    </>
  );
}
