import { ReactLenis } from "lenis/react";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactLenis root options={{ orientation: 'horizontal' }}>
      <div className="w-fit min-h-screen flex items-center px-40">
        {children}
        <div className="w-[300vh] h-screen bg-[blue]" />
      </div>
    </ReactLenis>
  );
}
