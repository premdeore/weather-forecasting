import uvIndex from '../assets/amcharts_weather_icons_1.0.0/animated/day.svg';
import cloudCover from '../assets/amcharts_weather_icons_1.0.0/animated/cloudy.svg';
import visibility from '../assets/cloudStatus/cloudy_day_fog_foggy_mist_icon .svg';
import sleetIntensity from '../assets/amcharts_weather_icons_1.0.0/animated/snowy-1.svg';
import cloudCeiling from '../assets/amcharts_weather_icons_1.0.0/animated/rainy-3.svg';
import rainIntensity from '../assets/amcharts_weather_icons_1.0.0/animated/rainy-7.svg';
import pressureSurfaceLevel from "../assets/cloudStatus/cloud_cloudy_forecast_precipitation_rain_icon.svg";
import cloudBase from "../assets/amcharts_weather_icons_1.0.0/animated/thunder.svg";
import windSpeed from "../assets/cloudStatus/breeze_fast_speed_weather_wind_icon.svg";
import humidity from "../assets/cloudStatus/fog_foggy_forecast_mist_weather_icon.svg";
import snowIntensity from "../assets/cloudStatus/forecast_snow_snowflake_weather_icon.svg";
import freezingRainIntensity  from "../assets/amcharts_weather_icons_1.0.0/animated/weather.svg"

export default function WeatherIcons(){
    return {
        uvIndex,
        cloudCover,     
        visibility,
        sleetIntensity,
        cloudCeiling,
        rainIntensity,
        pressureSurfaceLevel,
        cloudBase,
        windSpeed,
        humidity,
        snowIntensity,
        freezingRainIntensity,
    };
}