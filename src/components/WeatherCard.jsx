import React from 'react';


const WeatherCard = ({date, tempMin, tempMax, descrDay, iconDay, descrNight, iconNight}) => {
    return (
        <div className="forecast-card">
            <div className="forecast-summary">
                <p>{`Date: ${date}`}</p>
                <p>{`Min: ${tempMin}°F`}</p>
                <p>{`Max: ${tempMax}°F`}</p>
            </div>
            <div className="day-night-split">
                <div>
                    <h3>Day</h3>
                    <p>{descrDay}</p>
                    <img src={iconDay} alt={descrDay}/>
                </div>
                <div>
                    <h3>Night</h3>
                    <p>{descrNight}</p>
                    <img src={iconNight} alt={descrNight}/>
                </div>
            </div>
        </div>
    );
}

export default WeatherCard;
