"use client";
import * as React from "react";
import { generateThemeOptions } from "./theme";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import NextAppDirEmotionCacheProvider from "./EmotionCache";
import { useSelector, selectApp } from "@/lib/redux";
import { useMediaQuery } from "@mui/material";
import { useSession } from "next-auth/react";
import Loading from "@/app/loading";

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
  const { data, status } = useSession();
  return (
    <NextAppDirEmotionCacheProvider options={{ key: "mui" }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {(status !== 'loading') ? (
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
