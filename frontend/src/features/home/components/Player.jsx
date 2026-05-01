import React, { useRef, useState, useEffect } from 'react'
import { useSong } from '../hooks/useSong'
import '../style/playerStyle.scss'

const Player = () => {
  const { song, loading } = useSong()
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [speed, setSpeed] = useState(1)
  const [volume, setVolume] = useState(1)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateTime = () => setCurrentTime(audio.currentTime)
    const updateDuration = () => setDuration(audio.duration)
    const handleEnded = () => setIsPlaying(false)

    audio.addEventListener('timeupdate', updateTime)
    audio.addEventListener('loadedmetadata', updateDuration)
    audio.addEventListener('ended', handleEnded)

    return () => {
      audio.removeEventListener('timeupdate', updateTime)
      audio.removeEventListener('loadedmetadata', updateDuration)
      audio.removeEventListener('ended', handleEnded)
    }
  }, [])

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current?.pause()
    } else {
      audioRef.current?.play()
    }
    setIsPlaying(!isPlaying)
  }

  const handleForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime += 5
    }
  }

  const handleBackward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(0, audioRef.current.currentTime - 5)
    }
  }

  const handleSpeedChange = (e) => {
    const newSpeed = parseFloat(e.target.value)
    setSpeed(newSpeed)
    if (audioRef.current) {
      audioRef.current.playbackRate = newSpeed
    }
  }

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume
    }
  }

  const handleProgressChange = (e) => {
    const newTime = parseFloat(e.target.value)
    setCurrentTime(newTime)
    if (audioRef.current) {
      audioRef.current.currentTime = newTime
    }
  }

  const formatTime = (time) => {
    if (!time || isNaN(time)) return '0:00'
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  }

  return (
    <div className="player-container-vertical">
      <audio 
        ref={audioRef} 
        src={song?.url} 
        crossOrigin="anonymous"
        onError={(e) => console.error("Audio error:", e)}
      />
      
      <div className="player-content">
        <div className="player-poster-vertical">
          <img src={song?.posterUrl} alt={song?.title} />
        </div>

        <div className="player-details">
          <div className="player-info-vertical">
            <h3 className="song-title">{song?.title || "Loading..."}</h3>
            <p className="song-mood">Mood: {song?.mood || "N/A"}</p>
            {loading && <p style={{ fontSize: '12px', opacity: 0.7 }}>Loading...</p>}
          </div>

          <div className="progress-section-vertical">
            <input
              type="range"
              min="0"
              max={duration || 0}
              value={currentTime}
              onChange={handleProgressChange}
              className="progress-bar-vertical"
            />
            <div className="time-display-vertical">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          <div className="controls-section-vertical">
            <button className="control-btn backward-btn-vertical" onClick={handleBackward} title="Backward 5 sec">
              <span className="icon">⏮</span>
              <span className="label">5s</span>
            </button>

            <button 
              className={`control-btn play-btn-vertical ${isPlaying ? 'playing' : ''}`}
              onClick={handlePlayPause}
              title={isPlaying ? 'Pause' : 'Play'}
            >
              <span className="icon">{isPlaying ? '⏸' : '▶'}</span>
            </button>

            <button className="control-btn forward-btn-vertical" onClick={handleForward} title="Forward 5 sec">
              <span className="icon">⏭</span>
              <span className="label">5s</span>
            </button>
          </div>

          <div className="secondary-controls-vertical">
            <div className="speed-control-vertical">
              <label htmlFor="speed-select">Speed:</label>
              <select 
                id="speed-select"
                value={speed} 
                onChange={handleSpeedChange}
                className="speed-select-vertical"
              >
                <option value="0.5">0.5x</option>
                <option value="0.75">0.75x</option>
                <option value="1">1x</option>
                <option value="1.25">1.25x</option>
                <option value="1.5">1.5x</option>
                <option value="2">2x</option>
              </select>
            </div>

            <div className="volume-control-vertical">
              <label htmlFor="volume-slider">🔊</label>
              <input
                id="volume-slider"
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={handleVolumeChange}
                className="volume-slider-vertical"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Player
