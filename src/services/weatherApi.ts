
// Types for weather data
export type WeatherApiResponse = {
  location: {
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
  };
  current: {
    temp_c: number;
    temp_f: number;
    condition: {
      text: string;
      icon: string;
      code: number;
    };
    wind_kph: number;
    wind_mph: number;
    humidity: number;
    precip_mm: number;
    cloud: number;
    feelslike_c: number;
    feelslike_f: number;
    uv: number;
  };
  forecast: {
    forecastday: Array<{
      date: string;
      day: {
        maxtemp_c: number;
        mintemp_c: number;
        avgtemp_c: number;
        maxwind_kph: number;
        totalprecip_mm: number;
        avghumidity: number;
        condition: {
          text: string;
          icon: string;
          code: number;
        };
        uv: number;
      };
      astro: {
        sunrise: string;
        sunset: string;
      };
      hour: Array<{
        time: string;
        temp_c: number;
        condition: {
          text: string;
          icon: string;
          code: number;
        };
        precip_mm: number;
        humidity: number;
        wind_kph: number;
      }>;
    }>;
  };
};

// Function to fetch weather data for a specific district
export const fetchWeatherData = async (district: string, days: number = 5): Promise<WeatherApiResponse | null> => {
  try {
    // Replace this with your actual weather API endpoint and API key
    // For example, using WeatherAPI.com
    const apiKey = 'YOUR_WEATHER_API_KEY'; // Replace with your actual API key or use environment variables
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${district},Uttar Pradesh,India&days=${days}`;
    
    // For development, we'll return mock data
    if (process.env.NODE_ENV === 'development') {
      return getMockWeatherData(district);
    }

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return null;
  }
};

// Mock data for development
const getMockWeatherData = (district: string): WeatherApiResponse => {
  // Generate random weather data for the district
  const current = {
    temp_c: 25 + Math.random() * 10,
    temp_f: 77 + Math.random() * 18,
    condition: {
      text: Math.random() > 0.7 ? 'Partly cloudy' : Math.random() > 0.4 ? 'Sunny' : 'Light rain',
      icon: '//cdn.weatherapi.com/weather/64x64/day/116.png',
      code: 1003
    },
    wind_kph: 5 + Math.random() * 15,
    wind_mph: 3 + Math.random() * 9,
    humidity: 60 + Math.random() * 30,
    precip_mm: Math.random() * 5,
    cloud: Math.random() * 100,
    feelslike_c: 25 + Math.random() * 10,
    feelslike_f: 77 + Math.random() * 18,
    uv: 5 + Math.random() * 5
  };

  const forecastDays = [];
  const today = new Date();
  
  for (let i = 0; i < 5; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    const dateStr = date.toISOString().split('T')[0];
    
    forecastDays.push({
      date: dateStr,
      day: {
        maxtemp_c: current.temp_c + Math.random() * 5,
        mintemp_c: current.temp_c - Math.random() * 5,
        avgtemp_c: current.temp_c,
        maxwind_kph: current.wind_kph + Math.random() * 10,
        totalprecip_mm: Math.random() * 10,
        avghumidity: current.humidity,
        condition: {
          text: current.condition.text,
          icon: current.condition.icon,
          code: current.condition.code
        },
        uv: current.uv
      },
      astro: {
        sunrise: '06:30 AM',
        sunset: '06:30 PM'
      },
      hour: []
    });
  }

  return {
    location: {
      name: district,
      region: 'Uttar Pradesh',
      country: 'India',
      lat: 26.85 + Math.random(),
      lon: 80.91 + Math.random()
    },
    current: current,
    forecast: {
      forecastday: forecastDays
    }
  };
};
