import React from "react";
import { Avatar, Card, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useRouter } from "next/navigation";
import { appSlice, notificationSlice, useDispatch } from "@/lib/redux";

const Notification = (props: any) => {
    const router = useRouter()
    const { notification } = props;
    const dispatch = useDispatch();
    const deleteNotification = () => {
        dispatch(notificationSlice.actions.deleteNotification(notification?.id))
    }
    const handleNotificationAction = () => {
        dispatch(appSlice.actions.toggleNotificationMenu(false))
        router?.push(notification?.action)
    }

    return (
        <>
            <Card onClick={handleNotificationAction} className="cursor-pointer my-2 p-2 flex justify-between items-center rounded-md shadow-sm">
                <div className="flex justify-start items-center">
                    <Avatar>J</Avatar>
                    <p className="px-4 font-medium">
                        {notification.content}
                    </p>
                </div>
                <div>
                    <IconButton onClick={() => deleteNotification()}>
                        <CloseIcon />
                    </IconButton>
                </div>
            </Card>
        </>
    );
};

export default Notification;
