'use client'

import { type FC } from "react";

import { AnimatePresence, motion } from "framer-motion";
import { PlayButton } from "./play-button";
import { PauseButton } from "./pause-button";
import { FullscreenButton } from "./fullscreen-button";
import { VolumeControls } from "./volume-controls";

interface VideoControlsProps {
  hidden: boolean
  isPlaying: boolean
  isMuted: boolean
  duration: number
  volume: number
  setVolume: (volume: number) => void
  toggleMute: () => void
  handlePlay: () => void
  handlePause: () => void
  handleFullscreen: () => void
}

export const VideoControls: FC<VideoControlsProps> = (props) => {
  const { isPlaying, isMuted, toggleMute, handlePlay, handlePause, handleFullscreen, volume, setVolume, hidden = true } = props;

  return (
    <AnimatePresence>
      {!hidden ? (
        <motion.div
          className="absolute bottom-0 left-0 w-full z-[2] text-white p-30 h-130 flex items-end justify-center bg-linear-to-t from-black/100 to-black/0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          <div className="w-full max-w-[calc(100vw-60px)] flex items-center gap-20">
            <div className="flex items-center">
              <PlayButton onClick={handlePlay} isPlaying={isPlaying} />
              <PauseButton onClick={handlePause} isPlaying={isPlaying} />
            </div>
            <div className="flex-1 bg-white/30 rounded-full h-4"></div>
            <div className="flex items-center gap-x-10">
              <VolumeControls onClick={toggleMute} isMuted={isMuted} volume={volume} setVolume={setVolume} />
              <FullscreenButton onClick={handleFullscreen} />
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}