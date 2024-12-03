import React from 'react';
import styled from 'styled-components';

const ForecastCard = styled.div`
  margin: 5px;
  background-color: white;
  width: 20%;
  border-radius: 10px;
  text-align: center;

  h2 {
    width: 100%;
    background-color: var(--blue);
    color: white;
    border-radius: 5px;
    border-bottom: 1px solid var(--navy);
    font-size: 15px;
    font-weight: bold;
  }

  h3 {
    font-size: 10px;
    font-weight: bold;
    text-decoration: underline;
  }

  p {
    font-size: 10px;
  }

  img {
    position: absolute;
    bottom: 0px;
    left: 50%;
    transform: translateX(-50%);
  }

  &:hover {
    zoom: 130%;
    width: 30%;
  }
`
const ForecastSummary = styled.div`
  padding: 5px;
`

const DayNightSplit = styled.div`
  display: flex;
  padding: 10px 5px 5px 5px;

  div {
    position: relative;
    width: 50%;
    height: 125px;
  }
`

const WeatherDay = styled.div`
  border: .1px solid var(--navy);
  color: var(--navy);
`

const WeatherNight = styled.div`
  background-color: var(--navy);
  color: white;
`

const WeatherCard = ({date, tempMin, tempMax, descrDay, iconDay, descrNight, iconNight}) => {
    return (
        <ForecastCard>
            <ForecastSummary>
                <h2>{date}</h2>
                <p>{`High/Low: ${tempMin}°/${tempMax}°F`}</p>
            </ForecastSummary>
            <DayNightSplit>
                <WeatherDay>
                    <h3>Day</h3>
                    <p>{descrDay}</p>
                    <img src={iconDay} alt={descrDay}/>
                </WeatherDay>
                <WeatherNight>
                    <h3>Night</h3>
                    <p>{descrNight}</p>
                    <img src={iconNight} alt={descrNight}/>
                </WeatherNight>
            </DayNightSplit>
        </ForecastCard>
    );
}

export default WeatherCard;
