import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import openingVideo from '../assets/extras/opening.mp4'
import angryRaven from '../assets/raven/angry.jpg'
import angryOgRaven from '../assets/raven/angryog.jpg'

const OpeningScreen = () => {
    const navigate = useNavigate();
    const videoRef = useRef(null);
    const [showModal, setShowModal] = useState(false);
    const [confirmationStage, setConfirmationStage] = useState(1);

    useEffect(() => {
        const video = videoRef.current;
        if (video) {
            video.play();
        }
    }, []);

    const handleVideoEnd = () => {
        navigate('/houseSelection');
    };

    const handleSkipClick = () => {
        setShowModal(true);
    };

    const handleConfirmSkip = () => {
        if (confirmationStage === 1) {
            // Show second, harsher confirmation
            setConfirmationStage(2);
        } else {
            // Actually skip
            navigate('/houseSelection');
        }
    };

    const handleCancelSkip = () => {
        setShowModal(false);
        setConfirmationStage(1);
    };

    return (
        <div className="h-screen w-screen bg-black flex items-center justify-center overflow-hidden relative">
            {/* Video */}
            <video 
                ref={videoRef}
                src={openingVideo}
                className="w-full h-full object-cover"
                onEnded={handleVideoEnd}
                autoPlay
            />
            
            {/* Skip Button */}
            <button
                onClick={handleSkipClick}
                className="
                    absolute bottom-8 right-8 z-30
                    px-6 py-3 text-lg font-semibold
                    bg-white/20 backdrop-blur-md
                    text-white rounded-lg
                    border-2 border-white/40
                    hover:bg-white/30 hover:scale-105
                    transition-all duration-300
                    shadow-lg
                "
            >
                Skip Intro
            </button>

            {/* Confirmation Modal */}
            {showModal && (
                <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 max-w-lg mx-4 border-2 border-white/20 shadow-2xl relative">
                        {/* Close Button */}
                        <button
                            onClick={handleCancelSkip}
                            className="absolute top-4 right-4 text-white hover:text-red-400 transition-colors z-10"
                        >
                            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>

                        {/* Angry Raven Image */}
                        <div className="flex justify-center mb-4">
                            <img 
                                src={confirmationStage === 1 ? angryOgRaven : angryRaven}
                                alt="Angry Raven"
                                className={`w-32 h-32 rounded-full object-cover border-4 ${
                                    confirmationStage === 1 ? 'border-orange-500' : 'border-red-600 animate-pulse'
                                }`}
                            />
                        </div>

                        <h2 className={`text-2xl font-bold text-white mb-4 text-center ${
                            confirmationStage === 2 ? 'text-red-400' : ''
                        }`}>
                            {confirmationStage === 1 ? 'Skip Intro?' : 'ARE YOU SURE?!'}
                        </h2>
                        <p className={`text-center mb-6 leading-relaxed ${
                            confirmationStage === 1 ? 'text-gray-300' : 'text-red-300 font-semibold text-lg'
                        }`}>
                            {confirmationStage === 1 
                                ? "Do you really want to skip this? You're not a man of culture."
                                : "You DARE disrespect the opening?! This is a masterpiece! Your ancestors are disappointed in you. LAST CHANCE!"}
                        </p>
                        
                        <div className="flex gap-4 justify-center">
                            <button
                                onClick={handleConfirmSkip}
                                className={`
                                    px-8 py-3 font-semibold
                                    text-white rounded-lg
                                    transition-all duration-300
                                    shadow-lg
                                    ${
                                        confirmationStage === 1
                                            ? 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 hover:shadow-green-500/50'
                                            : 'bg-gradient-to-r from-red-700 to-red-900 hover:from-red-800 hover:to-red-950 hover:shadow-red-600/50 animate-pulse'
                                    }
                                `}
                            >
                                {confirmationStage === 1 ? 'Yes' : 'Yes, I\'m a Heathen'}
                            </button>
                            <button
                                onClick={handleCancelSkip}
                                className={`
                                    px-8 py-3 font-semibold
                                    text-white rounded-lg
                                    transition-all duration-300
                                    shadow-lg
                                    ${
                                        confirmationStage === 1
                                            ? 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 hover:shadow-red-500/50'
                                            : 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 hover:shadow-green-500/50 scale-110'
                                    }
                                `}
                            >
                                {confirmationStage === 1 ? 'No' : 'No, I\'ll Watch!'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default OpeningScreen
