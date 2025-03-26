import { type RefObject, useState, useEffect, useRef, useMemo, useCallback } from "react";

interface UseVideoControlsProps {
  playerRef: RefObject<any>
  containerRef: RefObject<any>
}

export const useVideoControls = (props: UseVideoControlsProps) => {
  const { playerRef, containerRef } = props;
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const [controlsVisible, setControlsVisible] = useState(false)
  const [hasPlayed, setHasPlayed] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(1)
  const [timeout, setTimeoutRef] = useState<NodeJS.Timeout | null>(null)
  const [isPreviewing, setIsPreviewing] = useState(false)
  const [hasPreviewed, setHasPreviewed] = useState(false)
  const [needsReset, setNeedsReset] = useState(false)

  const showControls = useCallback(() => {
    setControlsVisible(true);
    if (timeout) {
      clearTimeout(timeout);
    }
    
    const newTimeout = setTimeout(() => {
      setControlsVisible(false);
    }, 1500);
    
    setTimeoutRef(newTimeout);
  }, [timeout]);
  
  const handleMouseMove = useCallback(() => {
    showControls();
  }, [showControls]);
  
  const handleMouseEnter = useCallback(() => {
    showControls();
  }, [showControls]);
  
  const handleMouseLeave = useCallback(() => {
    if (!timeout) {
      setControlsVisible(false);
    }
  }, [timeout]);
  
  const handleTouchStart = useCallback(() => {
    showControls();
  }, [showControls]);

  // Clean up timeout on unmount
  useEffect(() => {
    if (!controlsVisible) return;

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [timeout, controlsVisible]);

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

  const handlePlay = useCallback((e?: any) => {
    e?.preventDefault();
    e?.stopPropagation();

    if (playerRef.current?.paused || isPreviewing) {
      if (needsReset) {
        playerRef.current.currentTime = 0;
        setNeedsReset(false)
      }

      playerRef.current.muted = isMuted;
      playerRef.current?.play()
      if (!hasPlayed) {
        setHasPlayed(true)
      }
    }
  }, [playerRef, isMuted, hasPlayed, isPreviewing, needsReset]);

  const handlePreviewPlay = useCallback(() => {
    if (hasPreviewed) return;
    
    setNeedsReset(true)
    setIsPreviewing(true)
    
    if (playerRef.current?.paused) {
      playerRef.current.muted = true;
      playerRef.current.play()
    }
    // if (!hasPlayed) {
    //   setHasPlayed(true)
    // }
  }, [setHasPlayed, playerRef, hasPlayed])

  const handlePause = useCallback((e?: any) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (!playerRef.current?.paused) {
      playerRef.current?.pause()
    }
  }, [playerRef]);

  const togglePlay = useCallback((e?: any) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (playerRef.current?.paused) {
      handlePlay(e);
    } else {
      handlePause(e);
    }
  }, [handlePlay, handlePause, playerRef]);

  const toggleMute = useCallback(() => {
    if (!playerRef.current) return

    if (playerRef.current.muted) {
      playerRef.current.muted = false
      setIsMuted(false)
    } else {
      playerRef.current.muted = true
      setIsMuted(true)
    }
  }, [playerRef]);

  const handleProgress = useCallback((currentTime: number) => {
    const progressPercentage = (currentTime / playerRef.current?.duration) * 100

    if (isPreviewing && currentTime >= 5) {
      handlePause()
      setIsPreviewing(false)
      setHasPreviewed(true)
    }

    setProgress(progressPercentage)
  }, [playerRef, isPreviewing, setHasPreviewed, handlePause]);

  const handleFullscreen = useCallback(() => {
    if (document.fullscreenElement === null) {
      containerRef.current?.requestFullscreen()
    } else {
      document.exitFullscreen()
    }
  }, [containerRef]);

  const updateProgress = useCallback((progress: number) => {
    if (!playerRef.current) return;
    playerRef.current.currentTime = (playerRef.current?.duration * progress) / 100;
    setProgress(progress)
  }, [playerRef])

  useEffect(() => {
    if (!isPlaying) return;

    intervalRef.current = setInterval(() => {
      if (!playerRef.current) return;
      handleProgress(playerRef.current?.currentTime)
    }, 10)

    return () => {
      clearInterval(intervalRef.current)
    }
  }, [isPlaying, playerRef, handleProgress])

  const containerProps = useMemo(() => ({
    onMouseMove: handleMouseMove,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    onTouchStart: handleTouchStart,
  }), [handleMouseMove, handleMouseEnter, handleMouseLeave, handleTouchStart]);

  const memoizedReturnValue = useMemo(() => ({
    hasPlayed,
    isPlaying,
    isMuted,
    volume,
    progress,
    controlsVisible,
    containerProps,
    hasPreviewed,
    setIsPlaying,
    setVolume,
    handlePlay,
    handlePreviewPlay,
    handlePause,
    togglePlay,
    toggleMute,
    handleFullscreen,
    setProgress: updateProgress,
  }), [
    hasPlayed, isPlaying, isMuted, volume, progress, 
    controlsVisible, containerProps, handlePlay, handlePause, 
    togglePlay, toggleMute, handleFullscreen, updateProgress
  ]);

  return memoizedReturnValue;
}