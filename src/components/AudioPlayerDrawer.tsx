import { useEffect, useState, MouseEvent, RefObject } from "react";
import { X, Play, Pause, SkipBack, SkipForward, Shuffle, Repeat, Volume2 } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export interface AudioInfo {
  titulo: string;
  pastor: string;
  audioUrl: string;
}

interface Props {
  audio: AudioInfo;
  audioRef: RefObject<HTMLAudioElement>;
  onClose: () => void;
}

const formatTime = (seconds: number) => {
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(1, "0");
  const s = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${s}`;
};

const AudioPlayerDrawer = ({ audio, audioRef, onClose }: Props) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;

    const onLoaded = () => setDuration(el.duration || 0);
    const onTime = () => setCurrentTime(el.currentTime);
    const onEnded = () => setIsPlaying(false);

    el.addEventListener("loadedmetadata", onLoaded);
    el.addEventListener("timeupdate", onTime);
    el.addEventListener("ended", onEnded);
    return () => {
      el.removeEventListener("loadedmetadata", onLoaded);
      el.removeEventListener("timeupdate", onTime);
      el.removeEventListener("ended", onEnded);
    };
  }, [audio.audioUrl]);

  const togglePlay = () => {
    const el = audioRef.current;
    if (!el) return;
    if (isPlaying) {
      el.pause();
      setIsPlaying(false);
    } else {
      el.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const handleProgressClick = (e: MouseEvent<HTMLDivElement>) => {
    const el = audioRef.current;
    if (!el) return;
    const rect = (e.target as HTMLDivElement).getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    el.currentTime = pct * duration;
  };

  return (
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ type: "tween", duration: 0.3 }}
      className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white z-50 rounded-t-2xl p-6 backdrop-blur-md shadow-2xl"
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="font-semibold text-lg truncate max-w-[60vw]">{audio.titulo}</p>
          <p className="text-xs text-gray-400 truncate max-w-[60vw]">{audio.pastor}</p>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose} className="text-white">
          <X className="w-5 h-5" />
        </Button>
      </div>

      {/* progress bar */}
      <div className="progress-bar w-full mb-2 cursor-pointer" onClick={handleProgressClick}>
        <div
          className="progress bg-white h-1.5 rounded"
          style={{ width: duration ? `${(currentTime / duration) * 100}%` : 0 }}
        />
      </div>
      <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>

      {/* controls */}
      <div className="flex items-center justify-center gap-6">
        <Button variant="ghost" size="icon" className="control-button">
          <SkipBack className="w-5 h-5" />
        </Button>
        <Button
          onClick={togglePlay}
          className="play-pause-button bg-white text-purple-800 rounded-full w-14 h-14 flex items-center justify-center"
        >
          {isPlaying ? <Pause className="w-7 h-7" /> : <Play className="w-7 h-7" />}
        </Button>
        <Button variant="ghost" size="icon" className="control-button">
          <SkipForward className="w-5 h-5" />
        </Button>
      </div>

      <div className="flex items-center justify-between mt-4 text-gray-400">
        <Button variant="ghost" size="icon" className="opacity-70 hover:opacity-100">
          <Shuffle className="w-4 h-4" />
        </Button>
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="opacity-70 hover:opacity-100">
            <Volume2 className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="opacity-70 hover:opacity-100">
            <Repeat className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* hidden audio element lives outside; drawer only controls */}
    </motion.div>
  );
};

export default AudioPlayerDrawer; 