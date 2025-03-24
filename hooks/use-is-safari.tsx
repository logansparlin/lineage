'use client'

import { useState, useEffect } from 'react'

/**
 * Hook to detect if the current browser is Safari
 * @returns {boolean} True if the browser is Safari, false otherwise
 */
export const useIsSafari = (): boolean => {
  const [isSafari, setIsSafari] = useState<boolean>(false)

  useEffect(() => {
    // Only run in browser environment
    if (typeof window === 'undefined') return

    // Safari detection based on user agent and vendor
    const userAgent = window.navigator.userAgent
    const vendor = window.navigator.vendor
    
    const isSafariCheck = /Safari/i.test(userAgent) && 
                          /Apple Computer/.test(vendor) && 
                          !/Chrome/.test(userAgent) && 
                          !/CriOS/.test(userAgent) &&
                          !/FxiOS/.test(userAgent)
    
    setIsSafari(isSafariCheck)
  }, [])

  return isSafari
}
