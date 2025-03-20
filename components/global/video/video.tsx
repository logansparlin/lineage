'use client'

import { type FC, ComponentProps, useEffect, useRef, useState } from "react"
import { useVideoControls } from "./use-video-controls"
import { AnimatePresence, motion, useInView, useIsomorphicLayoutEffect } from "motion/react"
import { createBlurUp } from "@mux/blurup"
import dynamic from "next/dynamic"

import MuxPlayer from '@mux/mux-player-react/lazy'
import { PlayButtonOverlay } from "./play-button-overlay"
import { VideoControls } from "./video-controls"

const MuxVideo = dynamic(() => import('@mux/mux-video-react'), { ssr: false })

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
  const [blurUp, setBlurUp] = useState<string | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)
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

  useIsomorphicLayoutEffect(() => {
    createBlurUp(playbackId, {
      quality: 1,
      width: 1,
      height: 1,
      time: 2,
      blur: 50,
    })
      .then((props) => {
        setBlurUp(props.blurDataURL)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [playbackId])

  useEffect(() => {
    if (!isInView) {
      handlePause()
    }
  }, [isInView])

  const handleLoaded = () => {
    setIsLoaded(true)
  }

  return (
    <div
      ref={containerRef}
      className={`${className} cursor-default overflow-hidden`}
      {...containerProps}
    >
      <AnimatePresence initial={false}>
        {!isLoaded && blurUp ? (
          <motion.div
            className="absolute inset-0 w-full h-full object-cover z-[3] overflow-hidden"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.img
              src={blurUp}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.75 }}
            />
          </motion.div>
        ) : null}
      </AnimatePresence>
      <PlayButtonOverlay onClick={handlePlay} hidden={hasPlayed} />
      <div
        className="absolute inset-0 w-full h-full z-[2]"
        role="presentation"
        onClick={togglePlay}
      >
        <MuxVideo
          poster={`https://image.mux.com/${playbackId}/thumbnail.webp?time=${(duration / 2)}`}
          preload="metadata"
          ref={playerRef}
          className="mux-video"
          playbackId={playbackId}
          streamType="on-demand"
          loop={loop}
          crossOrigin="anonymous"
          onCanPlay={handleLoaded}
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