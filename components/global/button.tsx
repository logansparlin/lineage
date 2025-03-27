import { type FC, type ComponentProps } from 'react';

interface ButtonProps extends ComponentProps<'button'> {}

export const Button: FC<ButtonProps> = ({ children, className,  ...props }) => {
  return (
    <button
      {...props}
      className={`${className} px-12 md:px-14 h-30 md:h-36 text-20 !leading-100 border-1 text-off-white border-off-white rounded-full flex items-center justify-center all-interactions:bg-off-white all-interactions:text-black transition-colors duration-300`}
    >{children}</button>
  )
}