import { type ComponentProps, type FC } from "react";

interface IconStepTwoProps extends ComponentProps<'svg'> {}

export const IconStepTwo: FC<IconStepTwoProps> = (props) => {
  return (
    <svg width="33" height="24" viewBox="0 0 33 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <ellipse cx="16.5454" cy="12.0205" rx="16.4243" ry="11.4195" fill="currentColor"/>
    </svg>
  )
}