"use client";
import React, { useEffect } from "react";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import MessageBox from "./MessageBox";
import { motion, useAnimation } from "framer-motion";
import {
    appSlice,
    selectApp,
    selectBobMessages,
    useDispatch,
    useSelector,
} from "@/lib/redux";
import { IconButton, Tooltip } from "@mui/material";

const Bob = () => {
    const controls = useAnimation();
    const dispatch = useDispatch();
    const BobMessages = useSelector(selectBobMessages);
    const { BobOpen, ThinkBeyondModalOpen } = useSelector(selectApp);

    useEffect(() => {
        controls.start(BobOpen ? "open" : "closed");
    }, [BobOpen, controls]);

    const handleBobOpen = () => {
        dispatch(appSlice.actions.toggleBobOpen(!BobOpen));
    };

    const handleSendMessage = (message: any) => {
        console.log(message);
    }

    const messageBoxVariants = {
        open: {
            y: 0,
            x: 0,
            scale: 1,
            display: "block",
            opacity: 1,
            originX: 1,
            originY: 1,
            transition: {
                duration: 0.1,
                ease: "easeOut",
            },
        },
        closed: {
            y: 40,
            x: -30,
            scale: 0,
            display: "none",
            opacity: 0,
            originX: 1,
            originY: 1,
            transition: {
                duration: 0.1,
                ease: "easeOut",
            },
        },
    };

    return (
        <div
            className={`absolute bottom-5 right-10 flex flex-col justify-end items-end ${ThinkBeyondModalOpen ? "z-[10000]" : "z-[1]"
                }`}
        >
            <motion.div
                className={`mb-4`}
                initial="closed"
                animate={controls}
                variants={messageBoxVariants}
            >
                <MessageBox
                    sendMessage={handleSendMessage}
                    height={420}
                    className="mb-2 w-[300px]"
                    arrow={true}
                    header={true}
                    messages={BobMessages}
                />
            </motion.div>
            <Tooltip title={`${!BobOpen ? "Bob" : ""}`} placement="top" arrow>
                <IconButton onClick={handleBobOpen}>
                    <img src={"/images/bob.png"} className="max-w-full w-12" />
                </IconButton>
            </Tooltip>
        </div>
    );
};

export default Bob;
