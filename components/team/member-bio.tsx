'use client'

import { useMemo, useCallback } from "react"
import { useTeamPageStore } from "./use-team-page"
import { AnimatePresence, motion } from "framer-motion"
import { SitePortableText } from "../global/site-portable-text"
import { easings } from "@/lib/easings"

export const MemberBio = ({ slug, bio }) => {
  const expandedMember = useTeamPageStore((state) => state.expandedMember);
  const setExpandedMember = useTeamPageStore((state) => state.setExpandedMember);

  const isExpanded = useMemo(() => expandedMember === slug, [expandedMember, slug]);

  const toggleExpanded = useCallback(() => {
    setExpandedMember(isExpanded ? null : slug);
  }, [isExpanded, setExpandedMember, slug]);

  return (
    <div className="w-full text-18 lg:text-20">
      <div className="w-full hidden md:block">
        <SitePortableText value={bio} />
      </div>

      <div className="md:hidden">
        <button
          className={`flex items-center gap-x-4 transition-colors duration-300 ease ${isExpanded ? 'text-[var(--button-color)]' : 'text-white'}`}
          onClick={toggleExpanded}
        >
          <span>Read bio</span>
          <div className="h-[1em] w-16 relative grid-contain place-items-center">
            <motion.div
              className="w-8 h-1 bg-current will-change-transform"
              initial={{ x: 0 }}
              animate={{ x: isExpanded ? 8 : 0 }}
              transition={{ duration: 0.55, ease: easings.outExpo }}
            />
            <motion.div
              className="w-8 h-1 bg-current will-change-transform"
              initial={{ rotate: 90 }}
              animate={{ rotate: isExpanded ? 0 : 90 }}
              transition={{ duration: 0.55, ease: easings.outExpo }}
            />
          </div>
        </button>
      </div>

      <AnimatePresence>
        {isExpanded ? (
          <motion.div
            className="w-full overflow-hidden opacity-0"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.45, ease: easings.outExpo }}
          >
            <div className="w-full pt-20">
              <SitePortableText value={bio} />
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}