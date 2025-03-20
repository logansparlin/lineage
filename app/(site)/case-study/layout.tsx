import { ReactLenis } from "lenis/react";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div id="case-study-layout" className="md:w-screen md:h-screen md:overflow-hidden">
      <ReactLenis
        root={false}
        options={{ orientation: 'horizontal', gestureOrientation: 'both', syncTouch: false }}
        className="md:overflow-x-auto md:overflow-y-hidden"
      >
        {children}
      </ReactLenis>
    </div>
  );
}
