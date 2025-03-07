import { type FC, type ComponentProps } from 'react';

interface VolumeIconProps extends ComponentProps<'svg'> {
  isMuted?: boolean
  volume?: number
}

export const VolumeIcon: FC<VolumeIconProps> = ({ className, isMuted = false, volume = 1, ...rest }) => {
  return (
    <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22.07 16.14" className={className} {...rest}>
      <g>
        <polygon points="10 1.07 5 5.07 1 5.07 1 11.07 5 11.07 10 15.07 10 1.07" fill="currentColor" />
        <path d="M10,16.07c-.22,0-.44-.07-.62-.22l-4.73-3.78H1c-.55,0-1-.45-1-1v-6c0-.55.45-1,1-1h3.65L9.38.29c.3-.24.71-.29,1.06-.12.35.17.57.52.57.9v14c0,.38-.22.73-.57.9-.14.07-.29.1-.43.1ZM2,10.07h3c.23,0,.45.08.62.22l3.38,2.7V3.16l-3.38,2.7c-.18.14-.4.22-.62.22h-3v4Z" fill="currentColor" />
      </g>
      
      {/* Volume 1 */}
      <g className={`transition-opacity duration-100 ease ${volume > 0 && !isMuted ? 'opacity-100 delay-100' : 'opacity-0'}`}>
        <path d="M14.54,12.61c-.26,0-.51-.1-.71-.29-.39-.39-.39-1.02,0-1.41,1.56-1.56,1.56-4.1,0-5.66-.39-.39-.39-1.02,0-1.41.39-.39,1.02-.39,1.41,0,2.34,2.34,2.34,6.14,0,8.48-.2.2-.45.29-.71.29Z" fill="currentColor" />
      </g>
      
      {/* Volume 2 */}
      <g className={`transition-opacity duration-100 ease ${volume > 0.5 && !isMuted ? 'opacity-100 delay-100' : 'opacity-0'}`}>
        <path d="M18.07,16.14c-.26,0-.51-.1-.71-.29-.39-.39-.39-1.02,0-1.41,3.51-3.51,3.51-9.22,0-12.73-.39-.39-.39-1.02,0-1.41.39-.39,1.02-.39,1.41,0,4.29,4.29,4.29,11.27,0,15.55-.2.2-.45.29-.71.29Z" fill="currentColor" />
      </g>

      {/* Muted */}
      <g className={`transition-opacity duration-100 ease ${isMuted ? 'opacity-100 delay-100' : 'opacity-0'}`}>
        <path d="M15.07,12.07c-.26,0-.51-.1-.71-.29-.39-.39-.39-1.02,0-1.41l6-6c.39-.39,1.02-.39,1.41,0s.39,1.02,0,1.41l-6,6c-.2.2-.45.29-.71.29Z" fill="currentColor" />
        <path d="M21.07,12.07c-.26,0-.51-.1-.71-.29l-6-6c-.39-.39-.39-1.02,0-1.41s1.02-.39,1.41,0l6,6c.39.39.39,1.02,0,1.41-.2.2-.45.29-.71.29Z" fill="currentColor" />
      </g>
    </svg>
  )
}

