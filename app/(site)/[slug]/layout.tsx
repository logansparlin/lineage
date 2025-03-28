import { ReactLenis } from "lenis/react";

export default async function PageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactLenis root className="legal-layout overflow-y-auto overflow-x-hidden">
      <div className="py-90 px-20 max-w-850 mx-auto">
        {children}
      </div>
    </ReactLenis>
  );
}
