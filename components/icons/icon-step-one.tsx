import { type ComponentProps, type FC } from "react";

interface IconStepOneProps extends ComponentProps<'svg'> {
  highlight?: boolean
}

export const IconStepOne: FC<IconStepOneProps> = ({ highlight = false, ...rest}) => {
  return (
    <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg" {...rest}>
      <linearGradient id="highlight-one" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" style={{ stopColor: 'var(--color-orange-200)' }} />
        <stop offset="100%" style={{ stopColor: 'var(--color-orange-300)' }} />
      </linearGradient>
      <circle
        cx="12.0605"
        cy="12.0605"
        r="12.0605"
        fill={highlight ? 'url(#highlight-one)' : 'currentColor'}
      />
    </svg>
  )
}