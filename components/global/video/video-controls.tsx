'use client'

import { type FC } from "react";
import { useSiteStore } from "@/stores/use-site-store";

import { AnimatePresence, motion } from "framer-motion";
import { PlayButton } from "./play-button";
import { PauseButton } from "./pause-button";
import { FullscreenButton } from "./fullscreen-button";
import { VolumeControls } from "./volume-controls";
import { ProgressBar } from "./progress-bar";

interface VideoControlsProps {
  hidden: boolean
  isPlaying: boolean
  isMuted: boolean
  duration: number
  volume: number
  progress: number
  setVolume: (volume: number) => void
  toggleMute: () => void
  handlePlay: () => void
  handlePause: () => void
  handleFullscreen: () => void
  setProgress: (progress: number) => void
}

export const VideoControls: FC<VideoControlsProps> = (props) => {
  const { isPlaying, isMuted, toggleMute, handlePlay, handlePause, handleFullscreen, volume, setVolume, hidden = true, progress, setProgress } = props;
  const setCursorHidden = useSiteStore(state => state.setCursorHidden);

  const handleMouseEnter = () => {
    setCursorHidden(true)
  }

  const handleMouseLeave = () => {
    setCursorHidden(false)
  }

  return (
    <AnimatePresence>
      {!hidden ? (
        <motion.div
          className="absolute bottom-0 disable-cursor left-0 w-full z-[2] text-white p-12 md:p-30 h-80 md:h-130 flex items-end justify-center bg-linear-to-t from-black/100 to-black/0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="w-full md:max-w-[calc(100vw-60px)] flex items-center gap-12 md:gap-20">
            <div className="flex items-center">
              <PlayButton onClick={handlePlay} isPlaying={isPlaying} />
              <PauseButton onClick={handlePause} isPlaying={isPlaying} />
            </div>
            <ProgressBar progress={progress} setProgress={setProgress} />
            <div className="flex items-center pl-2 gap-x-4 md:gap-x-10">
              <VolumeControls onClick={toggleMute} isMuted={isMuted} volume={volume} setVolume={setVolume} />
              <FullscreenButton onClick={handleFullscreen} />
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}