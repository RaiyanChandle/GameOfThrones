import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Heart, Sword, Shield, Coins, Users, Scale, Skull } from 'lucide-react';
import AllyData from '../../assets/AllyData';
import starkData from './starkData';
import starkVideo from '../../assets/Backgrounds/starks.mp4';
import starkLogo from '../../assets/extras/starklogo.png';
import MusicPlayer from './MusicPlayer';  

const StarkGame = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [gameSession, setGameSession] = useState(null);
  const [allies, setAllies] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [pendingOption, setPendingOption] = useState(null);

  // Fetch game session and load current question
  useEffect(() => {
  const fetchAndSetQuestion = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log('Fetching game session...');
      const response = await axios.get('http://localhost:5000/api/v1/game/getGameSession', {
        headers: { Authorization: `Bearer ${token}` }
      });

      // Convert DB question to string
      let dbQ = response.data.gameSession?.currentQuestion;
      if (dbQ !== null && dbQ !== undefined) dbQ = String(dbQ);
      console.log('DB currentQuestion (as string):', dbQ);

      // Only assign a random first question if it's 1 or missing
      if (!dbQ || dbQ === '1') {
        const firstQuestions = ['1.1', '1.2', '1.3'];
        const randomQ = firstQuestions[Math.floor(Math.random() * firstQuestions.length)];
        dbQ = randomQ;
        console.log('Randomly selected first question:', dbQ);

        // Update DB with first question
        await axios.post('http://localhost:5000/api/v1/game/updateDecision', {
          currentQuestion: dbQ
        }, { headers: { Authorization: `Bearer ${token}` } });
        console.log('DB updated with first question:', dbQ);
      } else {
        console.log('Using existing DB question:', dbQ);
      }

      // Fetch updated session
      console.log('Fetching updated session...');
      const updatedSession = await axios.get('http://localhost:5000/api/v1/game/getGameSession', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const session = updatedSession.data.gameSession;
      console.log('Updated session data:', session);
      setGameSession(session);

      // Map allies
      const allyNames = session.selectedAllies || [];
      const alliesData = allyNames.map(name => {
        const allyInfo = AllyData.find(a => a.name === name);
        console.log(`Mapping ally: ${name} ->`, allyInfo);
        return allyInfo || { name, image: null };
      });
      setAllies(alliesData);

      // Load the question using string ID
      console.log('Loading question:', dbQ);
      loadQuestion(dbQ);

    } catch (error) {
      console.error('Error fetching or setting initial question:', error);
    }
  };

  fetchAndSetQuestion();
}, []);



  // Load a question from starkData
  const loadQuestion = (questionId) => {
    console.log('Inside loadQuestion with ID:', questionId);
    for (const step of starkData[0].storyline) {
      const question = step.questions.find(q => q.id === questionId);
      if (question) {
        console.log('Question found:', question);
        setCurrentQuestion(question);
        return;
      }
    }
    console.warn('Question not found for ID:', questionId);
    // Fallback: pick a random question from the first storyline if not found
    const fallbackQuestion = starkData[0].storyline[0].questions[0];
    console.log('Fallback question loaded:', fallbackQuestion);
    setCurrentQuestion(fallbackQuestion);
  };

  // Handle selecting an option
  const handleOptionSelect = (option, index) => {
    console.log('Option selected:', option, 'at index', index);
    setSelectedOption(index);
    setPendingOption(option);

    if (gameSession) {
      const updatedStats = { ...gameSession };
      for (const [stat, value] of Object.entries(option.effects)) {
        updatedStats[stat] = (updatedStats[stat] || 0) + value;
      }
      console.log('Updated stats in UI:', updatedStats);
      setGameSession(updatedStats);
    }
  };

  // Confirm option and update backend
  const handleConfirm = async () => {
    if (!pendingOption) return;
    try {
      const token = localStorage.getItem('token');
      console.log('Confirming option and updating DB:', pendingOption);

      await axios.post('http://localhost:5000/api/v1/game/updateStatsAndDecision', {
        ...pendingOption.effects
      }, { headers: { Authorization: `Bearer ${token}` } });

      await axios.post('http://localhost:5000/api/v1/game/updateDecision', {
        currentQuestion: pendingOption.nextQuestion || currentQuestion.id
      }, { headers: { Authorization: `Bearer ${token}` } });

      if (pendingOption.nextQuestion) {
        console.log('Loading next question:', pendingOption.nextQuestion);
        loadQuestion(pendingOption.nextQuestion);
        setSelectedOption(null);
        setPendingOption(null);
      } else {
        console.log('Game completed!');
      }
    } catch (error) {
      console.error('Error processing option:', error);
    }
  };

  return (
    <div className="h-screen w-screen relative p-4 overflow-hidden">
      <video className="absolute inset-0 w-full h-full object-cover z-0" src={starkVideo} autoPlay loop muted playsInline />
      <div className="absolute inset-0 bg-black/50 pointer-events-none z-0" />

      <div className="h-full max-h-screen grid grid-cols-12 gap-3 relative z-10">
        {/* Left Section */}
        <div className="col-span-9 grid grid-rows-12 gap-3">
          {/* Allies */}
          <div className="row-span-3 p-2 flex items-center gap-2 border-2 border-gray-500 rounded-lg overflow-hidden">
            <div className="w-32 h-32 bg-gray-700/50 border-2 border-gray-500 rounded-lg flex items-center justify-center flex-shrink-0">
              <h2 className="text-lg font-bold text-white">Allies</h2>
            </div>
            <div className="flex gap-2 flex-1">
              {allies.length > 0 ? (
                allies.map((ally, index) => (
                  <div key={index} className="w-32 h-32 bg-gray-700/50 border-2 border-gray-500 rounded-lg overflow-hidden flex items-center justify-center flex-shrink-0">
                    {ally.image ? (
                      <img src={ally.image} alt={ally.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-gray-400 text-xs text-center p-2">{ally.name}</div>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-gray-400 text-sm">No allies recruited yet</div>
              )}
            </div>
          </div>

          {/* Question */}
          <div className="row-span-2 bg-transparent border-2 border-gray-600 rounded-xl p-3 flex items-center overflow-hidden">
            <p className="text-lg text-white font-medium">
              {currentQuestion ? currentQuestion.question : 'Loading...'}
            </p>
          </div>

          {/* Options + Image */}
          <div className="row-span-7 grid grid-cols-5 gap-3 overflow-hidden">
            {/* Options */}
            <div className="col-span-3 bg-transparent border-2 border-gray-600 rounded-xl p-3 flex flex-col gap-3 overflow-hidden">
              {currentQuestion && currentQuestion.options.map((option, index) => (
                <div
                  key={index}
                  className={`flex-1 p-4 rounded-lg border-2 transition-all flex flex-col justify-between ${
                    selectedOption === index
                      ? 'bg-gray-900 border-yellow-400 text-white'
                      : 'bg-black border-gray-500 text-gray-200 hover:bg-gray-800 hover:border-gray-400 cursor-pointer'
                  }`}
                  onClick={() => selectedOption !== index && handleOptionSelect(option, index)}
                >
                  <div className="text-base font-medium mb-2">{option.text}</div>
                  <div className="flex flex-wrap gap-2 text-xs">
                    {Object.entries(option.effects).map(([stat, value]) => (
                      <span
                        key={stat}
                        className={`px-2 py-1 rounded font-bold ${
                          stat === 'betrayal'
                            ? 'bg-red-700/60 text-red-400 border border-red-500/80'
                            : value > 0
                              ? 'bg-green-600/30 text-green-500 border border-green-600/70'
                              : 'bg-red-600/30 text-red-500 border border-red-600/70'
                        }`}
                      >
                        {stat}: {value > 0 ? '+' : ''}{value}
                      </span>
                    ))}
                  </div>
                  {selectedOption === index && (
                    <button
                      onClick={(e) => { e.stopPropagation(); handleConfirm(); }}
                      className="mt-3 w-full py-2 bg-green-600 hover:bg-green-700 rounded-lg font-bold text-white transition-colors"
                    >
                      Confirm Choice
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Image */}
            <div className="col-span-2 bg-transparent border-2 border-gray-600 rounded-xl p-3 flex items-center justify-center overflow-hidden">
              <div className="text-center">
                <img src={starkLogo} alt="Stark Logo" className="w-48 h-48 object-contain mx-auto mb-4" />
                <p className="text-gray-400 text-lg italic">"Winter is Coming"</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="col-span-3 grid grid-rows-12 gap-3 overflow-hidden">
          {/* Stats */}
          <div className="row-span-7 bg-gray-800/50 border-2 border-gray-600 rounded-xl p-4 backdrop-blur-sm overflow-hidden">
            <h2 className="text-2xl font-bold text-white mb-4">Stats</h2>
            <div className="space-y-3">
              {gameSession && [
                { label: 'Loyalty', value: gameSession.loyalty || 0, icon: Heart, color: 'text-red-400' },
                { label: 'Power', value: gameSession.power || 0, icon: Sword, color: 'text-orange-400' },
                { label: 'Honor', value: gameSession.honor || 0, icon: Shield, color: 'text-blue-400' },
                { label: 'Wealth', value: gameSession.wealth || 0, icon: Coins, color: 'text-yellow-400' },
                { label: 'Diplomacy', value: gameSession.diplomacy || 0, icon: Users, color: 'text-green-400' },
                { label: 'Stability', value: gameSession.stability || 0, icon: Scale, color: 'text-cyan-400' },
                { label: 'Betrayal', value: gameSession.betrayal || 0, icon: Skull, color: 'text-purple-400' },
              ].map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label}>
                    <div className="flex justify-between items-center text-sm mb-1">
                      <div className="flex items-center gap-2">
                        <Icon size={18} className={stat.color} />
                        <span className="text-gray-200 font-medium">{stat.label}</span>
                      </div>
                      <span className="text-gray-300 font-bold">{stat.value.toFixed(1)}</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full transition-all"
                        style={{ width: `${Math.min(stat.value, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Music Player */}
          <div className="row-span-4 bg-gray-800/50 border-2 border-gray-600 rounded-xl p-3 backdrop-blur-sm flex flex-col items-center justify-center overflow-hidden">
            <MusicPlayer />
          </div>

          <button className="row-span-2 py-3 bg-red-600 hover:bg-red-700 border-2 border-red-500 rounded-xl text-white font-bold text-base transition-colors">
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default StarkGame;
