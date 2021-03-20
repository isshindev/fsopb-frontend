import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Header, Text, Image } from '../components';

export default function Weather({ city }) {
    const [weather, setWeather] = useState();
    const apiKey = process.env.REACT_APP_OPEN_WEATHER;

    useEffect(() => {
        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
            .then(response => {
                setWeather(response.data);
            })
            .catch(err => console.log(err));
    }, []);

    return !weather ? null : (
        <div>
            <Header grade="1">Weather in {city}</Header>

            <Text><strong>temperature</strong>: {weather.main.temp} Celcius</Text>
            <Image src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />
            <Text><strong>wind:</strong> {weather.wind.speed} kph {weather.wind.deg}</Text>
        </div>
    );

}