import type { FC } from "react";

interface FooterProps {}

export const Footer: FC<FooterProps> = () => {
  return (
    <footer className="min-h-screen flex items-center justify-center text-58 bg-black relative z-[5]">
      <div className="absolute z-[1] -left-[25%] bottom-0 bg-black w-[150%] h-[150%] rounded-[100%] blur-[120px]" />
      <span className="relative z-[2]">Be real</span>
    </footer>
  )
}