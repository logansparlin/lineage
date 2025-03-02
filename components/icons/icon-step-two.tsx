import { type ComponentProps, type FC } from "react";

interface IconStepTwoProps extends ComponentProps<'svg'> {
  highlight?: boolean
}

export const IconStepTwo: FC<IconStepTwoProps> = ({ highlight = false, ...rest}) => {
  if (highlight) {
    return (
      <svg fill="none" height="61" viewBox="0 0 125 61" width="125" xmlns="http://www.w3.org/2000/svg" {...rest}>
        <linearGradient id="highlight-two" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" style={{ stopColor: 'var(--color-green-200)' }} />
          <stop offset="100%" style={{ stopColor: 'var(--color-green-300)' }} />
        </linearGradient>
        <ellipse
          cx="62.4097"
          cy="30.4792"
          rx="62.4097"
          ry="30.4792"
          fill={highlight ? 'url(#highlight-two)' : 'currentColor'}
        />
      </svg>
    )
  }
  return (
    <svg width="33" height="24" viewBox="0 0 33 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...rest}>
      <linearGradient id="highlight-two" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" style={{ stopColor: 'var(--color-green-200)' }} />
        <stop offset="100%" style={{ stopColor: 'var(--color-green-300)' }} />
      </linearGradient>
      <ellipse
        cx="16.5454"
        cy="12.0205"
        rx="16.4243"
        ry="11.4195"
        fill={highlight ? 'url(#highlight-two)' : 'currentColor'}
      />
    </svg>
  )
}