
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CloudRain, CloudSun, Droplets, Wind, Thermometer, Calendar } from 'lucide-react';

type WeatherDisplayProps = {
  language: 'en' | 'hi';
  district: string;
};

type WeatherData = {
  date: string;
  condition: 'sunny' | 'cloudy' | 'rainy';
  tempMax: number;
  tempMin: number;
  humidity: number;
  rainfall: number;
  windSpeed: number;
};

const WeatherDisplay = ({ language, district }: WeatherDisplayProps) => {
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API call to fetch weather data
    const fetchWeatherData = () => {
      setLoading(true);
      
      // Simulate API delay
      setTimeout(() => {
        // Generate mock data for the next 5 days
        const today = new Date();
        const mockData: WeatherData[] = [];
        
        const conditions: ('sunny' | 'cloudy' | 'rainy')[] = ['sunny', 'cloudy', 'rainy'];
        
        for (let i = 0; i < 5; i++) {
          const date = new Date(today);
          date.setDate(today.getDate() + i);
          
          const dayStr = date.toLocaleDateString(language === 'en' ? 'en-US' : 'hi-IN', {
            weekday: 'short',
            month: 'short',
            day: 'numeric'
          });
          
          // Randomize weather conditions
          const condition = conditions[Math.floor(Math.random() * conditions.length)];
          const tempMax = Math.round(28 + Math.random() * 8);
          const tempMin = Math.round(tempMax - (4 + Math.random() * 5));
          const humidity = Math.round(60 + Math.random() * 30);
          const rainfall = condition === 'rainy' ? Math.round(Math.random() * 25 * 10) / 10 : 0;
          const windSpeed = Math.round(5 + Math.random() * 15);
          
          mockData.push({
            date: dayStr,
            condition,
            tempMax,
            tempMin,
            humidity,
            rainfall,
            windSpeed
          });
        }
        
        setWeatherData(mockData);
        setLoading(false);
      }, 1500);
    };
    
    fetchWeatherData();
  }, [language, district]);
  
  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case 'sunny':
        return <CloudSun size={32} className="text-yellow-500" />;
      case 'cloudy':
        return <CloudSun size={32} className="text-gray-500" />;
      case 'rainy':
        return <CloudRain size={32} className="text-blue-500" />;
      default:
        return <CloudSun size={32} className="text-yellow-500" />;
    }
  };
  
  const getWeatherLabel = (condition: string) => {
    if (language === 'en') {
      switch (condition) {
        case 'sunny': return 'Sunny';
        case 'cloudy': return 'Cloudy';
        case 'rainy': return 'Rainy';
        default: return 'Unknown';
      }
    } else {
      switch (condition) {
        case 'sunny': return 'धूप';
        case 'cloudy': return 'बादल';
        case 'rainy': return 'बारिश';
        default: return 'अज्ञात';
      }
    }
  };
  
  // Calculate average rainfall based on 5-day forecast
  const averageRainfall = weatherData.length 
    ? (weatherData.reduce((sum, day) => sum + day.rainfall, 0) / weatherData.length).toFixed(1)
    : '0';
  
  return (
    <div id="weather" className="w-full">
      <motion.div 
        className="neo-card p-6 md:p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-medium text-gray-800">
            {language === 'en' ? 'Weather Forecast' : 'मौसम का पूर्वानुमान'}
          </h2>
          {district && (
            <div className="flex items-center text-sm text-gray-500">
              <span className="hidden md:inline mr-2">
                {language === 'en' ? 'Location:' : 'स्थान:'}
              </span>
              <span className="font-medium text-gray-700">{district}</span>
            </div>
          )}
        </div>
        
        {loading ? (
          <div className="h-48 flex items-center justify-center">
            <div className="loading h-8 w-8 relative"></div>
          </div>
        ) : (
          <>
            <div className="mb-8 bg-sky-50 rounded-lg p-4 border border-sky-100">
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div className="flex items-center mb-4 md:mb-0">
                  <div className="p-3 bg-white rounded-full shadow-soft mr-4">
                    <Droplets size={24} className="text-sky-500" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-600">
                      {language === 'en' ? 'Average Rainfall' : 'औसत वर्षा'}
                    </h3>
                    <p className="text-2xl font-semibold text-sky-700">
                      {averageRainfall} <span className="text-sm font-normal text-sky-600">mm</span>
                    </p>
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  {language === 'en' 
                    ? 'Based on the 5-day forecast. This data helps estimate irrigation needs for your crops.' 
                    : '5-दिवसीय पूर्वानुमान के आधार पर। यह डेटा आपकी फसलों के लिए सिंचाई की जरूरतों का अनुमान लगाने में मदद करता है।'}
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              {weatherData.map((day, index) => (
                <motion.div 
                  key={index} 
                  className="bg-white rounded-lg p-4 shadow-soft border border-gray-100 flex flex-col items-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                >
                  <div className="flex items-center text-sm text-gray-600 mb-2">
                    <Calendar size={14} className="mr-1" />
                    <span>{day.date}</span>
                  </div>
                  
                  <div className="my-2">
                    {getWeatherIcon(day.condition)}
                  </div>
                  
                  <div className="text-center mb-3">
                    <span className="text-sm font-medium">
                      {getWeatherLabel(day.condition)}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between w-full text-sm">
                    <div className="flex items-center">
                      <Thermometer size={14} className="mr-1 text-red-500" />
                      <span>{day.tempMax}°C</span>
                    </div>
                    <div className="flex items-center">
                      <Thermometer size={14} className="mr-1 text-blue-400" />
                      <span>{day.tempMin}°C</span>
                    </div>
                  </div>
                  
                  {day.condition === 'rainy' && (
                    <div className="mt-2 text-sm flex items-center text-blue-600">
                      <Droplets size={14} className="mr-1" />
                      <span>{day.rainfall} mm</span>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
            
            <div className="mt-6 text-sm text-gray-500">
              <p>
                {language === 'en' 
                  ? 'Weather data is updated daily. Historical data shows that weather patterns significantly impact sugarcane yield in Uttar Pradesh.' 
                  : 'मौसम डेटा दैनिक रूप से अपडेट किया जाता है। ऐतिहासिक डेटा दिखाता है कि मौसम के पैटर्न उत्तर प्रदेश में गन्ने की उपज को महत्वपूर्ण रूप से प्रभावित करते हैं।'}
              </p>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default WeatherDisplay;
