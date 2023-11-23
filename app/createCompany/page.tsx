'use client';
import React, { useMemo } from 'react';
import { Button, Container, Flex, Spinner, Text } from '@chakra-ui/react';
import CompanyStages from '../components/companyStages';
import { signOut, useSession } from 'next-auth/react';

const Company = () => {
    const { data: session }: { data: any } = useSession({
        required: true,
    });
    const memoizedOnBoardingStages: any = useMemo(() => <CompanyStages />, []);

    return (
        <>
            {(session !== null && session !== undefined) ?
                <>
                    <Flex
                        h="100%"
                        w="100%"
                        flexDirection={'column'}
                    >
                        <Flex w={'100%'} bg={'green.500'} py={3}>
                            <Container maxW={'container.2xl'} flexDirection={'row'} display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                                <Text fontSize={'lg'} color={'white'} fontWeight={'semibold'}>Hello {session?.user?.name}, Welcome To Bob</Text>
                                <Button onClick={() => signOut()}>Sign Out</Button>
                            </Container>
                        </Flex>
                        <Flex w="100%" direction="column" alignItems="center" px="4%" mt="30px" justify="center">
                            {memoizedOnBoardingStages}
                        </Flex>
                    </Flex>
                </> :
                <Flex flexDirection={'column'} alignItems={'center'} justifyContent={'center'} h={'100%'} w={'100%'}>
                    <Spinner
                        mt={8}
                        thickness="4px"
                        speed="0.65s"
                        emptyColor="gray.200"
                        color="green.500"
                        size="xl"
                    />
                </Flex>
            }
        </>
    )
}

export default Company