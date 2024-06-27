import * as React from "react";
import Grid from "@mui/material/Grid";
import cloudyDay_1 from "../assets/amcharts_weather_icons_1.0.0/animated/cloudy-day-1.svg";
import { Weatherforcastdata, weatherConditions } from "../constant/weather";
import WeatherCard from "./weatherforcast/WeatherCard";
import { getWeather } from "../services/weatherService";
import { IWeatherData, IWeatherforcastdata } from "../types/weather";
import { getGeolocationData } from "../services/locationService";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import "./Weather.css";
import Advisory from "./advisory/Advisory";
import { WeatherData } from "../constant/AdvisoriesSuggestion";

const containerStyle = {
  width: "100%",
  height: "400px",
};
export default function Weather() {
  //#region variable region
  const [city, setCity] = React.useState<string>("Ahmedabad");
  const [weather, setWeather] =
    React.useState<IWeatherforcastdata>(Weatherforcastdata);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [address, setAddress] = React.useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = React.useState<string | null>(null);
  const [map, setMap] = React.useState<google.maps.Map | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  // const [data, setData] = React.useState<any>(null);
  const [location, setLocation] = React.useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const API_KEY = import.meta.env.VITE_LOCATION_API_KEY;

  //#endregion

  //#region  methods region
  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
    // debouncedSearch(e.target.value);
  };

  // Searching functionality handle
  const handleSearch = (city: string) => {
    if (city.trim() !== "") {
      fetchWeather(city);
    }
    if (!city) return;

    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: city }, (results, status) => {
      if (
        status === "OK" &&
        results !== null &&
        results[0]?.geometry?.location
      ) {
        const location = results[0].geometry.location;
        setLocation({ lat: location.lat(), lng: location.lng() });
        if (map) {
          map.panTo({ lat: location.lat(), lng: location.lng() });
          map.setZoom(12);
        }
      } else {
        setError("Location not found");
      }
    });
  };

  // match overall cloud analysis
  const getWeatherDescription = (code: number, cloudCover: number): string => {
    if (code === 1000 && cloudCover > 90) return "Overcast";
    if (code === 1000 && cloudCover > 60) return "Mostly Cloudy";
    if (code === 1000 && cloudCover > 30) return "Partly Cloudy";

    return weatherConditions[code] || "Unknown Weather";
  };

  const weatherDescription = getWeatherDescription(
    weather.data.values.weatherCode,
    weather.data.values.cloudCover
  );

  let WeatherAnalysisData: IWeatherData = WeatherData;
  WeatherAnalysisData = {
    temperature: weather.data.values.temperature,
    humidity: weather.data.values.humidity,
    windSpeed: weather.data.values.windSpeed,
    visibility: weather.data.values.visibility,
    rainIntensity: weather.data.values.rainIntensity,
    weatherCode: weather.data.values.weatherCode,
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  // const debounce = (func: any, delay: number) => {
  //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //   let timeout: any;
  //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //   return function executedFunction(...args: any[]) {
  //     const later = () => {
  //       clearTimeout(timeout);
  //       func(...args);
  //     };
  //     clearTimeout(timeout);
  //     timeout = setTimeout(later, delay);
  //   };
  // };

  // const debouncedSearch = React.useCallback(debounce(handleSearch, 500), []);

  // api async function
  const fetchWeather = async (city: string) => {
    setLoading(true);
    try {
      const data = await getWeather(city);
      setWeather(data);
    } catch (error) {
      console.log(error, "error");
    } finally {
      setLoading(false);
    }
  };

  //#endregion

  //#region useEffect region

  React.useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });
        },
        (err) => {
          setError(err.message);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  }, []);

  React.useEffect(() => {
    if (location) {
      const fetchGeolocationData = async () => {
        try {
          const data = await getGeolocationData(location.lat, location.lng);
          const formattedAddress = data.results[0]?.formatted_address;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const city = data.results[0]?.address_components.find(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (component: any) => component.types.includes("locality")
          )?.long_name;
          setAddress(city);
          // setData(data);
          setAddress(formattedAddress);
        } catch (err) {
          console.log(err, "err");
        }
      };
      fetchGeolocationData();
    }
  }, [location]);

  React.useEffect(() => {
    fetchWeather(city);

    // Set up interval to fetch data every hour (3600000 milliseconds)
    const intervalId = setInterval(fetchWeather, 3600000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //#endregion

  return (
    <>
      <Grid
        sx={{ flexGrow: 1 }}
        container
        spacing={2}
        className="matte-background"
        margin={"auto"}
      >
        <Grid item xs={12}>
          <div className="one">
            <h1>Weather Forcasting</h1>
          </div>
          <Grid container justifyContent="center" spacing={5} mt={2}>
            <Grid className="glass-card glass card-temp " item m={2}>
              <Grid className="weather-temperature">
                <img src={cloudyDay_1} style={{}} />
                <p
                  style={{ fontSize: "80px", color: "gray", marginTop: "20px" }}
                >{`${weather.data.values.temperature}${"\u00B0"}C `}</p>
                <h3>{weatherDescription}</h3>
                <p style={{ color: "black" }}>{weather.location.name}</p>
              </Grid>
            </Grid>
            <Grid
              className="glass-card glass card-temp"
              style={{
                display: "flex",
                alignItems: "stretch",
                justifyContent: "center",
              }}
              item
              m={2}
              width={"68%"}
            >
              <WeatherCard weather={weather} loading={loading} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid
            container
            alignItems="center"
            justifyContent="center"
            flexWrap={"wrap"}
            className="search-grid glass"
          >
            <Grid item xs={12} sm={8} md={6}>
              <div className="search">
                <input
                  type="text"
                  value={city}
                  onChange={handleCityChange}
                  placeholder="Enter city"
                  className="search-input"
                />
                <button
                  onClick={() => handleSearch(city)}
                  className="search-button"
                >
                  Search
                </button>
              </div>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid
            container
            alignItems="center"
            justifyContent="center"
            flexWrap={"wrap"}
            className="search-grid glass"
          >
            {location && (
              <LoadScript googleMapsApiKey={API_KEY}>
                <GoogleMap
                  mapContainerStyle={containerStyle}
                  center={location}
                  zoom={10}
                  onLoad={(map) => setMap(map)}
                >
                  {/* <Marker position={location} /> */}
                </GoogleMap>
              </LoadScript>
            )}
            {address && <div>Address: {address}</div>}
            <div>{!error && <h2>{city}</h2>}</div>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid
            container
            alignItems="center"
            justifyContent="center"
            flexWrap={"wrap"}
            className="search-grid glass"
          >
            <Advisory weatherAnalysisData={WeatherAnalysisData} />
          </Grid>
        </Grid>
      </Grid>
      {/* <ToastContainer/> */}
    </>
  );
}
