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

const WeatherForecast = ({location}) => {
    const [forecastError, setForecastError] = useState("");
    const [fiveDayForecast, setFiveDayForecast] = useState([]);

    function findIcon(number) {
        const numFmt = number.toString().padStart(2, '0');

        return `images/weather_icons_by_id/${numFmt}.png`
    }

    useEffect(()=> {
        console.log("getting weather for ", location);

        getWeatherForecast(location)
        .then(data => {
            console.log(data)
            const weatherArr = data.DailyForecasts.map(day=> ({
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
        })
    }, [location])

    if (fiveDayForecast.length===0) return <p>Loading forecast...</p>

    return (
        <ForecastContainer>
            <h3>{`5-day Forecast for ${location}`}</h3>
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
