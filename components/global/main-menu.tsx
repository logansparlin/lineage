'use client'

import { type FC, type ComponentProps, useMemo, useCallback } from "react";
import { useSiteStore } from "@/stores/use-site-store";
import { useKeyPress } from "@/hooks/use-key-press";
import { getRelativePath } from "@/sanity/lib/links";
import { easings } from "@/lib/easings";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useLenis } from "lenis/react";

interface MainMenuProps extends ComponentProps<'div'> {
  columns: {
    _key: string;
    links: any[];
  }[];
}

interface Link {
  label: string;
  url?: string;
  type: 'link' | 'text';
}

export const MainMenu: FC<MainMenuProps> = ({ columns }) => {
  const menuOpen = useSiteStore((state) => state.menuOpen);
  const setMenuOpen = useSiteStore((state) => state.setMenuOpen);
  
  useKeyPress('Escape', () => {
    setMenuOpen(false);
  });

  const onLinkClick = () => {
    setMenuOpen(false);
  }

  return (
    <AnimatePresence>
      {menuOpen ? (
        <motion.div 
          className="
            absolute max-md:w-full max-md:bg-black max-md:left-0 z-[1] md:relative right-0 top-0 overflow-hidden
            [--h-from:0px] md:[--h-from:auto]
          "
          initial={{ height: 'var(--h-from)' }}
          animate={{ height: 'auto' }}
          exit={{ height: 'var(--h-from)' }}
          transition={{ duration: 0.75, ease: easings.outExpo }}
        >
          <div className="flex flex-col max-md:gap-y-32 pt-100 pb-32 px-20 md:pt-0 md:pb-0 md:px-0 md:grid md:grid-cols-2 md:gap-x-72">
            {columns?.map((column, index) => {
              return (
                <ul key={`menu-${index}`} className={`flex flex-col group ${index === 0 ? 'max-md:text-36 md:text-20' : 'gap-y-6 md:gap-y-0 text-20'}`}>
                  {column.links?.map((link, linkIndex) => (
                    <MenuItem
                      key={`menu-${index}-${linkIndex}`}
                      onClick={onLinkClick}
                      total={column.links.length}
                      index={linkIndex}
                      offset={index}
                      {...link}
                    />
                  ))}
                </ul>
              )
            })}
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

const MenuItem = (props) => {
  const { label, url = undefined, _type, index, to, onClick, total, offset, text } = props;

  const baseTransition = { duration: 0.75, ease: easings.outExpo }
  const lenis = useLenis();

  const isCaseStudiesLink = useMemo(() => {
    return url?.includes('#case-studies')
  }, [url])

  const handleLinkClick = useCallback(() => {
    if (isCaseStudiesLink) {
      lenis?.scrollTo('#case-studies', {
        offset: 0
      })
    }

    onClick?.()
  }, [onClick, isCaseStudiesLink, lenis])

  const interactiveClass = useMemo(() => {
    if (_type === 'textBlock') {
      return 'text-white'
    }

    return 'will-change-transform transform-gpu group-hover:text-white/30 group-hover:hover:text-white transition-colors duration-300 ease'
  }, [_type])

  if (to?.hidden) return null;

  return (
    <motion.li
      className={interactiveClass}
      initial={{ opacity: 0, y: 8 }}
      animate={{ 
        opacity: 1,
        y: 0,
        transition: {
          ...baseTransition,
          delay: (offset * 0.075) + (index * 0.05)
        }
      }}
      exit={{ 
        opacity: 0,
        y: 8,
        transition: {
          ...baseTransition,
          delay: (offset * 0.075) + ((total - index) * 0.05)
        }
      }}
    >
      {_type === 'textBlock' ? text : ( 
        <Link
          href={getRelativePath({ type: _type, slug: url })}
          target={_type == 'externalLink' ? '_blank' : '_self'}
          onClick={handleLinkClick}
          scroll={false}
          className="transform-gpu"
        >
          {label}
        </Link>
      )}
    </motion.li>
  )
}