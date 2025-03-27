
import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Mic, MicOff, Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

type AskDoubtProps = {
  language: 'en' | 'hi';
};

const AskDoubt = ({ language }: AskDoubtProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const startRecording = () => {
    setIsRecording(true);
    // Here you would implement the actual voice recording logic
    // For now, we'll just simulate it
    console.log('Started recording...');
  };

  const stopRecording = () => {
    setIsRecording(false);
    // Here you would implement the logic to stop recording and process the voice input
    console.log('Stopped recording...');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    setLoading(true);
    
    // Simulate API call to get answer
    // This would be replaced with an actual API call to your ML model or knowledge base
    setTimeout(() => {
      // Mock response based on keywords in the question
      let response = '';
      
      if (question.toLowerCase().includes('disease')) {
        response = language === 'en' 
          ? 'Common sugarcane diseases in UP include Red Rot, Smut, and Leaf Scald. Early detection and proper treatment are essential for crop health.'
          : 'उत्तर प्रदेश में गन्ने के सामान्य रोगों में लाल सड़ांध, कंडुआ और पत्ता झुलसा शामिल हैं। फसल के स्वास्थ्य के लिए जल्दी पता लगाना और उचित उपचार आवश्यक है।';
      } else if (question.toLowerCase().includes('water') || question.toLowerCase().includes('irrigation')) {
        response = language === 'en'
          ? 'Sugarcane requires adequate water throughout its growth cycle. In UP, irrigation is typically needed every 10-15 days depending on the season and rainfall patterns.'
          : 'गन्ने को अपने विकास चक्र के दौरान पर्याप्त पानी की आवश्यकता होती है। उत्तर प्रदेश में, मौसम और वर्षा पैटर्न के आधार पर आमतौर पर हर 10-15 दिनों में सिंचाई की आवश्यकता होती है।';
      } else if (question.toLowerCase().includes('fertilizer')) {
        response = language === 'en'
          ? 'For sugarcane in UP, a balanced NPK fertilizer is recommended. Apply in split doses: at planting, after 45-60 days, and after 90-120 days for best results.'
          : 'उत्तर प्रदेश में गन्ने के लिए, एक संतुलित NPK उर्वरक की सिफारिश की जाती है। सर्वोत्तम परिणामों के लिए विभाजित खुराक में लागू करें: रोपण के समय, 45-60 दिनों के बाद, और 90-120 दिनों के बाद।';
      } else {
        response = language === 'en'
          ? 'Thank you for your question about sugarcane farming in UP. Please ask about specific topics like diseases, irrigation, fertilizers, or harvesting for more detailed information.'
          : 'उत्तर प्रदेश में गन्ना खेती के बारे में आपके प्रश्न के लिए धन्यवाद। अधिक विस्तृत जानकारी के लिए कृपया रोग, सिंचाई, उर्वरक, या कटाई जैसे विशिष्ट विषयों के बारे में पूछें।';
      }
      
      setAnswer(response);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="w-full">
      <div className="flex justify-end mb-4">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-sugarcane-600 hover:bg-sugarcane-700"
        >
          <MessageCircle className="mr-2" />
          {language === 'en' ? 'Ask a Doubt' : 'संदेह पूछें'}
        </Button>
      </div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-md border border-gray-200 p-4 mb-6"
        >
          <h3 className="text-lg font-medium mb-3">
            {language === 'en' ? 'Ask about Sugarcane Farming in UP' : 'उत्तर प्रदेश में गन्ना खेती के बारे में पूछें'}
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center space-x-2">
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sugarcane-500 focus:border-transparent"
                placeholder={language === 'en' ? 'Type your question here...' : 'अपना प्रश्न यहां टाइप करें...'}
                rows={2}
              />
              <Button
                type="button"
                onClick={toggleRecording}
                variant="outline"
                className={isRecording ? "bg-red-100 border-red-300" : ""}
              >
                {isRecording ? <MicOff /> : <Mic />}
              </Button>
              <Button 
                type="submit"
                disabled={loading || !question.trim()}
              >
                {loading ? <Loader2 className="animate-spin" /> : <Send />}
              </Button>
            </div>
          </form>

          {answer && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 p-3 bg-gray-50 rounded-md border border-gray-200"
            >
              <p className="text-gray-700">{answer}</p>
            </motion.div>
          )}

          <div className="mt-4 text-xs text-gray-500">
            {language === 'en' 
              ? 'Ask questions about sugarcane farming, diseases, best practices, etc. specific to Uttar Pradesh region.'
              : 'उत्तर प्रदेश क्षेत्र के लिए विशिष्ट गन्ना खेती, रोगों, सर्वोत्तम प्रथाओं आदि के बारे में प्रश्न पूछें।'}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default AskDoubt;
