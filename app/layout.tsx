import "./globals.css";
import Loading from "./loading";
import type { Metadata } from "next";
import React, { Suspense } from "react";
import { Inter } from "next/font/google";
import { ReduxProviders } from "@/lib/providers";
import ThemeRegistry from "./components/Registry/ThemeRegistry";
import GlobalSnackBar from "./components/shared/GlobalSnackBar";
import AuthProvider from "./components/Registry/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bob-Ui",
  description: "Bob Ui with Mui Library",
  icons: "/images/favicon.png",
};

export default function RootLayout(props: React.PropsWithChildren) {
  return (
    <AuthProvider>
      <ReduxProviders>
        <html lang="en">
          <head>
            <link rel="preconnect" href="https://fonts.googleapis.com"  as="style"/>
            <link rel="preconnect" href="https://fonts.gstatic.com"  as="style"/>
            <link
              href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap"
              rel="stylesheet"  as="style"
            />
          </head>
          <body suppressHydrationWarning={true} className={inter.className}>
            <Suspense fallback={<Loading />}>
              <ThemeRegistry>
                {props?.children}
                <GlobalSnackBar />
              </ThemeRegistry>
            </Suspense>
          </body>
        </html>
      </ReduxProviders>
    </AuthProvider>
  );
}
