"use client";
import * as React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { CircularProgress, IconButton, useTheme } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import { useParams, usePathname } from "next/navigation";
import { appSlice, selectApp, useDispatch, useSelector } from "@/lib/redux";
import Link from "next/link";
import { useGetProjectByIdQuery } from "@/lib/redux/projectApi";

const CanvasHeader = (props: any) => {
    const path = usePathname();
    const { drawerWidth } = props;
    const theme: any = useTheme();
    const dispatch = useDispatch();
    const pathArray = path.split("/");
    const { projectId, futureId, personaId } = useParams();
    const pathElement = !!personaId
        ? pathArray[pathArray.length - 2]
        : pathArray[pathArray.length - 1];
    const { leftSidebarOpen, rightSidebarOpen } = useSelector(selectApp);

    const {
        data: company,
        isLoading: companyLoading,
        isError: companyError,
    } = useGetProjectByIdQuery(projectId);

    const handleLeftBarOpen = () => {
        dispatch(appSlice.actions.toggleLeftSidebar(true));
    };

    const handleRightBarOpen = () => {
        dispatch(appSlice.actions.toggleRightSidebar(true));
    };

    return (
        <>
            <div
                style={{
                    backgroundColor: theme.custom.cardBackground,
                    width: "100%",
                    transition: theme?.transitions.create(["margin", "width"], {
                        easing: theme?.transitions.easing.easeOut,
                        duration: theme?.transitions.duration.leavingScreen,
                    }),
                    ...(leftSidebarOpen &&
                        !rightSidebarOpen && {
                        width: `calc(100% - ${drawerWidth + 50}px)`,
                        marginLeft: `${drawerWidth + 50}px`,
                        transition: theme?.transitions.create(["margin", "width"], {
                            easing: theme?.transitions.easing.easeIn,
                            duration: theme?.transitions.duration.enteringScreen,
                        }),
                    }),
                    ...(rightSidebarOpen &&
                        !leftSidebarOpen && {
                        width: `calc(100% - ${drawerWidth}px)`,
                        marginRight: `${drawerWidth}px`,
                        transition: theme?.transitions.create(["margin", "width"], {
                            easing: theme?.transitions.easing.easeIn,
                            duration: theme?.transitions.duration.enteringScreen,
                        }),
                    }),
                    ...(rightSidebarOpen &&
                        leftSidebarOpen && {
                        width: `calc(100% - ${2 * drawerWidth + 50}px)`,
                        marginLeft: `${drawerWidth + 50}px`,
                        marginRight: `${drawerWidth}px`,
                        transition: theme?.transitions.create(["margin", "width"], {
                            easing: theme?.transitions.easing.easeIn,
                            duration: theme?.transitions.duration.enteringScreen,
                        }),
                    }),
                }}
                className={`flex justify-between items-center w-full py-2 px-8 h-[40px]`}
            >
                <div className="w-full flex justify-start items-center">
                    <IconButton
                        size="small"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleLeftBarOpen}
                        edge="start"
                        sx={{ mr: 2, ...(leftSidebarOpen && { display: "none" }) }}
                    >
                        <MenuIcon />
                    </IconButton>
                    {!companyLoading && !companyError ? (
                        <div className="flex justify-start items-center">
                            <div className="font-semibold text-lg">
                                <Link href={`/${projectId}/ThinkBeyond`}>
                                    <span className="hover:underline underline-offset-4 cursor-pointer">
                                        {company[0]?.companyName}
                                    </span>
                                </Link>
                            </div>
                            <div className="font-semibold text-lg">
                                <span>&nbsp;/&nbsp;</span>
                                <Link href={`/${projectId}/${futureId}/Microframeworks`}>
                                    <span className="hover:underline underline-offset-4 cursor-pointer">
                                        {futureId}
                                    </span>
                                </Link>
                            </div>
                            <div className="font-semibold text-lg">
                                <span>&nbsp;/&nbsp;</span>
                                <Link href={`/${projectId}/${futureId}/${pathElement}`}>
                                    <span className="hover:underline underline-offset-4 cursor-pointer">
                                        {pathElement}
                                    </span>
                                </Link>
                            </div>
                            {!!personaId && (
                                <div className="font-semibold text-lg">
                                    <span>&nbsp;/&nbsp;</span>
                                    <Link href={`/${projectId}/${futureId}/${pathElement}/${personaId}`}>
                                        <span className="hover:underline underline-offset-4 cursor-pointer">
                                            {personaId}
                                        </span>
                                    </Link>
                                </div>
                            )}
                        </div>
                    ) : (
                        <>
                            <CircularProgress size={20} />
                        </>
                    )}
                </div>
                <div className="w-full flex justify-end items-center">
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleRightBarOpen}
                        edge="start"
                        sx={{ ml: 2, ...(rightSidebarOpen && { display: "none" }) }}
                    >
                        <SettingsIcon />
                    </IconButton>
                </div>
            </div>
        </>
    );
};

export default CanvasHeader;
