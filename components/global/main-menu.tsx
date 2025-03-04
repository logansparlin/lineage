'use client'

import { type FC, type ComponentProps } from "react";
import { useSiteStore } from "@/stores/use-site-store";
import { useKeyPress } from "@/hooks/use-key-press";
import { easings } from "@/lib/easings";

import { AnimatePresence, motion } from "framer-motion";
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
      url: '#',
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
      url: 'https://instagram.com',
      type: 'link'
    },
    {
      label: 'LinkedIn',
      url: 'https://linkedin.com',
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
          className={`${className} ${menuOpen ? 'grid' : 'hidden'} grid-cols-2 gap-x-72 pr-180 pt-8`}
        >
          {menus?.map((menu, index) => {
            return (
              <ul key={`menu-${index}`} className="flex flex-col">
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
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

const MenuItem = ({ label, url = undefined, type, index, onClick, total, offset }) => {
  const baseTransition = { duration: 0.75, ease: easings.outExpo }
  return (
    <motion.li
      className="will-change-auto transform-gpu"
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
      {type === 'text' ? label : <Link className="transform-gpu" href={url} onClick={onClick}>{label}</Link>}
    </motion.li>
  )
}