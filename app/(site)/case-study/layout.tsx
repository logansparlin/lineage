import { ReactLenis } from "lenis/react";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactLenis root options={{ orientation: 'horizontal' }} className="overflow-x-auto overflow-y-hidden">
      <div className="w-fit h-screen flex items-center px-100">
        {children}
      </div>
    </ReactLenis>
  );
}
