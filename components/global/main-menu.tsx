'use client'

import { type FC, type ComponentProps, useMemo } from "react";
import { useSiteStore } from "@/stores/use-site-store";
import { useKeyPress } from "@/hooks/use-key-press";
import { easings } from "@/lib/easings";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";

interface MainMenuProps extends ComponentProps<'div'> {}

interface Link {
  label: string;
  url?: string;
  type: 'link' | 'text';
}

const menus = [
  [
    {
      label: 'Case Studies',
      url: '/#case-studies',
      type: 'link'
    },
    {
      label: 'Team',
      url: '/team',
      type: 'link'
    },
    {
      label: 'Legal policy',
      url: '/legal/legal-policy',
      type: 'link'
    }
  ],
  [
    {
      label: 'Located in LA',
      type: 'text'
    },
    {
      label: 'Instagram',
      url: 'https://www.instagram.com/lineagedigital',
      type: 'link'
    },
    {
      label: 'LinkedIn',
      url: 'https://www.linkedin.com/company/lineage-digital/',
      type: 'link'
    }
  ]
]

export const MainMenu: FC<MainMenuProps> = ({ className }) => {
  const menuOpen = useSiteStore((state) => state.menuOpen);
  const setMenuOpen = useSiteStore((state) => state.setMenuOpen);
  
  useKeyPress('Escape', () => {
    setMenuOpen(false);
  });

  const onLinkClick = () => {
    setMenuOpen(false);
  }

  return (
    <AnimatePresence mode="wait">
      {menuOpen ? (
        <motion.div 
          className="
            max-md:absolute max-md:w-full max-md:bg-black max-md:top-0 max-md:left-0 z-[1] md:pr-180 overflow-hidden
            [--h-from:0px] md:[--h-from:100%]
          "
          initial={{ height: 'var(--h-from)' }}
          animate={{ height: 'auto' }}
          exit={{ height: 'var(--h-from)' }}
          transition={{ duration: 0.75, ease: easings.outExpo }}
        >
          <div className="flex flex-col max-md:gap-y-32 pt-100 pb-32 px-20 md:pt-0 md:pb-0 md:px-0 md:grid md:grid-cols-2 md:gap-x-72">
            {menus?.map((menu, index) => {
              return (
                <ul key={`menu-${index}`} className={`flex flex-col group ${index === 0 ? 'max-md:text-36 md:text-20' : 'gap-y-6 md:gap-y-0 text-20'}`}>
                  {menu?.map((link, linkIndex) => (
                    <MenuItem
                      key={`menu-${index}-${linkIndex}`}
                      onClick={onLinkClick}
                      total={menu.length}
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

const MenuItem = ({ label, url = undefined, type, index, onClick, total, offset }) => {
  const baseTransition = { duration: 0.75, ease: easings.outExpo }
  const isExternal = useMemo(() => {
    return url?.includes('http')
  }, [url])

  return (
    <motion.li
      className="will-change-transform transform-gpu group-hover:text-white/30 group-hover:hover:text-white transition-colors duration-300 ease"
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
      {type === 'text' ? label : <Link href={url} target={isExternal ? '_blank' : undefined} onClick={onClick} scroll={false} className="transform-gpu">{label}</Link>}
    </motion.li>
  )
}