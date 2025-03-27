import type { FC } from "react";

interface FooterProps {}

export const Footer: FC<FooterProps> = () => {
  return (
    <footer id="site-footer" className="w-full overflow-hidden flex items-end relative z-[5] h-screen-150 -mt-screen-50">
        <div
          className="max-md:hidden block absolute z-[1] left-0 top-[50vh] w-full h-[30vh] rounded-[50%] origin-center scale-x-[1.5]"
          style={{
            boxShadow: '0 0 140px 180px rgba(0, 0, 0, 1)'
          }}
        />
      <div className="w-full h-screen relative flex items-center justify-center text-32 lg:text-58 font-medium z-[2] bg-black">
        <span className="relative z-[2]">Be real</span>
      </div>
    </footer>
  )
}