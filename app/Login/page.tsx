'use client';
import React from 'react';
import { Button, Card, Divider, Flex, Input, Image } from '@chakra-ui/react';
import { signIn } from 'next-auth/react';

const Login = () => {
    return (
        <Flex flexDirection={'column'} alignItems={'center'} justifyContent={'center'} minH={'100vh'} minW={'100vw'}>
            <Card width={'30vw'} p={6}>
                <Image m={"15px"} src="/images/i13logo.png" alt="google-logo" />
                <Input placeholder='Enter Your Email' mb={8} />
                <Input type='password' mb={8} placeholder='Enter your Password' />
                <Button bg={'green.500'} _hover={{ bg: 'green.500' }} color={'white'}>Login</Button>
                <Divider my={5} />
                <Button onClick={() => { signIn('google', { callbackUrl: '/createCompany' }) }} variant={'ghost'} bg={'ghostwhite'} mb={6}>
                    <Image w={'25px'} mr={3} src="/images/google.png" alt="google-logo" />
                    Login With Google
                </Button>
                <Button variant={'ghost'} bg={'ghostwhite'}>
                    <Image w={'25px'} mr={3} src="/images/apple.png" alt="google-logo" />
                    Login With Apple
                </Button>
            </Card>
        </Flex>
    )
}

export default Login