import React from "react";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import { IconButton, Avatar, useTheme } from "@mui/material";
const Comment = () => {
    const theme: any = useTheme();
    return (
        <>
            <div style={{ backgroundColor: theme?.custom?.contrastBg }} className="flex justify-start items-start p-3 shadow-sm m-3 rounded-md">
                <div className="w-full pl-1">
                    <div className="flex justify-start items-center">
                        <div className="mr-2">
                            <Avatar
                                className="!bg-red-500 !text-[16px]"
                                sx={{ width: "30px", height: "30px" }}
                            >
                                N
                            </Avatar>
                        </div>
                        <p className="text-sm font-semibold">Jhon David</p>
                    </div>
                    <p className="text-sm mt-3">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.{" "}
                    </p>
                    <div className="flex justify-end items-center mt-2">
                        <div className="flex items-center mr-3">
                            <IconButton>
                                <ThumbUpOffAltIcon className="!text-[20px]" />
                            </IconButton>
                            <span className="mx-2">2</span>
                        </div>
                        <div className="flex items-center">
                            <IconButton>
                                <ThumbDownAltIcon className="!text-[20px]" />
                            </IconButton>
                            <span className="mx-2">0</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Comment;
