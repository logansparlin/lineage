import { type FC, type ComponentProps } from 'react'

interface IconCarouselChevronProps extends ComponentProps<'svg'> {
  direction?: 'left' | 'right'
}

export const IconCarouselChevron: FC<IconCarouselChevronProps> = ({ direction = 'right', ...props }) => {
  if (direction === 'left') {
    return (
      <svg width="27" height="53" viewBox="0 0 27 53" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path opacity="0.7" d="M26.457 1L1.00119 26.4558L26.457 51.9117" stroke="currentColor" />
      </svg>
    )
  }

  return (
    <svg width="27" height="53" viewBox="0 0 27 53" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path opacity="0.7" d="M0.640625 1L26.0965 26.4558L0.640625 51.9117" stroke="currentColor" />
    </svg>
  )
}
