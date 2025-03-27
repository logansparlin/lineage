import { type FC, type ComponentProps } from 'react';
import Link, { type LinkProps } from 'next/link';

interface ButtonLinkProps extends LinkProps, Omit<ComponentProps<'a'>, 'href'> {}

export const ButtonLink: FC<ButtonLinkProps> = ({ children, className,  ...props }) => {
  return (
    <Link
      {...props}
      scroll={false}
      className={`${className} text-off-white px-12 md:px-14 h-30 md:h-36 text-20 !leading-100 border-1 border-off-white rounded-full flex items-center justify-center hover:bg-off-white hover:text-black transition-colors duration-300`}
    >
      {children}
    </Link>
  )
}