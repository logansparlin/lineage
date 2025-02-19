import type { FC } from "react";

interface FooterProps {}

export const Footer: FC<FooterProps> = () => {
  return (
    <footer className="min-h-screen flex items-center justify-center text-58 bg-black relative z-[5]">
      Be real
    </footer>
  )
}