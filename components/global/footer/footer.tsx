import type { FC } from "react";
import { sanityFetch } from "@/sanity/lib/live";
import { settingsFooterQuery } from "@/sanity/queries/settings";

import { RichTextSimple } from '@/components/global/rich-text-simple'

interface FooterProps {
  columns: any
  externalLinks: any
}

export const Footer: FC<FooterProps> = () => {
  return (
    <footer className="px-site-x py-site-y mt-200 flex flex-col md:site-grid text-footer">
      Footer
    </footer>
  )
}