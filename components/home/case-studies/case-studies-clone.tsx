import { type FC, type ComponentProps } from 'react'
import { CaseStudiesContent } from './case-studies-content'

interface CaseStudiesCloneProps extends ComponentProps<'div'> {
  items: any[]
  contentClassName?: string
}

export const CaseStudiesClone: FC<CaseStudiesCloneProps> = ({ items, ref, className, contentClassName, ...rest }) => {
  return (
    <div 
      inert
      ref={ref}
      className={`${className} hidden md:block absolute w-full h-screen top-0 left-0 pointer-events-none backface-hidden`}
      style={{
        maskImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.35) 50%, black 100%)'
      }}
      {...rest}
    >
      <CaseStudiesContent items={items} className={contentClassName} />
    </div>
  )
}