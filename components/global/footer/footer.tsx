import type { FC } from "react";

interface FooterProps {}

export const Footer: FC<FooterProps> = () => {
  return (
    <footer id="site-footer" className="w-full h-screen flex items-center justify-center text-32 lg:text-58 font-medium relative z-[5] bg-black">
        <div
          className="hidden md:block absolute left-0 bottom-1/2 bg-black w-full h-[100%] rounded-[50%] origin-center blur-[80px]"
          style={{
            boxShadow: '0 0 100px 200px rgba(0, 0, 0, 1)'
          }}
        />
      <span className="relative z-[2]">Be real</span>
    </footer>
  )
}