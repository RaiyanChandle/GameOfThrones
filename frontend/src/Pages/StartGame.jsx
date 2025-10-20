import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import startVideo from '../assets/Backgrounds/start.mp4'
import axios from 'axios'
const StartGame = () => {
    const navigate = useNavigate();
    
    const handleStartGame =async () => {
        const token=localStorage.getItem("token");
        if(!token){
            navigate('/login');
        }
        const response=await axios.post("http://localhost:5000/api/v1/game/startGame",{},{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        console.log(response);
        navigate('/openingScreen');
    };
    
    return (
        <div className="h-screen w-screen relative overflow-hidden flex items-center justify-center">
            {/* Background Video */}
            <video 
                autoPlay 
                loop 
                muted 
                className="absolute top-0 left-0 w-full h-full object-cover z-0"
            >
                <source src={startVideo} type="video/mp4" />
            </video>
            
            {/* Overlay */}
            <div className="absolute top-0 left-0 w-full h-full bg-black/40 z-10"></div>
            
            {/* Content */}
            <div className="relative z-20 text-center max-w-4xl px-8">
                <h1 className="text-6xl font-bold text-white mb-6 drop-shadow-2xl">Game of Thrones</h1>
                <h2 className="text-3xl font-semibold text-purple-300 mb-8 drop-shadow-lg">Battle for the Iron Throne</h2>
                
                <div className="bg-black/60 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-white/20">
                    <p className="text-xl text-gray-200 leading-relaxed mb-4">
                        Enter the realm of Westeros where noble houses vie for power and the Iron Throne awaits its rightful ruler.
                    </p>
                    <p className="text-lg text-gray-300 leading-relaxed mb-4">
                        Choose your house, select your allies, and forge your destiny. Will you rule with honor like the Starks, 
                        cunning like the Lannisters, power like the Targaryens, or fury like the Baratheons?
                    </p>
                    <p className="text-lg text-gray-300 leading-relaxed">
                        Your choices will determine the fate of the Seven Kingdoms. Winter is coming... are you ready?
                    </p>
                </div>
                
                <button
                    onClick={handleStartGame}
                    className="
                        px-12 py-4 text-2xl font-bold uppercase tracking-wider
                        bg-gradient-to-r from-purple-600 to-indigo-600
                        text-white rounded-lg
                        shadow-[0_0_30px_rgba(147,51,234,0.5)]
                        hover:shadow-[0_0_50px_rgba(147,51,234,0.8)]
                        hover:scale-105
                        transition-all duration-300
                        border-2 border-purple-400
                    "
                >
                    Start Your Journey
                </button>
            </div>
        </div>
    )
}

export default StartGame
