import axios from 'axios';

// const API_URL = 'https://api.geopol.io/v1/endpoint';
const API_KEY = import.meta.env.VITE_LOCATION_API_KEY; 
const GEOCODING_API_URL = import.meta.env.VITE_GEOCODING_API_URL;

export const getGeolocationData = async (lat: number, lng: number) => {
    try {
      const response = await axios.get(GEOCODING_API_URL, {
        params: {
          latlng: `${lat},${lng}`,
          key: API_KEY
        }
      });
      return response.data;
    } catch (error) {
        console.log(error,"location error")
    //   throw new Error(error.response?.data?.error_message || error.message);
    }
  };

 