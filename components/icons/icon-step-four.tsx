import { type ComponentProps, type FC } from "react";

interface IconStepFourProps extends ComponentProps<'svg'> {
  highlight?: boolean
}

export const IconStepFour: FC<IconStepFourProps> = ({ highlight = false, ...rest}) => {
  return (
    <svg width="25" height="26" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg" {...rest}>
      <linearGradient id="highlight-four" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" style={{ stopColor: 'var(--color-pink-200)' }} />
        <stop offset="100%" style={{ stopColor: 'var(--color-pink-300)' }} />
      </linearGradient>
      <path
        d="M22.9818 10.8682C19.3144 9.10258 16.3589 6.14702 14.5933 2.47963C14.0203 1.28956 13.3418 0.601013 12.6145 0.601013C11.8872 0.601013 11.2088 1.28956 10.6358 2.47963C8.87022 6.14702 5.91465 9.10258 2.24727 10.8682C1.0572 11.4411 0.368652 12.1196 0.368652 12.8469C0.368652 13.5742 1.0572 14.2527 2.24727 14.8256C5.91466 16.5912 8.87022 19.5468 10.6358 23.2142C11.2088 24.4042 11.8872 25.0928 12.6145 25.0928C13.3418 25.0928 14.0203 24.4042 14.5933 23.2142C16.3589 19.5468 19.3144 16.5912 22.9818 14.8256C24.1719 14.2527 24.8604 13.5742 24.8604 12.8469C24.8604 12.1196 24.1719 11.4411 22.9818 10.8682Z"
        fill={highlight ? 'url(#highlight-four)' : "currentColor"}
      />
    </svg>
  )
}
