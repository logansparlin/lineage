'use client'

import Link from "next/link";
import { type FC, type ReactNode, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Logo } from "./logo";

export interface HeaderProps {
  
}

export const Header: FC<HeaderProps> = (props) => {
  const {} = props

  return (
    <header className="w-full px-20 py-20 md:px-40 md:py-24 fixed top-0 left-0 z-[500]">
      <Link href="/">
        <span className="sr-only">Lineage</span>
        <Logo className="h-22 w-auto" />
      </Link>
    </header>
  )
}