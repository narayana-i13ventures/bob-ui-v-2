"use client";
import React, { useEffect, useRef } from "react";
import { Avatar, Container, IconButton, useTheme } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import {
    appSlice,
    selectUnreadNotifications,
    useDispatch,
    useSelector,
} from "@/lib/redux";
import NotificationContainer from "./NotificationContainer";
import UserMenu from "./UserMenu";
import ThemeSwitch from "./ThemeSwitch";
import Link from "next/link";
import { useSession } from "next-auth/react";

const Header = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const { data }: any = useSession();
    const NotificationRef = useRef(null);
    const ProfileMenuRef = useRef(null);
    const unreadNotifications = useSelector(selectUnreadNotifications);

    const OpenNotificationMenu = () => {
        dispatch(appSlice.actions.toggleNotificationMenu(true));
    };
    const OpenProfileMenu = () => {
        dispatch(appSlice.actions.toggleProfileMenu(true));
    };

    useEffect(() => {
        return () => {
            dispatch(appSlice.actions.toggleNotificationMenu(false));
            dispatch(appSlice.actions.toggleProfileMenu(false));
        };
    }, []);
    return (
        <>
            <header
                className="sticky top-0 w-full z-10"
                style={{ backgroundColor: theme.palette.primary.main }}
            >
                <Container
                    className="!flex justify-between items-center !px-6"
                    maxWidth={"xl"}
                    disableGutters
                >
                    <div>
                        <Link href={"/Dashboard"}>
                            <img
                                className="max-w-full w-48"
                                src="/images/i13logo.png"
                                alt="brand-logo"
                            />
                        </Link>
                    </div>
                    <div>
                        <ThemeSwitch />
                        <IconButton
                            ref={NotificationRef}
                            size="large"
                            color="primary"
                            aria-describedby={"Notification-button"}
                            onClick={OpenNotificationMenu}
                            className="relative !mx-8"
                        >
                            <NotificationsIcon className="!text-white !text-[30px]" />
                            {unreadNotifications?.length > 0 && (
                                <span className="absolute top-2 right-2 flex h-5 w-5">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                    <span className="text-xs relative flex justify-center items-center !text-white rounded-full h-5 w-5 bg-red-500">
                                        {unreadNotifications?.length}
                                    </span>
                                </span>
                            )}
                        </IconButton>
                        <NotificationContainer value={NotificationRef?.current} />
                        <IconButton
                            ref={ProfileMenuRef}
                            size="small"
                            aria-describedby={"Profile-menu-button"}
                            onClick={OpenProfileMenu}
                        >
                            <img
                                referrerPolicy="no-referrer"
                                className="!bg-indigo-500"
                                style={{
                                    width: "35px",
                                    height: "35px",
                                    borderRadius: "100%"
                                }}
                                src={data?.user?.image}
                            />
                        </IconButton>
                        <UserMenu value={ProfileMenuRef?.current} />
                    </div>
                </Container>
            </header>
        </>
    );
};

export default Header;
