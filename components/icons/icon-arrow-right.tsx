import type { FC, ComponentProps } from "react";

interface IconArrowRightProps extends ComponentProps<'svg'> {}

export const IconArrowRight: FC<IconArrowRightProps> = (props) => {
  return (
    <svg width="55" height="54" viewBox="0 0 55 54" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M11.6914 27H43.1914" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M27.4414 11.25L43.1914 27L27.4414 42.75" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}