import React, { useRef, useState } from 'react';
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';
import mainTheme from '../../assets/music/Main_theme_Game_of_thrones.mp3';
import rainsOfCastamere from '../../assets/music/The Rains of Castamere - Ramin Djawadi.mp3';

const tracks = [
  {
    src: mainTheme,
    title: 'Main Theme - Game of Thrones',
  },
  {
    src: rainsOfCastamere,
    title: 'The Rains of Castamere',
  },
];

const MusicPlayer = () => {
  const audioRef = useRef(null);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    const nextTrack = (currentTrack + 1) % tracks.length;
    setCurrentTrack(nextTrack);
    setProgress(0);
    setIsPlaying(false);
    setTimeout(() => {
      audioRef.current.play();
      setIsPlaying(true);
    }, 100);
  };

  const handlePrev = () => {
    const prevTrack = (currentTrack - 1 + tracks.length) % tracks.length;
    setCurrentTrack(prevTrack);
    setProgress(0);
    setIsPlaying(false);
    setTimeout(() => {
      audioRef.current.play();
      setIsPlaying(true);
    }, 100);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setProgress(audioRef.current.currentTime);
    }
  };

  const handleSeek = (e) => {
    const value = Number(e.target.value);
    audioRef.current.currentTime = value;
    setProgress(value);
  };

  const handleLoadedMetadata = () => {
    setProgress(0);
  };

  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full flex flex-col items-center justify-center gap-3">
      <audio
        ref={audioRef}
        src={tracks[currentTrack].src}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleNext}
      />
      
      {/* Track Name */}
      <div className="text-gray-300 text-sm font-medium text-center truncate w-full px-2">
        {tracks[currentTrack].title}
      </div>
      
      {/* Control Buttons */}
      <div className="flex items-center justify-center gap-6">
        <button
          className="w-16 h-16 flex items-center justify-center text-gray-300 hover:text-white transition-all"
          onClick={handlePrev}
        >
          <SkipBack size={40} strokeWidth={2} />
        </button>
        <button
          className="w-16 h-16 flex items-center justify-center text-gray-300 hover:text-white transition-all"
          onClick={handlePlayPause}
        >
          {isPlaying ? <Pause size={40} strokeWidth={2} /> : <Play size={40} strokeWidth={2} />}
        </button>
        <button
          className="w-16 h-16 flex items-center justify-center text-gray-300 hover:text-white transition-all"
          onClick={handleNext}
        >
          <SkipForward size={40} strokeWidth={2} />
        </button>
      </div>
      
      {/* Progress Bar */}
      <div className="w-full px-2">
        <input
          type="range"
          min={0}
          max={audioRef.current?.duration || 0}
          value={progress}
          onChange={handleSeek}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
          style={{
            background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${(progress / (audioRef.current?.duration || 1)) * 100}%, #374151 ${(progress / (audioRef.current?.duration || 1)) * 100}%, #374151 100%)`
          }}
        />
        <div className="flex justify-between text-xs text-gray-400 mt-2">
          <span>{formatTime(progress)}</span>
          <span>{formatTime(audioRef.current?.duration)}</span>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
