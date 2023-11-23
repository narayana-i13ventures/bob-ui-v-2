/* Components */
import { ReduxProviders } from '@/lib/providers'
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./Registry/ThemeRegistry";
import ProgressBar from "./loading";
import { Suspense } from "react";
import { getServerSession } from 'next-auth';
import { options } from './api/auth/[...nextauth]/options';
import AuthProvider from './Registry/AuthProvider';
import Head from 'next/head';


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bob-Ui",
  description: "Created with Next Js App Router",
  icons: '/images/favicon.png'
};

export default async function RootLayout(props: React.PropsWithChildren) {
  const session = await getServerSession(options);

  return (
    <AuthProvider>
      <ReduxProviders>
        <html lang="en">
          <body className={inter.className}>
            <Providers>
              
              <Suspense fallback={<ProgressBar />}>
                {/* <ErrorBoundary fallback={<Error />}> */}
                {props.children}
                {/* </ErrorBoundary> */}
              </Suspense>
            </Providers>
          </body>
        </html>
      </ReduxProviders>
    </AuthProvider>
  )
}
