import React from "react";
import { CircularProgress } from "@mui/material";

const Loading = () => {
    return (
        <div className="flex flex-col justify-center items-center min-h-screen max-h-screen">
            <p className="font-semibold my-5 text-xl">
                Bob is building....!! Please Wait
            </p>
            <CircularProgress color="primary" />
        </div>
    );
};

export default Loading;
