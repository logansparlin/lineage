'use client'

import { useCallback, type FC } from "react";
import { useHomeStore } from "../home/hooks/use-home-store";
import { getRandomGradient } from "@/lib/gradients";

import { Logo } from "./logo";
import { IconDice } from "../icons/icon-dice";
import Link from "next/link";

export interface HeaderProps {
  
}

export const Header: FC<HeaderProps> = (props) => {
  const setNextGradient = useHomeStore((state) => state.setNextGradient);
  const isColorChanging = useHomeStore((state) => state.isColorChanging);

  const shuffleGradient = useCallback(() => {
    const nextGradient = getRandomGradient();

    setNextGradient(nextGradient.label);
  }, [])

  return (
    <header className="w-full px-20 py-20 md:px-40 md:py-24 fixed top-0 left-0 z-[500] flex items-center justify-between">
      <Link href="/">
        <span className="sr-only">Lineage</span>
        <Logo className="h-22 w-auto" />
      </Link>

      <div className="flex items-center gap-8">
        <button
          className="px-18 h-36 border-1 border-white rounded-full flex items-center justify-center"
          onClick={shuffleGradient}
          disabled={isColorChanging}
        >
          <IconDice className="h-18 w-auto" />
        </button>
        <button className="px-14 h-36 border-1 border-white rounded-full text-24 !leading-none flex items-center justify-center">
          Menu
        </button>
      </div>
    </header>
  )
}