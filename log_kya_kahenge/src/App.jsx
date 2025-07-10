import { useState } from 'react';
import CanvasPersona from './components/CanvasPersona';
import DearDiary from './components/DearDiary';
import RoastBattle from './components/RoastBattle';

import { getPersonaResponse } from './api/llm';
import { FiSend, FiRefreshCw, FiVolume2, FiSun, FiMoon } from 'react-icons/fi';

const samplePrompts = [
  'I want to quit my job and become a stand-up comedian',
  'I’m dating someone from a different caste',
  'Planning a chai startup in Silicon Valley',
  'I chose art college over engineering'
];

function App() {
  const [input, setInput] = useState('');
  const [responses, setResponses] = useState([]);
  const [mode, setMode] = useState('judgy');
  const [judgmentScore, setJudgmentScore] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('diary');

  const handleSubmit = async () => {
    if (!input.trim()) return;
    setIsLoading(true);
    try {
      const result = await getPersonaResponse(input, mode);
      setResponses(result);
      calculateJudgmentScore(result);
    } catch (error) {
      console.error('Error fetching responses:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRandomPrompt = () => {
    const random = samplePrompts[Math.floor(Math.random() * samplePrompts.length)];
    setInput(random);
  };

  const handleModeToggle = () => {
    const newMode = mode === 'judgy' ? 'supportive' : 'judgy';
    setMode(newMode);
    setResponses([]);
    setJudgmentScore(0);
  };

  const calculateJudgmentScore = (responses) => {
    if (mode === 'supportive') {
      setJudgmentScore(0);
      return;
    }

    const text = responses.join(' ').toLowerCase();
    const negativeWords = [
      'shame', 'disgrace', 'embarrassing', 'nonsense',
      'stupid', 'waste', 'wrong', 'bad', 'improper',
      'shameless', 'failure', 'loser', 'hopeless'
    ];
    let score = 0;
    negativeWords.forEach(word => {
      const regex = new RegExp(`\\b${word}\\b`, 'gi');
      score += (text.match(regex) || []).length;
    });
    setJudgmentScore(Math.min(score * 8, 100));
  };

  const getJudgmentColor = (score) => {
    if (score < 30) return 'text-green-500';
    if (score < 70) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-yellow-100 py-8 px-4 sm:px-6 lg:px-8">
    
      <div className="max-w-4xl mx-auto">

       

        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-5xl pb-5 font-extrabold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-green-600 via-blue-500 to-purple-500">
            Log Kya Kahenge GPT
          </h1>
          <p className="text-gray-700 text-lg mt-2">
            👪 Let Indian relatives judge or cheer your wildest dreams.
          </p>
        </header>

        {/* Input Card */}
        <div className="bg-white rounded-xl shadow-xl p-6 mb-8 border border-gray-200 relative">
          <textarea
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 resize-none"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="What's your life update? (e.g. I'm becoming an artist)"
            rows={3}
            onKeyDown={e => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit();
              }
            }}
          />
          <div className="mt-2 flex flex-wrap gap-3 items-center justify-between">
            <button
              onClick={handleSubmit}
              disabled={isLoading || !input.trim()}
              className={`flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-full shadow-lg transition ${
                isLoading || !input.trim() ? 'opacity-60 cursor-not-allowed' : 'hover:bg-purple-700'
              }`}
            >
              {isLoading ? <FiRefreshCw className="animate-spin" /> : <FiSend />}
              <span>{isLoading ? 'Generating...' : 'Ask GPT'}</span>
            </button>

            <button
              onClick={handleRandomPrompt}
              className=" flex items-center gap-2 bg-blue-950 text-white px-4 py-2 rounded-full shadow-lg transition text-sm text-blue-600 hover:bg-blue-800"
            >
              Try a random prompt
            </button>

            <button
              onClick={handleModeToggle}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all font-medium ${
                mode === 'judgy'
                  ? 'bg-red-100 text-red-700 hover:bg-red-200'
                  : 'bg-green-100 text-green-700 hover:bg-green-200'
              }`}
            >
              {mode === 'judgy' ? <FiMoon /> : <FiSun />}
              {mode === 'judgy' ? 'Judgmental Mode' : 'Supportive Mode'}
            </button>
          </div>

          {/* Judgment Meter */}
          {mode === 'judgy' && (
            <div className="mt-4 flex items-center gap-2">
              <span className="text-sm font-medium text-gray-600">Judgment Meter:</span>
              <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full ${getJudgmentColor(judgmentScore).replace('text', 'bg')}`}
                  style={{ width: `${judgmentScore}%` }}
                ></div>
              </div>
              <span className={`text-sm font-bold ${getJudgmentColor(judgmentScore)}`}>
                {judgmentScore}/100
              </span>
            </div>
          )}
        </div>

        {/* Response Section */}
        {responses.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
              {mode === 'judgy' ? '🧓 Relatives React!' : '🤗 Support Squad Responds!'}
            </h2>
            <CanvasPersona responses={responses} mode={mode} />
          </div>
        )}

        {/* Feature Tabs */}
        <div className="mb-6 flex justify-center gap-4 text-sm font-medium">
          <button
            onClick={() => setActiveTab('diary')}
            className={`px-4 py-2 rounded-full ${activeTab === 'diary' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600'}`}
          >
            📖 Dear Diary
          </button>
          <button
            onClick={() => setActiveTab('roast')}
            className={`px-4 py-2 rounded-full ${activeTab === 'roast' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-600'}`}
          >
            🔥 Roast Battle
          </button>
        </div>

        {/* Tab Content */}
        <div className="grid grid-cols-1 gap-6 mb-12">
          {activeTab === 'diary' && (
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <DearDiary />
            </div>
          )}
          {activeTab === 'roast' && (
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <RoastBattle />
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="text-center text-xs text-gray-500 mt-10">
          <p>Made with 💚 for India. All responses are AI-generated and purely for fun!</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
