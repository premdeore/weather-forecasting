// src/advisories.ts

import { IAdvisory, IWeatherData } from "../types/weather";

export const WeatherData:IWeatherData = {
    temperature: 0,
    humidity: 0,
    windSpeed: 0,
    visibility: 0,
    rainIntensity: 0,
    weatherCode: 0,
  }
  
 export const Advisory:IAdvisory  = {
    type: "" ,
    message: ""
  }
  
  export function getFarmingAdvisory(weatherData: IWeatherData): IAdvisory[] {
    const advisories: IAdvisory[] = [];

    if (weatherData.temperature > 35) {
      advisories.push({ type: 'Temperature', message: 'High temperature may cause heat stress on crops.' });
    }
    if (weatherData.humidity > 80) {
      advisories.push({ type: 'Humidity', message: 'High humidity increases the risk of fungal diseases.' });
    }
    if (weatherData.windSpeed > 15) {
      advisories.push({ type: 'Wind', message: 'High winds may damage crops.' });
    }
    if (weatherData.rainIntensity > 0) {
      advisories.push({ type: 'Rain', message: 'Rain may cause water logging in fields.' });
    }
    if(!((weatherData.temperature > 35) && (weatherData.visibility < 5) || (weatherData.windSpeed > 15) ||(weatherData.rainIntensity > 0))){
      advisories.push({ type: '', message: 'Clear Enviorment.' });
    }
  
    return advisories;
  }
  
  export function getTravelAdvisory(weatherData: IWeatherData): IAdvisory[] {
    const advisories: IAdvisory[] = [];
    
    if (weatherData.temperature > 35) {
      advisories.push({ type: 'Temperature', message: 'High temperature may cause heat-related illnesses.' });
    }
    if (weatherData.visibility < 5) {
      advisories.push({ type: 'Visibility', message: 'Low visibility makes driving hazardous.' });
    }
    if (weatherData.windSpeed > 15) {
      advisories.push({ type: 'Wind', message: 'High winds make driving difficult.' });
    }
    if (weatherData.rainIntensity > 0) {
      advisories.push({ type: 'Rain', message: 'Rain makes roads slippery.' });
    }
    if(!((weatherData.temperature > 35) && (weatherData.visibility < 5) || (weatherData.windSpeed > 15) ||(weatherData.rainIntensity > 0))){
      advisories.push({ type: '', message: 'Clear Enviorment.' });
    }
      return advisories;
  }
  