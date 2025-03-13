import { scrollConfig } from "@/lib/scroll-config";
import { ReactLenis } from "lenis/react";

import 'lenis/dist/lenis.css'

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactLenis
      root
      className="overflow-auto"
      options={scrollConfig}
    >
      <div className="py-90 px-20 max-w-1080 mx-auto">
        {children}
      </div>
    </ReactLenis>
  );
}
