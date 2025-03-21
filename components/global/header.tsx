'use client'

import { useCallback, useEffect, useMemo, useRef, type FC } from "react";
import { useHomeStore } from "../home/hooks/use-home-store";
import { useSiteStore } from "@/stores/use-site-store";
import { useClickAway } from "react-use";
import { getRandomGradient } from "@/lib/gradients";
import { usePathname } from "next/navigation";
import { easings } from "@/lib/easings";

import { AnimatePresence, motion } from "motion/react";
import { Logo } from "./logo";
import { IconDice } from "../icons/icon-dice";
import { Button } from "./button";
import { ButtonLink } from "./button-link";
import { MainMenu } from "./main-menu";
import Link from "next/link";

export interface HeaderProps {}

export const Header: FC<HeaderProps> = (props) => {
  const publish = useSiteStore((state) => state.publish);
  const menuOpen = useSiteStore((state) => state.menuOpen);
  const colorButtonVisible = useSiteStore((state) => state.colorButtonVisible);
  const setColorButtonVisible = useSiteStore((state) => state.setColorButtonVisible);
  const isAnimatingGradient = useSiteStore((state) => state.isAnimatingGradient);
  const setMenuOpen = useSiteStore((state) => state.setMenuOpen);
  const setGradient = useHomeStore((state) => state.setGradient);
  const caseSlugs = useSiteStore((state) => state.caseSlugs);
  const pathname = usePathname();
  const scrollStart = useRef(0);

  useEffect(() => {
    setColorButtonVisible(false);
  }, [pathname])

  const isCaseStudy = useMemo(() => {
    return pathname.includes('/case-study/')
  }, [pathname])

  const menuRef = useRef<HTMLDivElement>(null);

  useClickAway(menuRef, () => {
    setMenuOpen(false);
  });

  useEffect(() => {
    const handleScroll = () => {
      if (Math.abs(window.scrollY - scrollStart.current) > 100) {
        setMenuOpen(false);
      }
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  })

  useEffect(() => {
    if (menuOpen) {
      scrollStart.current = window.scrollY;
    }
  }, [menuOpen])

  const shuffleGradient = useCallback(() => {
    const nextGradient = getRandomGradient();

    setGradient(nextGradient.label);

    if (menuOpen) {
      setMenuOpen(false);
    }
  }, [menuOpen])

  const toggleMenu = useCallback((e: any) => {
    e.preventDefault();
    e.stopPropagation();

    setMenuOpen(!menuOpen);
  }, [menuOpen, setMenuOpen])

  const onLogoClick = useCallback((e: any) => {
    if (pathname === '/') {
      e.preventDefault();
      e.stopPropagation();
      console.log('calling publish')
      publish('scroll-to-top', null);
    }
  }, [publish, pathname])

  return (
    <header className="w-full px-20 py-20 md:px-40 md:py-24 fixed top-0 left-0 z-[500] flex items-center md:items-start justify-between">
      <div inert className="absolute top-0 left-0 w-full h-[calc(100%+12px)] bg-linear-to-b from-black from-70% to-transparent -z-[1] md:hidden"></div>
      <Link href="/" scroll={false} className="relative z-[2]" onClick={onLogoClick}>
        <span className="sr-only">Lineage</span>
        <Logo className="h-22 w-auto" />
      </Link>

      <div ref={menuRef} className="flex items-start">
        <MainMenu />
        <div className="flex items-start justify-end gap-8 min-w-[25vw]">
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
          <AnimatePresence initial={false}>
            {isCaseStudy && caseSlugs?.next && caseSlugs?.previous ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-6 md:pr-40"
              >
                <ButtonLink
                  href={`/case-study/${caseSlugs.previous}`}
                  className="px-10 md:px-12 flex items-center gap-x-6"
                >
                  <span>&larr; </span>
                  <span className="max-md:sr-only">Back</span>
                </ButtonLink>
                <ButtonLink
                  href={`/case-study/${caseSlugs.next}`}
                  className="px-10 md:px-12 flex items-center gap-x-6"
                >
                  <span className="max-md:sr-only">Next</span>
                  <span>&rarr; </span>
                </ButtonLink>
              </motion.div>
            ) : null}
          </AnimatePresence>
          <Button
            className="relative z-[2] w-70 md:w-80"
            onClick={toggleMenu}
          >
            <AnimatePresence mode="popLayout" initial={false}>
              {!menuOpen ? (
                <motion.span
                  key="menu"
                  className="inline-block h-auto"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{
                    duration: 0.35,
                    ease: easings.inOutExpo
                  }}
                >
                  <span>Menu</span>
                </motion.span>
              ) : null}
              {menuOpen ? (
                <motion.span
                  key="close"
                  className="inline-block h-auto"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{
                    duration: 0.35,
                    ease: easings.inOutExpo
                  }}
                >
                  <span>Close</span>
                </motion.span>
              ) : null}
            </AnimatePresence>
          </Button>
        </div>
      </div>
      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            initial={{ clipPath: 'inset(0% 0% 100% 0%)' }}
            animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
            exit={{ clipPath: 'inset(0% 0% 100% 0%)', transition: {
              duration: 0.65, delay: 0.25, ease: easings.outExpo
            } }}
            transition={{ duration: 0.65, ease: easings.outExpo }}
            className="max-md:hidden absolute top-0 left-0 w-full h-full bg-black z-[-1]"></motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}