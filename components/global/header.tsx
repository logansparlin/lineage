'use client'

import Link from "next/link";
import { type FC, type ReactNode, useCallback, useEffect, useMemo, useRef, useState } from "react";

export interface HeaderProps {
  
}

export const Header: FC<HeaderProps> = (props) => {
  const {} = props

  return (
    <header className="w-full p-20 fixed top-0 left-0 w-screen">
      <Link href="/">Lineage</Link>
    </header>
  )
}