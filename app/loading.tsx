import React from 'react';
import { Spinner, Flex } from '@chakra-ui/react';

const ProgressBar = () => {
    return (
        <Flex
            justifyContent="center"
            alignItems="center"
            minH="100vh"
            minW="100vw"
            h="100vh"
            w="100vw"
        >
            <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="green.500"
                size="xl"
            />
        </Flex>
    );
};

export default ProgressBar;
