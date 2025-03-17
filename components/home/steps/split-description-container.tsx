import { type FC, type ComponentProps } from "react";

interface SplitDescriptionContainerProps extends ComponentProps<'div'> {
  className?: string;
  side: 'left' | 'right';
  heading: string;
  description: string;
}

export const SplitDescriptionContainer: FC<SplitDescriptionContainerProps> = ({ className, side, heading, description, ...rest }) => {
  return (
    <div className={`${className} w-[85%] md:w-full md:max-w-400 grid-contain place-items-center`} {...rest}>
      {side === 'left' ? <ContainerLeft /> : <ContainerRight />}
      <div className={`flex flex-col items-center justify-center gap-6 md:gap-12 ${side === 'right' ? 'pb-50 md:pb-0' : 'pt-20 md:pt-0'}`}>
        <h3 className="text-32 lg:text-36">{heading}</h3>
        <p className="text-14 font-mono max-w-220 md:max-w-250 text-center">{description}</p>
      </div>
    </div>
  );
};

const ContainerLeft = () => {
  return (
    <>
      <svg className="hidden md:block w-full h-auto" width="423" height="468" viewBox="0 0 423 468" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M233.964 467.347C105.07 467.347 0.580556 362.858 0.580556 233.964C0.580556 105.07 105.07 0.580556 233.964 0.580556H421.774V467.347H233.964Z"
          stroke="var(--color-off-white)"
          strokeWidth="1.16111"
        />
      </svg>
      <svg className="w-full h-auto md:hidden" width="300" height="271" viewBox="0 0 300 271" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M299.554 150C299.554 67.4039 232.596 0.446439 150 0.446435C67.4039 0.446432 0.446426 67.4038 0.446422 150L0.446417 270.335L299.554 270.335L299.554 150Z" stroke="var(--color-off-white)" strokeWidth="0.892857"/>
      </svg>
    </>
  )
}

const ContainerRight = () => {
  return (
    <>
    <svg className="hidden md:block -ml-2 w-full" width="423" height="468" viewBox="0 0 423 468" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M188.39 467.347C317.284 467.347 421.773 362.858 421.773 233.964C421.773 105.07 317.284 0.580556 188.39 0.580556H0.579926V467.347H188.39Z"
        stroke="var(--color-off-white)"
        strokeWidth="1.16111"
      />
    </svg>
    <svg className="-mt-1 w-full h-auto md:hidden" width="300" height="271" viewBox="0 0 300 271" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0.446448 120.782C0.446445 203.378 67.4038 270.335 150 270.335C232.596 270.335 299.554 203.378 299.554 120.782L299.554 0.446455L0.446453 0.446442L0.446448 120.782Z" stroke="var(--color-off-white)" strokeWidth="0.892857"/>
    </svg>
    </>
  )
}

