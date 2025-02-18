import { ReactLenis } from "lenis/react";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactLenis root>
      <div className="py-90 px-20 max-w-800 mx-auto">
        {children}
      </div>
    </ReactLenis>
  );
}
