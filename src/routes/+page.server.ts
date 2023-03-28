import {colors, daytimeWeatherIcons, nighttimeWeatherIcons, stubbedWeather, stubbedForecast } from '../data';

export async function load({ url }) {
  let weather;
  let forecast;

  if (import.meta.env.PROD) {
    const appid = import.meta.env.VITE_OPEN_WEATHER_API_KEY;
    const lat = url.searchParams.get('lat')
    const lon = url.searchParams.get('lon')


    console.log("fetching weather");
    weather = await fetch('http://api.openweathermap.org/data/2.5/weather?' + new URLSearchParams({
      lat,
      lon,
      appid,
      units: 'imperial'
    }));
    weather = await weather.json();
    
    console.log("fetching forecast");
    forecast = await fetch('http://api.openweathermap.org/data/2.5/forecast?' + new URLSearchParams({
      lat,
      lon,
      appid,
      units: 'imperial',
      cnt: 8 
    }));
    forecast = await forecast.json();
  } else {
    weather = stubbedWeather;
    forecast = stubbedForecast;
  }

  return {
    weather,
    forecast,
    colors,
  };
}
