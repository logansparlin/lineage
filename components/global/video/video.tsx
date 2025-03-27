'use client'

import { type FC, ComponentProps, useEffect, useMemo, useRef, useState } from "react"
import { useVideoControls } from "./use-video-controls"
import { AnimatePresence, motion, useInView } from "motion/react"
import dynamic from "next/dynamic"

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
  controls?: boolean
}

export const Video: FC<VideoProps> = (props) => {
  const { playbackId, duration, className = 'relative w-full h-full', controls = true, muted = false, autoPlay = false } = props;
  const [isLoaded, setIsLoaded] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const playerRef = useRef<any>(null)

  const withControls = useMemo(() => {
    if (controls !== null && controls === false) {
      return false
    }

    return true;
  }, [controls])

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
    handlePreviewPlay,
    handlePlay,
    handlePause,
    togglePlay,
    toggleMute,
    handleFullscreen,
    setProgress,
  } = useVideoControls({ playerRef, containerRef, withControls })

  const isInView = useInView(containerRef, {
    amount: 0.5,
  })

  useEffect(() => {
    if (!isInView) {
      handlePause()
    }

    if (isInView && !withControls) {
      handlePlay()
    }

    if (isInView && !hasPlayed) {
      handlePreviewPlay()
    }
  }, [isInView, hasPlayed, withControls])

  const handleLoaded = () => {
    setIsLoaded(true)
  }

  return (
    <div
      ref={containerRef}
      className={`${className} cursor-default overflow-hidden ${!withControls ? 'pointer-events-none' : ''}`}
      {...containerProps}
    >
      <AnimatePresence initial={false}>
        {!isLoaded ? (
          <motion.div
            className="absolute inset-0 w-full h-full object-cover z-[3] overflow-hidden"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.img
              src={`https://image.mux.com/${playbackId}/thumbnail.webp?time=${5}&width=1`}
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
      
      {withControls ? (
        <PlayButtonOverlay onClick={handlePlay} hidden={hasPlayed} />
      ) : null}

      <div
        className="absolute inset-0 w-full h-full z-[2]"
        role="presentation"
        onClick={togglePlay}
      >
        <MuxVideo
          poster={`https://image.mux.com/${playbackId}/thumbnail.webp?time=${5}`}
          preload="metadata"
          ref={playerRef}
          muted={!withControls || !hasPlayed || muted ? true : isMuted}
          className="mux-video"
          playbackId={playbackId}
          autoPlay={muted && autoPlay}
          startTime={1}
          streamType="on-demand"
          loop={true}
          crossOrigin="anonymous"
          onLoadedMetadata={handleLoaded}
          playsInline
          onPlay={() => {
            setIsPlaying(true)
          }}
          onPause={() => {
            setIsPlaying(false)
          }}
        />
      </div>
      {withControls ? (
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
      ) : null}
    </div>
  )
}
