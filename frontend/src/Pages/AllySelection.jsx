import React, { useState, useMemo, useEffect } from "react";
import { CardBody, CardContainer, CardItem, Tooltip } from "../components/ThreeDCard";
import SearchBar from "../components/SearchBar";
import Dropdown from "../components/Dropdown";
import { Coins, Users, Play, BarChart2 } from "lucide-react";
import AllyData from "../assets/AllyData";
import allySelectionVideo from "../assets/Backgrounds/allySelection.mp4";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';

const AllySelection = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedHouse, setSelectedHouse] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [coins, setCoins] = useState(100);
  const [myAllies, setMyAllies] = useState([]);
  const [gameSession, setGameSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAlliesModal, setShowAlliesModal] = useState(false);
  const [showStatsModal, setShowStatsModal] = useState(false);

  const alliesPerPage = 12;

  // Fetch game session on component mount or refresh
  useEffect(() => {
    fetchGameSession();
  }, []);

  const fetchGameSession = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }
      
      const response = await axios.get('http://localhost:5000/api/v1/game/getGameSession', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      const session = response.data.gameSession;
      setGameSession(session);
      setCoins(session.coins);
      setMyAllies(session.selectedAllies || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching game session:', error);
      if (error.response?.status === 404) {
        // No active game session, redirect to start
        navigate('/startGame');
      }
      setLoading(false);
    }
  };

  const handleAddAlly = async (ally) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await axios.post(
        'http://localhost:5000/api/v1/game/addAlly',
        {
          allyName: ally.name,
          cost: ally.cost,
          positive: ally.positive,
          negative: ally.negative,
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      const updatedSession = response.data.gameSession;
      setGameSession(updatedSession);
      setCoins(updatedSession.coins);
      setMyAllies(updatedSession.selectedAllies);
      
      toast.success(`${ally.name} joined your alliance!`, {
        duration: 3000,
        position: 'bottom-right',
        style: {
          background: '#000000',
          color: '#fbbf24',
          padding: '12px 16px',
          borderRadius: '6px',
          border: '2px solid #fbbf24',
          boxShadow: '0 4px 16px rgba(251, 191, 36, 0.3)',
          fontWeight: '600',
          fontSize: '14px',
        },
        icon: '⚔️',
      });
    } catch (error) {
      console.error('Error adding ally:', error);
      const errorMessage = error.response?.data?.message || 'Failed to add ally';
      toast.error(errorMessage, {
        duration: 3000,
        position: 'bottom-right',
        style: {
          background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
          color: '#fff',
          padding: '16px',
          borderRadius: '12px',
          border: '2px solid #fca5a5',
          boxShadow: '0 8px 32px rgba(239, 68, 68, 0.4)',
          fontWeight: '600',
        },
        icon: '❌',
      });
    }
  };

  const handleRemoveAlly = async (ally) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await axios.post(
        'http://localhost:5000/api/v1/game/removeAlly',
        {
          allyName: ally.name,
          cost: ally.cost,
          positive: ally.positive,
          negative: ally.negative,
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      const updatedSession = response.data.gameSession;
      setGameSession(updatedSession);
      setCoins(updatedSession.coins);
      setMyAllies(updatedSession.selectedAllies);
      
      toast.success(`${ally.name} left your alliance!`, {
        duration: 3000,
        position: 'bottom-right',
        style: {
          background: '#000000',
          color: '#ef4444',
          padding: '12px 16px',
          borderRadius: '6px',
          border: '2px solid #ef4444',
          boxShadow: '0 4px 16px rgba(239, 68, 68, 0.3)',
          fontWeight: '600',
          fontSize: '14px',
        },
        icon: '👋',
      });
    } catch (error) {
      console.error('Error removing ally:', error);
      const errorMessage = error.response?.data?.message || 'Failed to remove ally';
      toast.error(errorMessage, {
        duration: 3000,
        position: 'bottom-right',
        style: {
          background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
          color: '#fff',
          padding: '16px',
          borderRadius: '12px',
          border: '2px solid #fca5a5',
          boxShadow: '0 8px 32px rgba(239, 68, 68, 0.4)',
          fontWeight: '600',
        },
        icon: '❌',
      });
    }
  };

  const houses = useMemo(() => {
    const uniqueHouses = [...new Set(AllyData.map((ally) => ally.house))];
    return ["All", ...uniqueHouses];
  }, []);

  const filteredAllies = useMemo(() => {
    return AllyData.filter((ally) => {
      const matchesSearch = ally.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesHouse = selectedHouse === "All" || ally.house === selectedHouse;
      return matchesSearch && matchesHouse;
    });
  }, [searchTerm, selectedHouse]);

  const totalPages = Math.ceil(filteredAllies.length / alliesPerPage);
  const startIndex = (currentPage - 1) * alliesPerPage;
  const currentAllies = filteredAllies.slice(startIndex, startIndex + alliesPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const handleStartGame = () => {
    if (!gameSession || !gameSession.house) {
      toast.error('Please select a house first!', {
        duration: 3000,
        position: 'bottom-right',
        style: {
          background: '#000000',
          color: '#ef4444',
          padding: '12px 16px',
          borderRadius: '6px',
          border: '2px solid #ef4444',
          boxShadow: '0 4px 16px rgba(239, 68, 68, 0.3)',
          fontWeight: '600',
          fontSize: '14px',
        },
        icon: '❌',
      });
      return;
    }

    // Navigate based on house
    const house = gameSession.house.toLowerCase();
    switch(house) {
      case 'stark':
        navigate('/starkGame');
        break;
      case 'lannister':
        navigate('/lannisterGame');
        break;
      case 'targaryen':
        navigate('/targaryenGame');
        break;
      case 'baratheon':
        navigate('/baratheonGame');
        break;
      default:
        toast.error('Invalid house selection!', {
          duration: 3000,
          position: 'bottom-right',
          style: {
            background: '#000000',
            color: '#ef4444',
            padding: '12px 16px',
            borderRadius: '6px',
            border: '2px solid #ef4444',
            boxShadow: '0 4px 16px rgba(239, 68, 68, 0.3)',
            fontWeight: '600',
            fontSize: '14px',
          },
          icon: '❌',
        });
    }
  };

  return (
    <div className="min-h-screen py-8 relative overflow-hidden">
      <Toaster />
      <video
        className="absolute inset-0 w-full h-full object-cover z-0"
        src={allySelectionVideo}
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="absolute inset-0 bg-black/60 pointer-events-none z-0" />

      {/* Search, Filters, Coins, and Actions */}
      <div className="max-w-7xl mx-auto px-4 mb-8 relative z-10">
        <div className="flex flex-wrap items-center justify-center gap-3 bg-black/40 backdrop-blur-md rounded-xl p-3 shadow-lg">
          <div className="flex items-center gap-2 px-3 py-2 bg-black/60 border-2 border-yellow-400 dark:border-yellow-500 rounded-lg h-[42px]">
            <Coins className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-bold text-yellow-100">{coins}</span>
            <span className="text-xs text-yellow-200">Coins</span>
          </div>

          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search allies by name..."
          />

          <Dropdown
            options={houses.map((house) =>
              house === "All" ? "All Houses" : `House ${house}`
            )}
            value={selectedHouse === "All" ? "All Houses" : `House ${selectedHouse}`}
            onChange={(selected) => {
              const house = selected === "All Houses" ? "All" : selected.replace("House ", "");
              setSelectedHouse(house);
              setCurrentPage(1);
            }}
            placeholder="Select House"
          />

          <button 
            onClick={() => setShowAlliesModal(true)}
            className="flex items-center gap-2 px-4 py-2 h-[42px] rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-colors"
          >
            <Users className="w-4 h-4" />
            My Allies ({myAllies.length})
          </button>

          <button 
            onClick={() => setShowStatsModal(true)}
            className="flex items-center gap-2 px-4 py-2 h-[42px] rounded-lg bg-gray-700 hover:bg-gray-800 text-white font-semibold text-sm transition-colors"
          >
            <BarChart2 className="w-4 h-4" />
            My Stats
          </button>

          <button 
            onClick={handleStartGame}
            className="flex items-center gap-2 px-4 py-2 h-[42px] rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold text-sm transition-colors"
          >
            <Play className="w-4 h-4" />
            Start Game
          </button>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
        {currentAllies.length > 0 ? (
          currentAllies.map((ally, idx) => (
            <CardContainer key={ally.name + idx} className="inter-var">
              <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-52 h-auto rounded-xl p-4 border">
                <CardItem translateZ="50" className="text-base font-bold text-neutral-600 dark:text-white mb-1">
                  {ally.name}
                </CardItem>
                <CardItem as="p" translateZ="60" className="text-neutral-500 text-xs max-w-xs dark:text-neutral-300 mb-3">
                  {ally.quote}
                </CardItem>
                <CardItem translateZ="100" className="w-full mb-3">
                  <div className="aspect-square w-full overflow-hidden rounded-xl group-hover/card:shadow-xl bg-gray-200 dark:bg-neutral-800">
                    <img src={ally.image} className="w-full h-full object-cover" alt={ally.name} />
                  </div>
                </CardItem>
                <div className="flex justify-between items-center">
                  <Tooltip stats={{ ...ally.positive, ...ally.negative }}>
                    <button className="px-3 py-1.5 rounded-lg text-xs font-normal dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                      Stats
                    </button>
                  </Tooltip>
                  {myAllies.includes(ally.name) ? (
                    <CardItem
                      translateZ={20}
                      as="button"
                      onClick={() => handleRemoveAlly(ally)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border-2 border-red-500 bg-red-500 text-white text-xs font-bold hover:bg-red-600 hover:border-red-600 transition-colors"
                    >
                      Remove
                    </CardItem>
                  ) : (
                    <CardItem
                      translateZ={20}
                      as="button"
                      onClick={() => handleAddAlly(ally)}
                      disabled={coins < ally.cost}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border-2 text-xs font-bold transition-colors ${
                        coins < ally.cost
                          ? 'border-red-500 bg-red-100 dark:bg-red-900 text-red-500 cursor-not-allowed'
                          : 'border-yellow-500 dark:border-yellow-400 bg-transparent text-yellow-700 dark:text-yellow-300 hover:bg-yellow-50 dark:hover:bg-yellow-900'
                      }`}
                    >
                      <Coins className="w-3.5 h-3.5" />
                      {ally.cost || 10}
                    </CardItem>
                  )}
                </div>
              </CardBody>
            </CardContainer>
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-gray-500 dark:text-gray-400">No allies found</p>
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
              Try adjusting your search or filter
            </p>
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-2 mt-8 relative z-20">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-1 rounded-md text-sm font-medium transition-colors ${currentPage === 1
              ? "text-gray-500 cursor-not-allowed"
              : "bg-black text-white hover:bg-blue-600"
            }`}
        >
          Prev
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => handlePageChange(i + 1)}
            className={`px-4 py-1 rounded-md text-sm font-medium transition-colors ${currentPage === i + 1
                ? "bg-blue-600 text-white"
                : "bg-black text-white hover:bg-blue-500"
              }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-4 py-1 rounded-md text-sm font-medium transition-colors ${currentPage === totalPages
              ? "text-gray-500 cursor-not-allowed"
              : "bg-black text-white hover:bg-blue-600"
            }`}
        >
          Next
        </button>
      </div>

      {/* My Allies Modal */}
      {showAlliesModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm" onClick={() => setShowAlliesModal(false)}>
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 max-w-2xl w-full mx-4 border-2 border-blue-500 shadow-2xl max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <Users className="w-6 h-6 text-blue-400" />
                My Allies ({myAllies.length})
              </h2>
              <button
                onClick={() => setShowAlliesModal(false)}
                className="text-white hover:text-red-400 transition-colors"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            
            {myAllies.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {myAllies.map((allyName, index) => {
                  const allyData = AllyData.find(a => a.name === allyName);
                  return (
                    <div key={index} className="bg-black/40 rounded-lg p-4 border border-blue-400/30 hover:border-blue-400 transition-colors">
                      <div className="flex items-center gap-3">
                        {allyData?.image && (
                          <img src={allyData.image} alt={allyName} className="w-16 h-16 rounded-full object-cover border-2 border-blue-400" />
                        )}
                        <div className="flex-1">
                          <h3 className="text-white font-bold">{allyName}</h3>
                          <p className="text-gray-400 text-sm">{allyData?.house || 'Unknown'}</p>
                          <div className="flex items-center gap-1 mt-1">
                            <Coins className="w-3 h-3 text-yellow-400" />
                            <span className="text-yellow-400 text-xs font-semibold">{allyData?.cost || 0}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8">
                <Users className="w-16 h-16 text-gray-500 mx-auto mb-3" />
                <p className="text-gray-400">No allies recruited yet</p>
                <p className="text-gray-500 text-sm mt-2">Start building your alliance!</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* My Stats Modal */}
      {showStatsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm" onClick={() => setShowStatsModal(false)}>
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 max-w-2xl w-full mx-4 border-2 border-purple-500 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <BarChart2 className="w-6 h-6 text-purple-400" />
                My Stats
              </h2>
              <button
                onClick={() => setShowStatsModal(false)}
                className="text-white hover:text-red-400 transition-colors"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            
            {gameSession ? (
              <div className="space-y-4">
                {/* House Info */}
                <div className="bg-black/40 rounded-lg p-4 border border-purple-400/30">
                  <h3 className="text-purple-300 font-semibold mb-2">House</h3>
                  <p className="text-white text-xl font-bold">{gameSession.house || 'Not selected'}</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'Loyalty', value: gameSession.loyalty, color: 'text-green-400', bg: 'bg-green-500/20', border: 'border-green-500/30' },
                    { label: 'Power', value: gameSession.power, color: 'text-red-400', bg: 'bg-red-500/20', border: 'border-red-500/30' },
                    { label: 'Betrayal', value: gameSession.betrayal, color: 'text-purple-400', bg: 'bg-purple-500/20', border: 'border-purple-500/30' },
                    { label: 'Diplomacy', value: gameSession.diplomacy, color: 'text-blue-400', bg: 'bg-blue-500/20', border: 'border-blue-500/30' },
                    { label: 'Stability', value: gameSession.stability, color: 'text-orange-400', bg: 'bg-orange-500/20', border: 'border-orange-500/30' },
                    { label: 'Honor', value: gameSession.honor, color: 'text-cyan-400', bg: 'bg-cyan-500/20', border: 'border-cyan-500/30' },
                    { label: 'Wealth', value: gameSession.wealth, color: 'text-yellow-400', bg: 'bg-yellow-500/20', border: 'border-yellow-500/30' },
                    { label: 'Total Allies', value: gameSession.totalAllies, color: 'text-pink-400', bg: 'bg-pink-500/20', border: 'border-pink-500/30' },
                  ].map((stat, index) => (
                    <div key={index} className={`${stat.bg} rounded-lg p-3 border ${stat.border}`}>
                      <p className="text-gray-300 text-sm">{stat.label}</p>
                      <p className={`${stat.color} text-2xl font-bold`}>{stat.value?.toFixed(1) || 0}</p>
                    </div>
                  ))}
                </div>

                {/* Coins */}
                <div className="bg-black/40 rounded-lg p-4 border border-yellow-400/30 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Coins className="w-6 h-6 text-yellow-400" />
                    <span className="text-gray-300 font-semibold">Remaining Coins</span>
                  </div>
                  <span className="text-yellow-400 text-2xl font-bold">{gameSession.coins}</span>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <BarChart2 className="w-16 h-16 text-gray-500 mx-auto mb-3" />
                <p className="text-gray-400">No stats available</p>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};

export default AllySelection;
