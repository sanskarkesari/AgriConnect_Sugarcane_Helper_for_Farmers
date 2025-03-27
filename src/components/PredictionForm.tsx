
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Loader2 } from 'lucide-react';
import VoiceInput from './VoiceInput';

type FormData = {
  soilType: string;
  district: string;
  village: string;
  area: string;
  areaUnit: 'acres' | 'hectares';
};

type PredictionFormProps = {
  language: 'en' | 'hi';
  onFormSubmit?: (district: string) => void;
};

const soilTypes = [
  { value: 'alluvial', labelEn: 'Alluvial Soil', labelHi: 'जलोढ़ मिट्टी' },
  { value: 'clayLoam', labelEn: 'Clay Loam', labelHi: 'चिकनी दोमट' },
  { value: 'sandyLoam', labelEn: 'Sandy Loam', labelHi: 'बलुई दोमट' },
  { value: 'loam', labelEn: 'Loam', labelHi: 'दोमट' },
  { value: 'clayey', labelEn: 'Clayey', labelHi: 'चिकनी मिट्टी' },
];

const districts = [
  'Lucknow', 'Kanpur', 'Meerut', 'Bareilly', 'Moradabad', 
  'Aligarh', 'Saharanpur', 'Gorakhpur', 'Faizabad', 'Jhansi'
];

const PredictionForm = ({ language, onFormSubmit }: PredictionFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    soilType: '',
    district: '',
    village: '',
    area: '',
    areaUnit: 'acres',
  });
  
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError(null);
  };
  
  const handleVoiceResult = (text: string) => {
    // Simple parsing logic for the demo
    // In a real app, you would use NLP to extract structured data
    console.log("Voice input received:", text);
    
    // Extract soil type
    for (const soil of soilTypes) {
      const searchTerm = language === 'en' ? soil.labelEn.toLowerCase() : soil.labelHi;
      if (text.toLowerCase().includes(searchTerm.toLowerCase())) {
        setFormData(prev => ({ ...prev, soilType: soil.value }));
        break;
      }
    }
    
    // Extract district
    for (const district of districts) {
      if (text.toLowerCase().includes(district.toLowerCase())) {
        setFormData(prev => ({ ...prev, district }));
        break;
      }
    }
    
    // Extract area (simple number extraction)
    const areaMatch = text.match(/\b(\d+(\.\d+)?)\s*(acre|hectare|एकड़|हेक्टेयर)/i);
    if (areaMatch) {
      const areaValue = areaMatch[1];
      const areaUnit = areaMatch[3].toLowerCase().includes('acre') || areaMatch[3].toLowerCase().includes('एकड़') 
        ? 'acres' 
        : 'hectares';
      
      setFormData(prev => ({ ...prev, area: areaValue, areaUnit }));
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.soilType || !formData.district || !formData.area) {
      setError(language === 'en' 
        ? 'Please fill all required fields' 
        : 'कृपया सभी आवश्यक फ़ील्ड भरें');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    // Call the onFormSubmit callback with the district
    if (onFormSubmit) {
      onFormSubmit(formData.district);
    }
    
    // Simulate API call with timeout
    setTimeout(() => {
      // Mock prediction algorithm (would be replaced with actual ML model)
      const areaValue = parseFloat(formData.area);
      const areaFactor = formData.areaUnit === 'hectares' ? 2.47 : 1; // Convert hectares to acres
      
      // Soil type multipliers
      const soilMultipliers: Record<string, number> = {
        alluvial: 85,
        clayLoam: 75,
        sandyLoam: 65,
        loam: 80,
        clayey: 60,
      };
      
      // District rainfall factor (simplified)
      const districtFactors: Record<string, number> = {
        Lucknow: 1.1,
        Kanpur: 1.05,
        Meerut: 1.2,
        Bareilly: 1.15,
        Moradabad: 1.1,
        Aligarh: 1.0,
        Saharanpur: 1.25,
        Gorakhpur: 1.15,
        Faizabad: 1.05,
        Jhansi: 0.9,
      };
      
      // Calculate yield in quintals per acre, then multiply by area
      const yieldPerAcre = soilMultipliers[formData.soilType] * 
        (districtFactors[formData.district] || 1);
      
      const totalYield = yieldPerAcre * areaValue * areaFactor;
      
      setPrediction(Math.round(totalYield));
      setLoading(false);
    }, 2000);
  };
  
  return (
    <div id="predict" className="w-full">
      <motion.div 
        className="neo-card p-6 md:p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-medium text-gray-800">
            {language === 'en' ? 'Yield Prediction' : 'उपज भविष्यवाणी'}
          </h2>
          <VoiceInput 
            language={language} 
            onResult={handleVoiceResult} 
          />
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="soilType" className="block text-sm font-medium text-gray-700">
                {language === 'en' ? 'Soil Type' : 'मिट्टी का प्रकार'} *
              </label>
              <select
                id="soilType"
                name="soilType"
                value={formData.soilType}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sugarcane-500 focus:border-transparent"
                required
              >
                <option value="">
                  {language === 'en' ? 'Select Soil Type' : 'मिट्टी का प्रकार चुनें'}
                </option>
                {soilTypes.map(soil => (
                  <option key={soil.value} value={soil.value}>
                    {language === 'en' ? soil.labelEn : soil.labelHi}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="district" className="block text-sm font-medium text-gray-700">
                {language === 'en' ? 'District' : 'जिला'} *
              </label>
              <select
                id="district"
                name="district"
                value={formData.district}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sugarcane-500 focus:border-transparent"
                required
              >
                <option value="">
                  {language === 'en' ? 'Select District' : 'जिला चुनें'}
                </option>
                {districts.map(district => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="village" className="block text-sm font-medium text-gray-700">
                {language === 'en' ? 'Village/Town' : 'गांव/शहर'}
              </label>
              <input
                type="text"
                id="village"
                name="village"
                value={formData.village}
                onChange={handleChange}
                placeholder={language === 'en' ? 'Enter village name' : 'गांव का नाम दर्ज करें'}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sugarcane-500 focus:border-transparent"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="area" className="block text-sm font-medium text-gray-700">
                {language === 'en' ? 'Land Area' : 'भूमि क्षेत्र'} *
              </label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  id="area"
                  name="area"
                  min="0.1"
                  step="0.1"
                  value={formData.area}
                  onChange={handleChange}
                  placeholder={language === 'en' ? 'Enter area' : 'क्षेत्र दर्ज करें'}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sugarcane-500 focus:border-transparent"
                  required
                />
                <select
                  name="areaUnit"
                  value={formData.areaUnit}
                  onChange={handleChange}
                  className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sugarcane-500 focus:border-transparent"
                >
                  <option value="acres">
                    {language === 'en' ? 'Acres' : 'एकड़'}
                  </option>
                  <option value="hectares">
                    {language === 'en' ? 'Hectares' : 'हेक्टेयर'}
                  </option>
                </select>
              </div>
            </div>
          </div>
          
          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}
          
          <div className="flex justify-center pt-4">
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="w-full md:w-auto px-8 py-3 bg-sugarcane-600 text-white rounded-lg hover:bg-sugarcane-700 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <>
                  <Loader2 size={20} className="mr-2 animate-spin" />
                  {language === 'en' ? 'Processing...' : 'प्रोसेसिंग...'}
                </>
              ) : (
                <>
                  {language === 'en' ? 'Predict Yield' : 'उपज की भविष्यवाणी करें'}
                </>
              )}
            </motion.button>
          </div>
        </form>
        
        {prediction !== null && (
          <motion.div 
            className="mt-8 p-6 bg-sugarcane-50 border border-sugarcane-100 rounded-lg"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-xl font-medium text-sugarcane-800 mb-2">
              {language === 'en' ? 'Predicted Yield:' : 'अनुमानित उपज:'}
            </h3>
            <div className="flex items-center justify-center mt-3">
              <span className="text-4xl font-bold text-sugarcane-700">{prediction}</span>
              <span className="ml-2 text-lg text-sugarcane-600">
                {language === 'en' ? 'quintals' : 'क्विंटल'}
              </span>
            </div>
            <p className="text-sm text-gray-600 mt-4 text-balance">
              {language === 'en' 
                ? 'This prediction is based on historical data, soil type, and regional weather patterns. Actual yield may vary based on irrigation practices, pest management, and other farming techniques.' 
                : 'यह भविष्यवाणी ऐतिहासिक डेटा, मिट्टी के प्रकार और क्षेत्रीय मौसम पैटर्न पर आधारित है। वास्तविक उपज सिंचाई प्रथाओं, कीट प्रबंधन और अन्य कृषि तकनीकों के आधार पर भिन्न हो सकती है।'}
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default PredictionForm;
