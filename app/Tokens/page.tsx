"use client";
import { Container } from "@mui/material";
import { useSession } from "next-auth/react";
import React from "react";
import Header from "../components/shared/Header/Header";

const Tokens = () => {
    const data: any = useSession();
    console.log(data);
    const copyAccessToken = () => navigator.clipboard.writeText(data?.data?.access_token);
    const copyIdToken = () => navigator.clipboard.writeText(data?.data?.id_token);
    return (
        <>
            <Header />
            <Container maxWidth={"xl"} className="!py-4">
                <p className="text-xl font-semibold underline underline-offset-3">
                    Tokens
                </p>
                <div className="flex justify-start items-start my-4">
                    <p className="mr-3 w-[200px]">Access Token</p>
                    <div className="w-[50%] border-2 rounded-md overflow-hidden h-fit p-3">
                        <div onClick={copyAccessToken} className="cursor-pointer w-full flex justify-end my-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184"
                                />
                            </svg>

                        </div>
                        <p className="break-all">{data?.data?.access_token}</p>
                    </div>
                </div>
                <div className="flex justify-start items-start my-4">
                    <p className="mr-3 w-[200px]">Id Token</p>
                    <div className="w-[50%] border-2 rounded-md overflow-hidden h-fit p-3">
                        <div onClick={copyIdToken} className="cursor-pointer w-full flex justify-end my-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184"
                                />
                            </svg>

                        </div>
                        <p className="break-all">{data?.data?.id_token}</p>
                    </div>
                </div>
            </Container>
        </>
    );
};

export default Tokens;
