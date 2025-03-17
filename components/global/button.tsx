import { type FC, type ComponentProps } from 'react';

interface ButtonProps extends ComponentProps<'button'> {}

export const Button: FC<ButtonProps> = ({ children, className,  ...props }) => {
  return (
    <button
      {...props}
      className={`${className} px-12 md:px-14 h-30 md:h-36 text-20 !leading-100 border-1 border-white rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-colors duration-300`}
    >{children}</button>
  )
}