import type { Metadata } from 'next'
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { VisualEditing } from "next-sanity";
import { settingsFooterQuery, settingsQuery, settingsSeoQuery } from "@/sanity/queries/settings";
import { useMetadata } from "@/hooks/use-metadata";
import { draftMode } from "next/headers";
import localFont from "next/font/local";

import { LayoutTransition } from "@/components/global/layout-transition";
import { ReactLenis } from "lenis/react";
import { Header } from "@/components/global/header";
import { SetVH } from "@/components/global/SetVH";

import "./globals.css";
import { Footer } from '@/components/global/footer';
import { Cursor } from '@/components/global/cursor';

const ArizonaText = localFont({
  src: [
    {
      path: '../fonts/ABCArizonaText-Regular.woff2',
      weight: '400',
      style: 'normal'
    },
    {
      path: '../fonts/ABCArizonaText-RegularItalic.woff2',
      weight: '400',
      style: 'italic'
    }
  ],
  display: 'swap',
  variable: '--font-arizona-text'
})

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await sanityFetch({ query: settingsSeoQuery })

  return useMetadata({ data, useTitleTemplate: false })
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [{ data: settings }, { data: footerSettings }] = await Promise.all([
    sanityFetch({ query: settingsQuery }),
    sanityFetch({ query: settingsFooterQuery })
  ])

  return (
    <html lang="en">
      <body
        className={`${ArizonaText.variable} antialiased font-sans font-normal bg-black text-off-white cursor-none`}
      >
        <Cursor />
        <Header {...settings?.header} />
        <SetVH />
        <SanityLive />
        <LayoutTransition>
            {children}
            <Footer {...footerSettings} />
        </LayoutTransition>
        {(await draftMode()).isEnabled && <VisualEditing />}
      </body>
    </html>
  );
}
