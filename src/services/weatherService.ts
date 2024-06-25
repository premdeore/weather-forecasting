import axios from 'axios';
// import env from "react-dotenv"

const API_KEY = 'NvvPdWHGApZykAXP4nZzzXgQD9W3l2Xh'; // Replace with your Tomorrow.io API key
const BASE_URL = 'https://api.tomorrow.io/v4/weather/realtime';

export const getWeather = async (city:string) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        location: city,
        apikey: API_KEY,
      },
      headers: { accept: 'application/json' },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};



















// // src/services/weatherService.ts
// import axios from 'axios';

// const API_KEY = 'GG4ZeZ4n9CYvmhE3bLqZXJ7nit61gDjC'; // Replace with your OpenWeatherMap API key
// const BASE_URL = 'https://api.tomorrow.io/v4/weather/realtime?location=Ahmedabad&apikey=GG4ZeZ4n9CYvmhE3bLqZXJ7nit61gDjC';

// export const getWeather = async (city: string) => {
//   const response = await axios.get(`${BASE_URL}/weather`, {
//     params: {
//       q: city,
//       appid: API_KEY,
//       units: 'metric',
//     },
//   });
//   return response.data;
// };



