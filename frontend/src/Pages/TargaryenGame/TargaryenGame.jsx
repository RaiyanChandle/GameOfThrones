import React from 'react';

const TargaryenGame = () => {
  return (
    <div className="h-screen w-screen bg-gradient-to-br from-red-950 via-black to-red-900 flex items-center justify-center relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(255,0,0,0.05) 2px, rgba(255,0,0,0.05) 4px)',
        }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-8">
        <div className="mb-8">
          <div className="text-8xl mb-4">🐉</div>
          <h1 className="text-6xl font-bold text-red-400 mb-4 drop-shadow-2xl">
            House Targaryen
          </h1>
          <p className="text-3xl text-red-300 italic mb-8 font-serif">
            "Fire and Blood"
          </p>
        </div>

        <div className="bg-black/40 backdrop-blur-md border-2 border-red-600 rounded-2xl p-8 max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold text-red-300 mb-6">This is the Game of House Targaryen</h2>
          <p className="text-xl text-red-100 leading-relaxed mb-6">
            The blood of the dragon runs through your veins. Reclaim your birthright with fire and blood.
          </p>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-red-900/30 rounded-lg p-4 border border-red-700">
              <div className="text-2xl mb-2">🔥</div>
              <div className="text-red-300 text-sm">Power</div>
            </div>
            <div className="bg-red-900/30 rounded-lg p-4 border border-red-700">
              <div className="text-2xl mb-2">👑</div>
              <div className="text-red-300 text-sm">Legacy</div>
            </div>
            <div className="bg-red-900/30 rounded-lg p-4 border border-red-700">
              <div className="text-2xl mb-2">⚔️</div>
              <div className="text-red-300 text-sm">Conquest</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TargaryenGame;
