'use client'

import { FC, useEffect } from "react";
import { useSiteStore } from "@/stores/use-site-store";

interface CaseNavigationSettersProps {
  nextCaseStudy: any;
  previousCaseStudy: any;
}

export const CaseNavigationSetters: FC<CaseNavigationSettersProps> = ({
  nextCaseStudy,
  previousCaseStudy,
}) => {
  const setCaseSlugs = useSiteStore((state) => state.setCaseSlugs);
  const resetCaseSlugs = useSiteStore((state) => state.resetCaseSlugs);
  
  useEffect(() => {
    setCaseSlugs({ next: nextCaseStudy.slug, previous: previousCaseStudy.slug });

    return () => {
      resetCaseSlugs();
    }
  }, [nextCaseStudy, previousCaseStudy]);

  return null;
}