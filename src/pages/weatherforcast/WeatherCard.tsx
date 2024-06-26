
import React from 'react';
import './WeatherCard.css';
import { Grid } from '@mui/material';
import WeatherIcons from '../../constant/WeatherIcons';
import { IWeatherforcastdata } from '../../types/weather';


interface WeatherCardProps {
  weather: IWeatherforcastdata;
  loading: boolean
}

interface IWeathericons {
  uvIndex: string;
  cloudCover: string;
  visibility: string;
  sleetIntensity: string;
  cloudCeiling: string;
  rainIntensity: string;
  pressureSurfaceLevel: string;
  cloudBase: string;
  windSpeed: string;
  humidity: string;
  snowIntensity: string;
  freezingRainIntensity: string;
}


const WeatherCard: React.FC<WeatherCardProps> = ({ weather ,loading }) => {
  const icons: IWeathericons = WeatherIcons();


  const getpropertydata=(key: keyof IWeathericons): number | string =>{
    const property = weather.data.values[key];
    return property !== undefined ? property : 'N/A'; 
  }
  return (
    <>
      <Grid className="weather-card">
        <Grid item className='card-imageline'>

          {Object.entries(icons).map(([key, value]) => (
            
              <div key={key} className='image-card'>
                <img src={value} style={{ width: "100px", height: "100px" }} alt={key} />
                <span style={{textAlign:'center'}}>{!loading && getpropertydata(key as keyof IWeathericons)}</span>
                <span style={{textAlign:'center'}}>{key}</span>
              </div>
            
          ))}
        </Grid>
      </Grid>
    </>
  );
};

export default WeatherCard;
