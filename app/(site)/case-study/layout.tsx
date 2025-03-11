import { ReactLenis } from "lenis/react";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactLenis root options={{ orientation: 'horizontal', gestureOrientation: 'both', syncTouch: false }} className="md:overflow-x-auto md:overflow-y-hidden">
      {children}
    </ReactLenis>
  );
}
