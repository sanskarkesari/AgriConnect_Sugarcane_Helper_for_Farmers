// Types for weather data
export type WeatherApiResponse = {
  address: string;
  latitude: number;
  longitude: number;
  timezone: string;
  currentConditions: {
    temp: number;
    humidity: number;
    windspeed: number;
    winddir: number;
    conditions: string;
    icon: string;
    sunrise: string;
    sunset: string;
    uvindex: number;
    visibility: number;
  };
  days: Array<{
    datetime: string;
    tempmax: number;
    tempmin: number;
    temp: number;
    conditions: string;
    description: string;
    humidity: number;
    precip: number;
    windspeed: number;
    sunrise: string;
    sunset: string;
    hours: Array<{
      datetime: string;
      temp: number;
      conditions: string;
      precip: number;
      humidity: number;
      windspeed: number;
    }>;
  }>;
};

// Function to fetch weather data for a specific district using OpenWeather API
export const fetchWeatherData = async (district: string): Promise<WeatherApiResponse | null> => {
  try {
    const apiKey = 'ae8a479a0660072aa92b17e7e6f1eb1d';
    const location = `${district}, Uttar Pradesh, India`;
    const encodedLocation = encodeURIComponent(location);

    // Step 1: Get coordinates
    const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${encodedLocation}&limit=1&appid=${apiKey}`;
    const geoRes = await fetch(geoUrl);
    const geoData = await geoRes.json();

    if (!geoData.length) throw new Error('Location not found');

    const { lat, lon, name } = geoData[0];

    // Step 2: Get current weather
    const currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    const currentRes = await fetch(currentUrl);
    const current = await currentRes.json();

    // Step 3: Get forecast
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    const forecastRes = await fetch(forecastUrl);
    const forecast = await forecastRes.json();

    // Step 4: Group forecast by date
    const groupedByDay: { [key: string]: any[] } = {};
    for (const item of forecast.list) {
      const date = item.dt_txt.split(' ')[0];
      if (!groupedByDay[date]) groupedByDay[date] = [];
      groupedByDay[date].push(item);
    }

    const days = Object.entries(groupedByDay).map(([date, hourlyData]) => {
      const temps = hourlyData.map((h) => h.main.temp);
      const humidities = hourlyData.map((h) => h.main.humidity);
      const windspeeds = hourlyData.map((h) => h.wind.speed);
      const descriptions = hourlyData.map((h) => h.weather[0].description);

      return {
        datetime: date,
        tempmax: Math.max(...temps),
        tempmin: Math.min(...temps),
        temp: temps.reduce((a, b) => a + b) / temps.length,
        conditions: hourlyData[0].weather[0].main,
        description: descriptions[0],
        humidity: humidities.reduce((a, b) => a + b) / humidities.length,
        precip: hourlyData[0].pop ?? 0,
        windspeed: windspeeds.reduce((a, b) => a + b) / windspeeds.length,
        sunrise: current.sys.sunrise ? new Date(current.sys.sunrise * 1000).toLocaleTimeString() : '06:00',
        sunset: current.sys.sunset ? new Date(current.sys.sunset * 1000).toLocaleTimeString() : '18:00',
        hours: hourlyData.map((h) => ({
          datetime: h.dt_txt,
          temp: h.main.temp,
          conditions: h.weather[0].main,
          precip: h.pop ?? 0,
          humidity: h.main.humidity,
          windspeed: h.wind.speed
        }))
      };
    });

    return {
      address: `${name}, Uttar Pradesh, India`,
      latitude: lat,
      longitude: lon,
      timezone: forecast.city.timezone?.toString() ?? 'Asia/Kolkata',
      currentConditions: {
        temp: current.main.temp,
        humidity: current.main.humidity,
        windspeed: current.wind.speed,
        winddir: current.wind.deg,
        conditions: current.weather[0].main,
        icon: current.weather[0].icon,
        sunrise: new Date(current.sys.sunrise * 1000).toLocaleTimeString(),
        sunset: new Date(current.sys.sunset * 1000).toLocaleTimeString(),
        uvindex: 0, // OpenWeather's free tier does not return UV index
        visibility: current.visibility / 1000 // Convert to km
      },
      days
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return null;
  }
};
