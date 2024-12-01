import React, { useEffect, useState } from 'react';
import { getWeatherForecast, formatDate } from '../helper';
import WeatherCard from './WeatherCard';

const WeatherForecast = ({location, startDate}) => {
    const [fiveDayForecast, setFiveDayForecast] = useState([]);

    function findIcon(number) {
        const numFmt = number.toString().padStart(2, '0');

        return `images/weather_icons_by_id/${numFmt}.png`
    }

    useEffect(()=> {
        getWeatherForecast(location)
        .then(data => {
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
    }, [])

    if (fiveDayForecast.length===0) return <p>Loading forecast...</p>

    return (
        <div class="forecast-container">
            {fiveDayForecast.map(day=>
                <WeatherCard
                    key={day.date}
                    {...day}
                />
            )}
        </div>
    );
}

export default WeatherForecast;
