import React from 'react'
import { getFarmingAdvisory, getTravelAdvisory } from '../../constant/AdvisoriesSuggestion';
import { IWeatherData } from '../../types/weather';

interface IWeatherAnalysis{
    weatherAnalysisData: IWeatherData
}
const Advisory:React.FC<IWeatherAnalysis> = ({
weatherAnalysisData
}) => {
    const farmingAdvisories = getFarmingAdvisory(weatherAnalysisData);
    const travelAdvisories = getTravelAdvisory(weatherAnalysisData);
    return (
        <div>
          <h1>Weather Advisories</h1>
          <h2>Farming Advisories</h2>
          <ul>
            {farmingAdvisories.map((advisory, index) => (
              <li key={index}>{advisory.message}</li>
            ))}
          </ul>
          <h2>Travel Advisories</h2>
          <ul>
            {travelAdvisories.map((advisory, index) => (
              <li key={index}>{advisory.message}</li>
            ))}
          </ul>
        </div>
      );
}

export default Advisory