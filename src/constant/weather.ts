import { IWeatherforcastdata } from "../types/weather";

export const Weatherforcastdata: IWeatherforcastdata = {
  data: {
    time: "",
    values: {
      cloudBase: 0,
      cloudCeiling: 0,
      cloudCover: 0,
      dewPoint: 0,
      freezingRainIntensity: 0,
      humidity: 0,
      precipitationProbability: 0,
      pressureSurfaceLevel: 0,
      rainIntensity: 0,
      sleetIntensity: 0,
      snowIntensity: 0,
      temperature: 0,
      temperatureApparent: 0,
      uvHealthConcern: 0,
      uvIndex: 0,
      visibility: 0,
      weatherCode: 0,
      windDirection: 0,
      windGust: 0,
      windSpeed: 0
    }
  },
  location: {
    lat: 0,
    lon: 0,
    name: "",
    type: ""
  }
}


export const weatherConditions: { [key: number]: string } = {
  1000: "Clear",
  1100: "Mostly Clear",
  1101: "Partly Cloudy",
  1102: "Mostly Cloudy",
  1001: "Cloudy",
  2000: "Fog",
  2100: "Light Fog",
  4000: "Drizzle",
  4001: "Rain",
  4200: "Light Rain",
  4201: "Heavy Rain",
  5000: "Snow",
  5001: "Flurries",
  5100: "Light Snow",
  5101: "Heavy Snow",
  6000: "Freezing Drizzle",
  6001: "Freezing Rain",
  6200: "Light Freezing Rain",
  6201: "Heavy Freezing Rain",
  7000: "Ice Pellets",
  7101: "Heavy Ice Pellets",
  7102: "Light Ice Pellets",
  8000: "Thunderstorm"
};