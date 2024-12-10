import React, { useEffect, useState } from 'react';
import { getWeatherForecast, formatDate } from '../helper';
import WeatherCard from './WeatherCard';
import styled from 'styled-components';

const ForecastContainer = styled.div`
  padding: 5px;
  align-items: center;
`;

const ForecastMain = styled.div`
  display: flex;
`;

const WeatherForecast = ({tripLocation}) => {
    const [forecastError, setForecastError] = useState("");
    const [fiveDayForecast, setFiveDayForecast] = useState([]);

    function findIcon(number) {
        const numFmt = number.toString().padStart(2, '0');

        return `images/weather_icons_by_id/${numFmt}.png`
    }

    useEffect(()=> {
        console.log("getting weather for ", tripLocation);

        getWeatherForecast(tripLocation)
            .then(data => {
                console.log(data)
                if (data?.DailyForecasts) {
                    const weatherArr = data.DailyForecasts.map(day => ({
                        date: formatDate(day.Date),
                        tempMin: day.Temperature.Minimum.Value,
                        tempMax: day.Temperature.Maximum.Value,
                        iconDay: findIcon(day.Day.Icon),
                        descrDay: day.Day.IconPhrase,
                        iconNight: findIcon(day.Night.Icon),
                        descrNight: day.Night.IconPhrase, 
                    }));
    
                    console.log(weatherArr);
                    setFiveDayForecast(weatherArr);
                } else {
                    console.error("Daily Forecast data is not available at this time");
                    setFiveDayForecast([]); // Set an empty forecast to avoid breaking the app
                    setForecastError("");
                }
            })
            .catch(error => {
                console.error("Failed to fetch weather data:", error);
                setFiveDayForecast([]); // Handle API failure by setting an empty array
                setForecastError("");
            });
    }, [tripLocation]);

    if (forecastError!=="") return <p>{forecastError}</p>
    if (fiveDayForecast.length===0) return <p></p>

    return (
        <ForecastContainer>
            <h3>{`5-day Forecast for ${tripLocation}`}</h3>
            <ForecastMain>
                {fiveDayForecast.map(day=>
                    <WeatherCard
                        key={day.date}
                        {...day}
                    />
                )}
            </ForecastMain>
        </ForecastContainer>
    );
}

export default WeatherForecast;
