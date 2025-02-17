import { useEffect, useMemo } from "react"

interface UseDynamicMetaTitleProps {
  title?: string
  enabled?: boolean  
}

export const useDynamicMetaTitle = ({ title, enabled = false }: UseDynamicMetaTitleProps) => {
  const defaultTitle = 'Lineage'

  const originalTitle = useMemo(() => {
    if (typeof window !== 'undefined') {
      return window.document.title
    }

    return 'Lineage'
  }, [])

  const parsedTitle = useMemo(() => {
    if (enabled) {
      return `${title} | ${defaultTitle}`
    }

    return originalTitle
  }, [enabled, title])

  useEffect(() => {
    if (typeof window !== 'undefined' && title) {
      window.document.title = parsedTitle
    }
  }, [enabled, title])

  return parsedTitle
}