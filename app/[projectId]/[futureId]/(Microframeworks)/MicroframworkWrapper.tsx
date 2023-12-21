"use client";
import React from "react";
import { Theme, styled, useTheme } from "@mui/material/styles";
import { Box } from "@mui/material";
import { selectApp, useSelector } from "@/lib/redux";
import CanvasHeader from "@/app/components/MicroFrameWorks/CanvasHeader";
import CanvasOptions from "@/app/components/MicroFrameWorks/CanvasOptions";
import CanvasNavigation from "@/app/components/MicroFrameWorks/CanvasNavigation";

const drawerWidth = 300;
interface CanvasHeaderProps {
    leftopen: boolean | undefined | string;
    rightopen: boolean | undefined | string;
    theme?: Theme;
}
const CanvasArea = styled("div", {
    shouldForwardProp: (prop) => prop !== "leftopen" && prop !== "rightopen",
})(({ theme, leftopen, rightopen }: CanvasHeaderProps) => ({
    flexGrow: 1,
    width: "100%",
    transition: theme?.transitions.create(["margin", "width"], {
        easing: theme?.transitions.easing.easeOut,
        duration: theme?.transitions.duration.leavingScreen,
    }),
    ...(leftopen &&
        !rightopen && {
        width: `calc(100% - ${drawerWidth + 50}px)`,
        marginLeft: `${drawerWidth + 50}px`,
        transition: theme?.transitions.create(["margin", "width"], {
            easing: theme?.transitions.easing.easeIn,
            duration: theme?.transitions.duration.enteringScreen,
        }),
    }),
    ...(rightopen &&
        !leftopen && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginRight: `${drawerWidth}px`,
        transition: theme?.transitions.create(["margin", "width"], {
            easing: theme?.transitions.easing.easeIn,
            duration: theme?.transitions.duration.enteringScreen,
        }),
    }),
    ...(rightopen &&
        leftopen && {
        width: `calc(100% - ${(2 * drawerWidth) + 50}px)`,
        marginLeft: `${drawerWidth + 50}px`,
        marginRight: `${drawerWidth}px`,
        transition: theme?.transitions.create(["margin", "width"], {
            easing: theme?.transitions.easing.easeIn,
            duration: theme?.transitions.duration.enteringScreen,
        }),
    }),
}));

const MicroframeworkWrapper = (props: any) => {
    const theme: any = useTheme();
    const { leftSidebarOpen, rightSidebarOpen } = useSelector(selectApp);

    return (
        <>
            <div className="relative w-full h-[calc(100vh-54px)]">
                <Box
                    sx={{
                        height: "100%",
                        maxHeight: "100%",
                    }}
                >
                    <CanvasHeader drawerWidth={drawerWidth} />
                    <CanvasOptions drawerWidth={drawerWidth} />
                    <CanvasNavigation drawerWidth={drawerWidth + 50} />
                    <CanvasArea
                        theme={theme}
                        className="flex justify-start items-start w-full h-[calc(100%-40px)] py-1 px-8"
                        leftopen={leftSidebarOpen ? "true" : undefined}
                        rightopen={rightSidebarOpen ? "true" : undefined}
                    >
                        {props?.children}
                    </CanvasArea>
                </Box>
            </div>
        </>
    );
};
export default MicroframeworkWrapper;
