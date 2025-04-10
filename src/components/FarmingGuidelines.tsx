interface FarmingGuidelinesProps {
  weather: 'sunny' | 'cloudy' | 'rainy';
  season: 'summer' | 'monsoon' | 'winter';
}

const FarmingGuidelines: React.FC<FarmingGuidelinesProps> = ({ weather, season }) => {
  const guidelines = {
    summer: {
      sunny: {
        en: [
          "Maintain proper irrigation schedule - water every 5-7 days",
          "Apply mulching to retain soil moisture",
          "Best time for early morning irrigation",
          "Monitor for pests that thrive in warm conditions"
        ],
        hi: [
          "उचित सिंचाई कार्यक्रम बनाए रखें - हर 5-7 दिनों में पानी दें",
          "मिट्टी की नमी बनाए रखने के लिए मल्चिंग करें",
          "सुबह की सिंचाई का सबसे अच्छा समय",
          "गर्म परिस्थितियों में पनपने वाले कीटों की निगरानी करें"
        ]
      },
      cloudy: {
        en: [
          "Reduce irrigation frequency",
          "Watch for fungal disease development",
          "Monitor humidity levels",
          "Prepare for possible rain"
        ],
        hi: [
          "सिंचाई की आवृत्ति कम करें",
          "फफूंदी रोग के विकास पर नज़र रखें",
          "नमी के स्तर की निगरानी करें",
          "संभावित बारिश के लिए तैयार रहें"
        ]
      },
      rainy: {
        en: [
          "Ensure proper drainage",
          "Apply fungicides if needed",
          "Avoid waterlogging",
          "Monitor for disease outbreak"
        ],
        hi: [
          "उचित जल निकासी सुनिश्चित करें",
          "यदि आवश्यक हो तो फफूंदनाशक का प्रयोग करें",
          "जलभराव से बचें",
          "रोग प्रकोप की निगरानी करें"
        ]
      }
    },
    monsoon: {
      // Similar structure for monsoon season
      // Add monsoon specific guidelines
    },
    winter: {
      // Similar structure for winter season
      // Add winter specific guidelines
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Farming Guidelines / कृषि दिशानिर्देश
      </h2>

      <div className="grid md:grid-cols-2 gap-8">
        {/* English Guidelines */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-700">
            Current Conditions
          </h3>
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-sm text-gray-600">
              Weather: <span className="font-medium text-blue-700">{weather}</span>
            </p>
            <p className="text-sm text-gray-600">
              Season: <span className="font-medium text-blue-700">{season}</span>
            </p>
          </div>
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Recommended Practices (English)</h4>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              {guidelines[season]?.[weather]?.en.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Hindi Guidelines */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-700">
            वर्तमान स्थिति
          </h3>
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-sm text-gray-600">
              मौसम: <span className="font-medium text-blue-700">{weather}</span>
            </p>
            <p className="text-sm text-gray-600">
              ऋतु: <span className="font-medium text-blue-700">{season}</span>
            </p>
          </div>
          <div>
            <h4 className="font-medium text-gray-700 mb-2">अनुशंसित प्रथाएं (हिंदी)</h4>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              {guidelines[season]?.[weather]?.hi.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmingGuidelines; 