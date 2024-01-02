"use client";
import * as React from "react";
import { generateThemeOptions } from "./theme";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import NextAppDirEmotionCacheProvider from "./EmotionCache";
import { useSelector, selectApp } from "@/lib/redux";
import { useMediaQuery } from "@mui/material";
import { signIn, useSession } from "next-auth/react";
import Loading from "@/app/loading";
import { useEffect } from "react";
import { log } from "console";

export default function ThemeRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  const { mode } = useSelector(selectApp);
  const matches = useMediaQuery("(max-width:920px)");

  const theme = createTheme(
    generateThemeOptions({
      mode: mode,
    })
  );
  const session: any = useSession();

  useEffect(() => {
    if (session?.error === "RefreshAccessTokenError" || session.status === 'unauthenticated') {
      signIn('keycloak', {
        callbackUrl: `https://bob-ui-v-2.vercel.app`,
      }); // Force sign in to hopefully resolve error
    }
  }, [session]);
  return (
    <NextAppDirEmotionCacheProvider options={{ key: "mui" }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {(session?.status !== 'loading' && session?.status !== 'unauthenticated') ? (
          <>
            {matches ? (
              <div className="w-full h-screen flex justify-center items-center">
                <p>
                  To get the best experience of BOB, use the Desktop Version
                </p>
              </div>
            ) : (
              <>{children}</>
            )}
          </>
        ) : (
          <>
            <Loading />
          </>
        )}
      </ThemeProvider>
    </NextAppDirEmotionCacheProvider>
  );
}
