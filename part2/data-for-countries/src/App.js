import React, { useState, useEffect } from 'react';
import './App.css';
import Axios from 'axios';

const api_key = process.env.REACT_APP_API_KEY;

function App() {
  const [countries, setCountries] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [weather, setWeather] = useState([]);

  const handleSearchQuery = (event) => {
    setSearchQuery(event.target.value);
  };

  const getWeather = (location) => {
    // const weatherStackUrl = `http://api.weatherstack.com/current?access_key=${api_key}&query=${location}`;
    Axios.get(
      `http://api.weatherstack.com/current?access_key=${api_key}&query=${location}`
    ).then((response) => {
      let newWeather = {};
      newWeather.location = response.data.location.name;
      newWeather.temperature = response.data.current.temperature;
      newWeather.wind_speed = response.data.current.wind_speed;
      newWeather.wind_degree = response.data.current.wind_degree;
      newWeather.wind_dir = response.data.current.wind_dir;
      newWeather.icon = response.data.current.weather_icons[0];

      setWeather(newWeather);
    });
  };

  const queriedCountries = (query, countryList) => {
    const filteredCountries = countryList.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    if (filteredCountries.length > 10) {
      return <p>Too many matches. Make a more specific search</p>;
    }

    if (filteredCountries.length === 1) {
      getWeather(filteredCountries[0].name);
      return (
        <div>
          <h1>{filteredCountries[0].name}</h1>
          <p>capital - {filteredCountries[0].capital}</p>
          <p>population - {filteredCountries[0].population}</p>
          <p>languages</p>
          <ul>
            {filteredCountries[0].languages.map((language) => (
              <li>{language.name}</li>
            ))}
          </ul>
          <img src={filteredCountries[0].flag} width="200" height="200" />
          <div>
            <p>The weather in {weather.location}</p>
            <p>Temperature is {weather.temperature}</p>
            <img src={weather.icon} />
            <p>
              Wind is {weather.wind_speed} mph direction {weather.wind_dir}
            </p>
          </div>
          {console.log(weather)}
        </div>
      );
    } else {
      return filteredCountries.map((country) => (
        <p>
          {country.name}{' '}
          <button onClick={() => handleButtonClick(country.name)}>Show</button>
        </p>
      ));
    }
  };

  const handleButtonClick = (selectedCountry) => {
    setSearchQuery(selectedCountry);
  };
  const ShownCountries = () => {
    if (countries && searchQuery === '') {
      return countries.map((country) => <p>{country.name}</p>);
    } else {
      return queriedCountries(searchQuery, countries);
    }
  };

  useEffect(() => {
    Axios.get('https://restcountries.eu/rest/v2/all').then((response) => {
      setCountries(response.data);
    });
  }, []);
  return (
    <div>
      <input type="text" value={searchQuery} onChange={handleSearchQuery} />

      <div>{ShownCountries()}</div>
    </div>
  );
}

export default App;
