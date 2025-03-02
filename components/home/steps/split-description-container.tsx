import { type FC, type ComponentProps } from "react";

interface SplitDescriptionContainerProps extends ComponentProps<'div'> {
  className?: string;
  side: 'left' | 'right';
  heading: string;
  description: string;
}

export const SplitDescriptionContainer: FC<SplitDescriptionContainerProps> = ({ className, side, heading, description, ...rest }) => {
  return (
    <div className={`${className} w-full max-w-400 grid-contain place-items-center`} {...rest}>
      {side === 'left' ? <ContainerLeft /> : <ContainerRight />}
      <div className="flex flex-col items-center justify-center gap-12">
        <h3 className="text-32 lg:text-36">{heading}</h3>
        <p className="text-14 font-mono max-w-250 text-center">{description}</p>
      </div>
    </div>
  );
};

const ContainerLeft = () => {
  return (
    <svg className="w-full h-auto" width="423" height="468" viewBox="0 0 423 468" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M233.964 467.347C105.07 467.347 0.580556 362.858 0.580556 233.964C0.580556 105.07 105.07 0.580556 233.964 0.580556H421.774V467.347H233.964Z"
        stroke="var(--color-off-white)"
        strokeWidth="1.16111"
      />
    </svg>
  )
}

const ContainerRight = () => {
  return (
    <svg className="w-full h-auto" width="423" height="468" viewBox="0 0 423 468" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M188.39 467.347C317.284 467.347 421.773 362.858 421.773 233.964C421.773 105.07 317.284 0.580556 188.39 0.580556H0.579926V467.347H188.39Z"
        stroke="var(--color-off-white)"
        strokeWidth="1.16111"
      />
    </svg>
  )
}

