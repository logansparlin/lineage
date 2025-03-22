import { ReactLenis } from "lenis/react";
import { CaseStudyCanvas } from "@/components/case-study/case-study-canvas";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative md:w-screen md:h-screen md:overflow-hidden case-layout">
      <CaseStudyCanvas />
      
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
