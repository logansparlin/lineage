'use client'

import { type FC, ComponentProps, useEffect, useRef } from "react"
import { useVideoControls } from "./use-video-controls"
import { useInView } from "motion/react"

import MuxPlayer from '@mux/mux-player-react/lazy'
import { PlayButtonOverlay } from "./play-button-overlay"
import { VideoControls } from "./video-controls"

interface VideoProps extends ComponentProps<'video'> {
  playbackId: string
  aspectRatio?: string
  duration?: number
  className?: string
  muted?: boolean
  loop?: boolean
  autoPlay?: boolean
}

export const Video: FC<VideoProps> = (props) => {
  const { playbackId, duration, className = 'relative w-full h-full', muted = true, loop = true, autoPlay = false } = props;
  const containerRef = useRef<HTMLDivElement>(null)
  const playerRef = useRef<any>(null)

  const isInView = useInView(containerRef, {
    amount: 0.5,
  })

  const {
    hasPlayed,
    isPlaying,
    isMuted,
    volume,
    controlsVisible,
    containerProps,
    progress,
    setIsPlaying,
    setVolume,
    handlePlay,
    handlePause,
    togglePlay,
    toggleMute,
    handleFullscreen,
    setProgress,
  } = useVideoControls({ playerRef, containerRef })

  useEffect(() => {
    if (!isInView) {
      handlePause()
    }
  }, [isInView])

  return (
    <div
      ref={containerRef}
      className={`${className} cursor-default overflow-hidden`}
      {...containerProps}
    >
      <PlayButtonOverlay onClick={handlePlay} hidden={hasPlayed} />
      <div
        className="absolute inset-0 w-full h-full z-[1]"
        role="presentation"
        onClick={togglePlay}
      >
        <MuxPlayer
          preload="metadata"
          ref={playerRef}
          className="will-change-auto transform-gpu"
          loading="viewport"
          playbackId={playbackId}
          streamType="on-demand"
          loop={loop}
          crossOrigin="anonymous"
          volume={volume}
          onPlay={() => {
            setIsPlaying(true)
          }}
          onPause={() => {
            setIsPlaying(false)
          }}
        />
      </div>
      <VideoControls
        hidden={!controlsVisible || !hasPlayed}
        volume={isMuted ? 0 : volume}
        isMuted={isMuted}
        progress={progress}
        duration={duration}
        isPlaying={isPlaying}
        setVolume={setVolume}
        toggleMute={toggleMute}
        handlePlay={handlePlay}
        setProgress={setProgress}
        handlePause={handlePause}
        handleFullscreen={handleFullscreen}
      />
    </div>
  )
}