import { type RefObject, useState, useEffect } from "react";

interface UseVideoControlsProps {
  playerRef: RefObject<any>
  containerRef: RefObject<any>
}

export const useVideoControls = (props: UseVideoControlsProps) => {
  const { playerRef, containerRef } = props;

  const [controlsVisible, setControlsVisible] = useState(false)
  const [hasPlayed, setHasPlayed] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(1)
  const [timeout, setTimeoutRef] = useState<NodeJS.Timeout | null>(null)

  const showControls = () => {
    setControlsVisible(true);
    if (timeout) {
      clearTimeout(timeout);
    }
    
    const newTimeout = setTimeout(() => {
      setControlsVisible(false);
    }, 1500);
    
    setTimeoutRef(newTimeout);
  };
  
  const handleMouseMove = () => {
    showControls();
  };
  
  const handleMouseEnter = () => {
    showControls();
  };
  
  const handleMouseLeave = () => {
    if (!timeout) {
      setControlsVisible(false);
    }
  };
  
  const handleTouchStart = () => {
    showControls();
  };

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [timeout]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (document.fullscreenElement !== null) {
        document.body.classList.add('fullscreen')
      } else {
        document.body.classList.remove('fullscreen')
      }
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange)
    document.addEventListener('mozfullscreenchange', handleFullscreenChange)

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange)
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange)
    }
  }, [])

  const handlePlay = () => {
    if (playerRef.current?.paused) {
      playerRef.current?.play();
      if (isMuted) {
        playerRef.current.muted = true
      } else {
        playerRef.current.muted = false
      }
      if (!hasPlayed) {
        setHasPlayed(true)
      }
    }
  }

  const handlePause = () => {
    if (!playerRef.current?.paused) {
      playerRef.current?.pause()
    }
  }

  const togglePlay = () => {
    if (playerRef.current?.paused) {
      handlePlay()
    } else {
      handlePause()
    }
  }

  const toggleMute = () => {
    if (!playerRef.current) return

    if (playerRef.current.muted) {
      playerRef.current.muted = false
      setIsMuted(false)
    } else {
      playerRef.current.muted = true
      setIsMuted(true)
    }
  }

  const handleFullscreen = () => {
    if (document.fullscreenElement === null) {
      containerRef.current?.requestFullscreen()
    } else {
      document.exitFullscreen()
    }
  }

  const containerProps = {
    onMouseMove: handleMouseMove,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    onTouchStart: handleTouchStart,
  };

  return {
    hasPlayed,
    isPlaying,
    isMuted,
    volume,
    controlsVisible,
    containerProps,
    setIsPlaying,
    setVolume,
    handlePlay,
    handlePause,
    togglePlay,
    toggleMute,
    handleFullscreen,
  }
}