"use client";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";

const error = () => {
    const router = useRouter();
    return (
        <div className="flex flex-col justify-center items-center min-h-screen max-h-screen">
            <p className="my-5 font-semibold text-xl">Ooops!! Something went wrong</p>
            <Button
                onClick={() => router.push("/Dashboard")}
                variant="contained"
                className="!text-white !font-semibold !capitalize"
            >
                Go To Home
            </Button>
        </div>
    );
};

export default error;
