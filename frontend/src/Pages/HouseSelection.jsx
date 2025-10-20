import React, { useState } from 'react';
import houses from '../assets/HouseData';
import { CometCard } from '../components/CometCard';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const HouseSelection = () => {
  const [selectedHouse, setSelectedHouse] = useState(null);
  const navigate = useNavigate();
  const handleProceed =async () => {
    const response = await axios.post('http://127.0.0.1:5000/api/v1/game/setHouse', {
      house: selectedHouse.house,
      betrayal: selectedHouse.betrayal,
      loyalty: selectedHouse.loyalty,
      power: selectedHouse.power,
      diplomacy: selectedHouse.diplomacy,
      stability: selectedHouse.stability,
      honor: selectedHouse.honor,
      wealth: selectedHouse.wealth,
    },{
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
    console.log(response);
    navigate('/allySelection');
  };

  return (
    <div className="h-screen bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] p-4 overflow-hidden">
      <div className="max-w-7xl mx-auto h-full flex flex-col gap-3">
        {/* House selection row */}
        <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-3 flex-[2]">
          <h2 className="text-center text-xl font-semibold text-white mb-3">
            Select your house
          </h2>
          <div className="grid grid-cols-4 gap-3">
            {houses.map((house) => (
              <div
                key={house.house}
                onClick={() => setSelectedHouse(house)}
                className="cursor-pointer"
              >
                <CometCard>
                  <div className={`
                    relative rounded-2xl p-4 h-96 flex flex-col items-center
                    transition-all duration-300 overflow-hidden
                    ${selectedHouse?.house === house.house
                      ? 'border-3 border-green-500 bg-gradient-to-br from-indigo-500 to-purple-600 shadow-[0_8px_32px_rgba(76,175,80,0.4)]'
                      : 'border-2 border-white/20 bg-gradient-to-br from-slate-700 to-slate-800 shadow-[0_4px_16px_rgba(0,0,0,0.3)]'
                    }
                  `}>
                    {selectedHouse?.house === house.house && (
                      <div className="absolute top-2 right-2 bg-green-500 rounded-full w-7 h-7 flex items-center justify-center text-white text-lg font-bold">
                        ✓
                      </div>
                    )}
                    <div className="w-full aspect-square rounded-xl mb-3 border-2 border-white/20 shadow-lg bg-slate-800/50 flex items-center justify-center p-2">
                      <img
                        src={house.image}
                        alt={house.house}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex-1 flex flex-col items-center justify-center">
                      <span className="font-bold text-xl text-white drop-shadow-md mb-2">
                        {house.house}
                      </span>
                      <span className="text-xs text-white/70 italic text-center leading-tight px-2">
                        {house.motto}
                      </span>
                    </div>
                  </div>
                </CometCard>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom section with Information and Stats */}
        <div className="grid grid-cols-3 gap-3 flex-1 min-h-0 max-h-[35vh]">
          {/* Information Card */}
          <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-4 overflow-auto">
            <h2 className="text-lg font-semibold text-white mb-3 pb-2 border-b-2 border-white/20">
              Information
            </h2>
            <div className="text-gray-300 leading-relaxed text-xs">
              {selectedHouse ? (
                <p className="m-0">{selectedHouse.description}</p>
              ) : (
                <p className="text-white/50 italic m-0">
                  Select a house to view its information
                </p>
              )}
            </div>
          </div>

          {/* Stats Card */}
          <div className="col-span-2 bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex flex-col">
            <div className="flex-1 flex items-center">
              {selectedHouse ? (
                <div className="grid grid-cols-2 gap-x-6 gap-y-2 w-full">
                  {[
                    { key: 'loyalty', label: 'Loyalty', color: 'bg-green-500' },
                    { key: 'power', label: 'Power', color: 'bg-red-500' },
                    { key: 'betrayal', label: 'Betrayal', color: 'bg-purple-600' },
                    { key: 'diplomacy', label: 'Diplomacy', color: 'bg-blue-500' },
                    { key: 'stability', label: 'Stability', color: 'bg-orange-500' },
                    { key: 'honor', label: 'Honor', color: 'bg-cyan-500' },
                    { key: 'wealth', label: 'Wealth', color: 'bg-yellow-500' }
                  ].map(({ key, label, color }) => (
                    <div key={key}>
                      <div className="flex justify-between mb-1 text-white text-xs font-medium">
                        <span>{label}</span>
                        <span className="font-bold">{selectedHouse[key]}/10</span>
                      </div>
                      <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${color} rounded-full transition-all duration-500`}
                          style={{ width: `${(selectedHouse[key] / 10) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-white/50 italic m-0">
                  Select a house to view its stats
                </p>
              )}
            </div>
            
            {/* Proceed Button */}
            <button
              onClick={() => {handleProceed()}}
              disabled={!selectedHouse}
              className={`
                mt-4 self-end px-6 py-2 rounded-lg font-bold uppercase tracking-wider text-sm
                transition-all duration-300
                ${selectedHouse
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-[0_4px_16px_rgba(102,126,234,0.4)] hover:shadow-[0_6px_20px_rgba(102,126,234,0.6)] hover:-translate-y-0.5 cursor-pointer'
                  : 'bg-white/10 text-white opacity-50 cursor-not-allowed'
                }
              `}
            >
              proceed
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


export default HouseSelection;
