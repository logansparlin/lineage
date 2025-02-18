import { type ComponentProps, type FC } from "react";

interface IconStepOneProps extends ComponentProps<'svg'> {}

export const IconStepOne: FC<IconStepOneProps> = (props) => {
  return (
    <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="12.0605" cy="12.0605" r="12.0605" fill="currentColor"/>
    </svg>
  )
}