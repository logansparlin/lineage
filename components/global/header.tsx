'use client'

import { useCallback, useEffect, useRef, type FC } from "react";
import { useHomeStore } from "../home/hooks/use-home-store";
import { useSiteStore } from "@/stores/use-site-store";
import { useClickAway } from "react-use";
import { getRandomGradient } from "@/lib/gradients";

import { AnimatePresence, motion } from "motion/react";
import { Logo } from "./logo";
import { IconDice } from "../icons/icon-dice";
import { Button } from "./button";
import { MainMenu } from "./main-menu";
import Link from "next/link";
import { easings } from "@/lib/easings";
import { usePathname } from "next/navigation";

export interface HeaderProps {}

export const Header: FC<HeaderProps> = (props) => {
  const menuOpen = useSiteStore((state) => state.menuOpen);
  const colorButtonVisible = useSiteStore((state) => state.colorButtonVisible);
  const setColorButtonVisible = useSiteStore((state) => state.setColorButtonVisible);
  const isAnimatingGradient = useSiteStore((state) => state.isAnimatingGradient);
  const setMenuOpen = useSiteStore((state) => state.setMenuOpen);
  const setGradient = useHomeStore((state) => state.setGradient);
  const pathname = usePathname();

  useEffect(() => {
    setColorButtonVisible(false);
  }, [pathname])

  const menuRef = useRef<HTMLDivElement>(null);

  useClickAway(menuRef, () => {
    setMenuOpen(false);
  });

  const shuffleGradient = useCallback(() => {
    const nextGradient = getRandomGradient();

    setGradient(nextGradient.label);

    if (menuOpen) {
      setMenuOpen(false);
    }
  }, [menuOpen])

  const toggleMenu = useCallback(() => {
    setMenuOpen(!menuOpen);
  }, [menuOpen, setMenuOpen])

  return (
    <header className="w-full px-20 py-20 md:px-40 md:py-24 fixed top-0 left-0 z-[500] flex items-start justify-between">
      <Link href="/" scroll={false} className="relative z-[2]">
        <span className="sr-only">Lineage</span>
        <Logo className="h-22 w-auto" />
      </Link>

      <div ref={menuRef} className="flex items-start gap-8">
        <MainMenu />
        <AnimatePresence>
          {colorButtonVisible ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <Button
                className="px-18"
                onClick={shuffleGradient}
                disabled={isAnimatingGradient}
              >
                <IconDice className="h-18 w-auto" />
              </Button>
            </motion.div>
          ) : null}
        </AnimatePresence>
        <Button
          className="relative z-[2]"
          onClick={toggleMenu}
        >
          <AnimatePresence mode="popLayout">
            {!menuOpen ? (
              <motion.div
                key="menu"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{
                  duration: 0.35,
                  ease: easings.inOutExpo
                }}
              >
                <span>Menu</span>
              </motion.div>
            ) : null}
            {menuOpen ? (
              <motion.div
                key="close"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{
                  duration: 0.35,
                  ease: easings.inOutExpo
                }}
              >
                <span>Close</span>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </Button>
      </div>
    </header>
  )
}