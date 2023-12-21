"use client";
import React, { useEffect } from "react";
import { signIn } from 'next-auth/react';
import { Button, Card, Divider, TextField } from "@mui/material";

const LoginForm = () => {
    async function handleSignIn(method: any) {
        try {
            switch (method) {
                case 'google':
                    signIn('google', { redirect: false });
                    break;
                case 'keycloak':
                    signIn('keycloak');
                default:
                    break;
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <Card className="p-4 flex flex-col justify-center items-center w-[370px]">
                <img
                    className="max-w-full w-48 my-7"
                    src="/images/i13logo.png"
                    alt="brand-logo"
                />
                <TextField
                    className="w-full !mb-4 !bg-white"
                    size="small"
                    type="text"
                    id="username-input"
                    label="Username"
                    variant="outlined"
                />
                <TextField
                    className="w-full !mb-4 !bg-white"
                    size="small"
                    type="password"
                    id="password-input"
                    label="Password"
                    variant="outlined"
                />
                <Button
                    variant="contained"
                    className="!mb-4 w-full !text-white !font-semibold !capitalize"
                >
                    Login
                </Button>
                <p className="hover:text-blue-500 hover:underline underline-offset-4 hover:cursor-pointer">
                    forgot password?
                </p>
                <Divider className="w-full !my-4" />
                <Button
                    onClick={() => handleSignIn('google')}
                    variant="outlined"
                    className="!mb-4 w-full !text-black !font-semibold !capitalize"
                >
                    <img
                        className="w-[25px] mr-3"
                        src="/images/google.png"
                        alt="google-logo"
                    />
                    Login With Google
                </Button>
                <Button
                    onClick={() => handleSignIn('keycloak')}
                    variant="outlined"
                    className="!mb-4 w-full !text-black !font-semibold !capitalize"
                >
                    Login With Keycloak
                </Button>
                <p>
                    Don't have an Account?&nbsp;&nbsp;&nbsp;&nbsp;
                    <span className="hover:text-blue-500 hover:underline underline-offset-4 hover:cursor-pointer">
                        Register
                    </span>
                </p>
            </Card>
        </>
    );
};

export default LoginForm;
