import Grow from "@mui/material/Grow";
import Notification from "./Notification";
import { Card, Popover, useTheme } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React, { JSXElementConstructor, useState } from "react";
import { appSlice, selectApp, selectNotifications, useDispatch, useSelector } from "@/lib/redux";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<unknown, JSXElementConstructor<unknown>>;
    },
    ref: React.Ref<unknown>
) {
    return <Grow style={{ transformOrigin: "0 0 1" }} ref={ref} {...props} />;
});

const NotificationContainer = (props: any) => {
    const theme: any = useTheme();
    const dispatch = useDispatch();
    const { NotificationMenu }: { NotificationMenu: any } =
        useSelector(selectApp);

    const Notifications = useSelector(selectNotifications);

    return (
        <Popover
            TransitionComponent={Transition}
            disablePortal
            anchorEl={props?.value}
            open={NotificationMenu}
            onClose={() => dispatch(appSlice.actions.toggleNotificationMenu(false))}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
            }}
            transformOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            PaperProps={{
                className: `mt-2 !overflow-visible relatives px-3 py-5 !z-[1300]`,
                style: { backgroundColor: theme?.custom?.contrastBg },
                elevation: 3,
                sx: {
                    "&::before": {
                        content: '""',
                        position: "absolute",
                        transform: "rotate(45deg)",
                        height: 20,
                        width: 20,
                        zIndex: 1,
                        backgroundColor: theme?.custom?.contrastBg,
                        top: -10,
                        right: 18,
                    },
                },
            }}
        >
            <div className="flex justify-between items-center pb-4">
                <div className="flex justify-between items-center">
                    <p className={`pr-5 cursor-pointer hover:text-blue-500 hover:underline underline-offset-2`}>All</p>
                    <p className={`cursor-pointer hover:text-blue-500 hover:underline underline-offset-2`}>Unread</p>
                </div>
                <div>
                    <p className={`pr-5 cursor-pointer hover:text-red-500 hover:underline underline-offset-2`}>Clear All</p>
                </div>
            </div>
            <div
                className={`pr-2 w-[420px] h-[500px] max-h-[500px] !overflow-y-auto scrollbar-thin !scrollbar-rounded-[20px] !scrollbar-thumb-gray-300 scrollbar-track-gray-100`}
            >
                {Notifications?.map((notification: any) => {
                    return (<Notification key={notification?.id} notification={notification} />)
                })}
            </div>
        </Popover>
    );
};

export default NotificationContainer;
