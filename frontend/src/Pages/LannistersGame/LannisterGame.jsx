import React from 'react';

const LannisterGame = () => {
  return (
    <div className="h-screen w-screen bg-gradient-to-br from-red-900 via-yellow-900 to-black flex items-center justify-center relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(255,215,0,0.05) 2px, rgba(255,215,0,0.05) 4px)',
        }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-8">
        <div className="mb-8">
          <div className="text-8xl mb-4">🦁</div>
          <h1 className="text-6xl font-bold text-yellow-400 mb-4 drop-shadow-2xl">
            House Lannister
          </h1>
          <p className="text-3xl text-yellow-200 italic mb-8 font-serif">
            "Hear Me Roar"
          </p>
        </div>

        <div className="bg-black/40 backdrop-blur-md border-2 border-yellow-600 rounded-2xl p-8 max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold text-yellow-300 mb-6">This is the Game of House Lannister</h2>
          <p className="text-xl text-yellow-100 leading-relaxed mb-6">
            A Lannister always pays his debts. Rule with wealth, power, and cunning.
          </p>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-yellow-900/30 rounded-lg p-4 border border-yellow-700">
              <div className="text-2xl mb-2">💰</div>
              <div className="text-yellow-300 text-sm">Wealth</div>
            </div>
            <div className="bg-yellow-900/30 rounded-lg p-4 border border-yellow-700">
              <div className="text-2xl mb-2">👑</div>
              <div className="text-yellow-300 text-sm">Power</div>
            </div>
            <div className="bg-yellow-900/30 rounded-lg p-4 border border-yellow-700">
              <div className="text-2xl mb-2">⚔️</div>
              <div className="text-yellow-300 text-sm">Cunning</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LannisterGame;