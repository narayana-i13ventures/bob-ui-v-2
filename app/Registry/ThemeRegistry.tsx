'use client';
import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { StepsTheme as Steps } from "chakra-ui-steps";
import { Notifications } from 'react-push-notification';
const shadows = {
    greenShadowLeft: "-6px 0px 4px rgba(6, 188, 6, 0.1)",
    greenShadow: "0px 0px 8px rgba(6, 188, 6, 0.4)",
    greenShadowRight: "6px 0px 4px rgba(6, 188, 6, 0.1)",
};

const theme = extendTheme({
    shadows,
    components: {
        Steps,
    },
});


export function Providers({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <CacheProvider>
            <ChakraProvider theme={theme}>
            <Notifications />
                {children}
            </ChakraProvider>
        </CacheProvider>
    );
}
