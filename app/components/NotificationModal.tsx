/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    Text,
    Image,
    ModalHeader,
    ModalFooter,
    Button,
    // MotionBox
} from "@chakra-ui/react";
import {
    useSelector,
    useDispatch,
    AppSlice,
    selectNotificationModal,
} from "@/lib/redux";
import Lottie from "lottie-react";
import { animationData } from "./animation";

function NotificationsModal() {
    const dispatch = useDispatch();
    const NotificationModalOpen = useSelector(selectNotificationModal);

    const closeNotificationModal = () => {
        dispatch(AppSlice.actions.toggleNotificationModal(false));
    };
    // useEffect(() => {
    //     if ("Notification" in window) {
    //         if (Notification.permission === "granted") {
    //             // Permission is already granted, no need to show a notification
    //         } else if (Notification.permission === "denied") {
    //             // User denied permission, handle as needed
    //         } else {
    //             // Permission is not granted; request it
    //             Notification.requestPermission().then((permission) => {
    //                 if (permission === "granted") {
    //                     const notification = new Notification("Notification Title", {
    //                         body: "Notification Body",
    //                         icon: "notification-icon.png", // Optional icon
    //                     });
    //                     notification.onclick = () => {
    //                         window.open("https://example.com");
    //                     };
    //                 } else if (permission === "denied") {
    //                     // User denied permission
    //                 } else if (permission === "default") {
    //                     // User closed the permission dialog without making a choice
    //                 }
    //             });
    //         }
    //     }
    // }, []);


    const modalContentStyle = {
        backgroundColor: "white",
        boxShadow: 'none'
    };

    const modalOverlayStyle = {
        backgroundColor: "rgba(0, 0, 0, 0.7)",
    };

    return (
        <Modal isOpen={NotificationModalOpen} onClose={() => null} isCentered>
            <ModalOverlay style={modalOverlayStyle}  zIndex={10000}/>
            <ModalContent style={modalContentStyle}>
                <ModalHeader>

                </ModalHeader>
                <ModalBody display={'flex'} justifyContent={'center'} flexDirection={'column'} alignItems={'center'}>
                    Please Allow Notifications for better user Experience
                </ModalBody>
                <ModalFooter>
                    <Button onClick={closeNotificationModal} variant={'solid'} colorScheme="green">Close</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default NotificationsModal;
