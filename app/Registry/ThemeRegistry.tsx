'use client';
import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider, Flex, extendTheme, useMediaQuery, Text } from '@chakra-ui/react';
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
    const [smallScreen] = useMediaQuery('(max-width: 1024px)')
    const [isMobile] = useMediaQuery('(max-width: 768px)')
    return (
        <CacheProvider>
            <ChakraProvider theme={theme}>
                <Notifications />
                {(smallScreen || isMobile) ? <>
                    <Flex p={3} justifyContent={'center'} alignItems={'center'} height={'100vh'} width={'100vw'}>
                        <Text textAlign={'center'} fontSize={'lg'}>For Best Experience Please use Desktop Version to Interact with Bob</Text>
                    </Flex>
                </>
                    : <>
                        {children}
                    </>}
            </ChakraProvider>
        </CacheProvider>
    );
}
