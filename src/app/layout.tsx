import "~/styles/globals.css";
import { ClerkProvider } from '@clerk/nextjs'
import { GeistSans } from "geist/font/sans";
import { TRPCReactProvider } from "~/trpc/react";
import MenuBottom from "./_components/menu/menuBottom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import MenuTop from "./_components/menu/menuTop";

export const metadata = {
  title: "My EMail",
  description: "Create lists and add emails connected to emailJS",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${GeistSans.variable}`}>
        <body data-theme="nord" className="flex min-h-screen flex-col items-center justify-center">
          <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
            <MenuTop/>
            <TRPCReactProvider>{children}</TRPCReactProvider>
            <MenuBottom />
            <ToastContainer />
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
