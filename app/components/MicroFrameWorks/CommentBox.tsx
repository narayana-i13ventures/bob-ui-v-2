import Comment from "./Comment";
import SendIcon from "@mui/icons-material/Send";
import React, { useRef, useState, useEffect } from "react";
import { Card, Divider, InputAdornment, TextField, useTheme } from "@mui/material";
const CommentBox = (props: any) => {
    const { className, height } = props;
    const theme: any = useTheme();
    const [message, setMessage] = useState<any>("");
    const textFieldRef = useRef<HTMLInputElement | null>(null);
    const CommentsContainerRef = useRef<HTMLDivElement | null>(null);

    const handleSendMessage = () => {
        if (message.trim() !== "") {
            setMessage("");
            if (textFieldRef.current) {
                textFieldRef.current.focus();
            }
        }
    };

    const handleEnterKeyPress = (
        event: React.KeyboardEvent<HTMLInputElement>
    ) => {
        if (event.key === "Enter") {
            event.preventDefault();
            handleSendMessage();
        }
    };

    useEffect(() => {
        if (CommentsContainerRef.current) {
            CommentsContainerRef.current.scrollTop =
                CommentsContainerRef.current.scrollHeight;
        }
    }, []);

    return (
        <>
            <div
                style={{
                    backgroundColor: theme.custom.cardBackground,
                    borderColor: theme?.palette?.primary?.main,
                }}
                className={`${className} ${height !== 1000 ? `h-[${height}px]` : 'h-[65vh]'} rounded-md border-[0px]  relative z-[10] flex flex-col justify-start items-start`}
            >
                <p className="text-semibold text-lg h-[40px] px-3 flex items-center">Comments</p>
                <Divider className="w-full" />
                <div
                    ref={CommentsContainerRef}
                    className="mt-2 h-[calc(100%-106px)] overflow-y-auto scrollbar-thin !scrollbar-thumb-gray-300 scrollbar-track-gray-100 "
                >
                    <Comment />
                    <Comment />
                    <Comment />
                    <Comment />
                    <Comment />
                    <Comment />
                    <Comment />
                    <Comment />
                </div>
                <div className="px-2 pb-[10px] flex mt-2 rounded-md overflow-hidden w-full">
                    <TextField
                        id="bob-message-input"
                        placeholder="Enter Your Message"
                        className="w-full"
                        value={message}
                        size="small"
                        multiline
                        variant="outlined"
                        maxRows={4}
                        sx={{ backgroundColor: theme.custom.contrastBg }}
                        onChange={(e: any) => setMessage(e.target.value)}
                        onKeyPress={handleEnterKeyPress}
                        inputRef={(input: any) => (textFieldRef.current = input)}
                        InputProps={{
                            style: {
                                fontSize: "14px",
                                padding: "10px",
                            },
                            endAdornment: (
                                <InputAdornment
                                    position="end"
                                    className="cursor-pointer"
                                    onClick={handleSendMessage}
                                >
                                    <SendIcon sx={{ w: 12 }} />
                                </InputAdornment>
                            ),
                        }}
                    />
                </div>
            </div>
        </>
    );
};

export default CommentBox;
