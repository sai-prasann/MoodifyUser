import { useEffect, useRef, useState } from "react";
import { useSong } from "../hooks/useSong";
import "../style/songs.scss";

const Songs = () => {
  const { song, setSong, songs, setSongs, mood, loading, error, handleGetSong } = useSong();
  const audioRef = useRef(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [speedIndex, setSpeedIndex] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const speeds = [0.75, 1, 1.25, 1.5, 2];

  useEffect(() => {
    setSong(null);

    if (["happy", "sad", "surprised", "angry"].includes(mood)) {
      setSongs([]);
      const moodName = mood.charAt(0).toUpperCase() + mood.slice(1);
      handleGetSong(moodName);
    } else {
      setSongs([]);
    }
  }, [mood, handleGetSong, setSong, setSongs]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [isMuted, volume, song]);

  const playNextSong = () => {
    if (!song || songs.length < 2) return;

    const currentIndex = songs.findIndex((item) => item._id === song._id);
    setSong(songs[(currentIndex + 1) % songs.length]);
    setSpeedIndex(1);
    setCurrentTime(0);
  };

  const playPreviousSong = () => {
    if (!song || songs.length < 2) return;

    const currentIndex = songs.findIndex((item) => item._id === song._id);
    setSong(songs[(currentIndex - 1 + songs.length) % songs.length]);
    setSpeedIndex(1);
    setCurrentTime(0);
  };

  const togglePlayback = () => {
    if (!audioRef.current) return;

    if (audioRef.current.paused) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  };

  const updateVolume = (event) => {
    setVolume(Number(event.target.value));
    setIsMuted(false);
  };

  const seekSong = (event) => {
    const nextTime = Number(event.target.value);
    setCurrentTime(nextTime);
    if (audioRef.current) audioRef.current.currentTime = nextTime;
  };

  const formatTime = (time) => {
    if (!Number.isFinite(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const moodLabel = mood
    ? mood.charAt(0).toUpperCase() + mood.slice(1)
    : null;

  return (
    <section className="songs">
      <div className="songs__heading">
        <p className="songs__eyebrow">MOODIFY PLAYLIST</p>
        <h2>{moodLabel ? `${moodLabel} mood` : "Your playlist"}</h2>
        <p className="songs__description">
          {moodLabel
            ? `Songs selected for your ${moodLabel.toLowerCase()} mood.`
            : "Detect your expression to find music for your mood."}
        </p>
      </div>

      {loading && <p className="songs__message">Loading your playlist...</p>}
        {error && (
          <div className="songs__message">
            <p>Could not load the playlist. Please try again.</p>
            <button
              className="songs__retry"
              type="button"
              onClick={() => {
                const moodName = mood.charAt(0).toUpperCase() + mood.slice(1);
                handleGetSong(moodName);
              }}
            >
              Retry
            </button>
          </div>
        )}
        {!loading && !error && mood && songs.length === 0 && (
          <p className="songs__message">
            No songs are available for this mood yet.
        </p>
      )}

      <div className="songs__list">
        {songs.map((track, index) => (
          <button
            className={`songs__track${song?._id === track._id ? " songs__track--active" : ""}`}
            key={track._id}
            type="button"
            onClick={() => {
              if (song?._id === track._id) {
                audioRef.current?.play();
              } else {
                setSong(track);
                setSpeedIndex(1);
              }
            }}
          >
            <span className="songs__track-number">{index + 1}</span>
            {track.posterUrl && (
              <img className="songs__poster" src={track.posterUrl} alt="" />
            )}
            <span className="songs__track-title">{track.tittle}</span>
          </button>
        ))}
      </div>

      {song && (
        <div className="song-player">
          <audio
            autoPlay
            key={song._id}
            ref={audioRef}
            src={song.url}
            onEnded={playNextSong}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
            onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
          />
          {song.posterUrl && (
            <img className="song-player__poster" src={song.posterUrl} alt="" />
          )}
          <div className="song-player__track">
            <strong>{song.tittle}</strong>
            <span>{moodLabel} mood</span>
          </div>
          <div className="song-player__timeline">
            <span>{formatTime(currentTime)}</span>
            <input
              aria-label="Song progress"
              type="range"
              min="0"
              max={duration || 0}
              step="0.1"
              value={Math.min(currentTime, duration || 0)}
              onChange={seekSong}
              disabled={!duration}
            />
            <span>{formatTime(duration)}</span>
          </div>
          <div className="song-player__controls">
            <button
              type="button"
              onClick={playPreviousSong}
              disabled={songs.length < 2}
              aria-label="Play previous song"
            >
              Previous
            </button>
            <button
              type="button"
              onClick={togglePlayback}
              aria-label="Pause or resume playback"
            >
              {isPlaying ? "Pause" : "Resume"}
            </button>
            <button
              type="button"
              onClick={playNextSong}
              disabled={songs.length < 2}
              aria-label="Play next song"
            >
              Next
            </button>
          </div>
          <button
            className="song-player__speed"
            type="button"
            onClick={() => {
              const nextIndex = (speedIndex + 1) % speeds.length;
              setSpeedIndex(nextIndex);
              if (audioRef.current) audioRef.current.playbackRate = speeds[nextIndex];
            }}
            aria-label="Change playback speed"
          >
            {speeds[speedIndex]}x
          </button>
          <div className="song-player__volume">
            <button
              type="button"
              onClick={() => setIsMuted(!isMuted)}
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? "Unmute" : "Volume"}
            </button>
            <input
              aria-label="Volume"
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={isMuted ? 0 : volume}
              onChange={updateVolume}
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default Songs;
