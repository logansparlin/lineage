import type { Metadata } from 'next'
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { VisualEditing } from "next-sanity";
import { settingsQuery, settingsSeoQuery } from "@/sanity/queries/settings";
import { useMetadata } from "@/hooks/use-metadata";
import { draftMode } from "next/headers";
import localFont from "next/font/local";

import { IBM_Plex_Mono } from "next/font/google";

import { LayoutTransition } from "@/components/global/layout-transition";
import { Header } from "@/components/global/header";
import { SetVH } from "@/components/global/SetVH";
import { Cursor } from '@/components/global/cursor';
import { Favicon } from '@/components/global/favicon';

import "./globals.css";

const PPNeueMontreal = localFont({
  src: [
    {
      path: '../fonts/PPNeueMontreal-Book.woff',
      weight: '400',
      style: 'normal'
    },
    {
      path: '../fonts/PPNeueMontreal-Book.woff2',
      weight: '400',
      style: 'normal'
    },
    {
      path: '../fonts/PPNeueMontreal-BookItalic.woff',
      weight: '400',
      style: 'italic'
    },
    {
      path: '../fonts/PPNeueMontreal-BookItalic.woff2',
      weight: '400',
      style: 'italic'
    },
    {
      path: '../fonts/PPNeueMontreal-Medium.woff',
      weight: '500',
      style: 'normal'
    },
    {
      path: '../fonts/PPNeueMontreal-Medium.woff2',
      weight: '500',
      style: 'normal'
    },
  ],
  display: 'swap',
  variable: '--font-pp-neue-montreal'
})

const IBMPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400'],
  variable: '--font-ibm-plex-mono'
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
  const { data: settings } = await sanityFetch({ query: settingsQuery })

  return (
    <html lang="en">
      <head>
        {/* <script src="https://unpkg.com/react-scan/dist/auto.global.js" /> */}
      </head>
      <body
        className={`${PPNeueMontreal.variable} ${IBMPlexMono.variable} antialiased font-sans font-normal bg-black text-off-white md:cursor-none`}
      >
        <Cursor />
        <Favicon icons={settings?.seo?.favicon} />
        <Header {...settings?.header} />
        <SetVH />
        <SanityLive />
        <LayoutTransition className="w-full">
            {children}
        </LayoutTransition>
        {(await draftMode()).isEnabled && <VisualEditing />}
      </body>
    </html>
  );
}
