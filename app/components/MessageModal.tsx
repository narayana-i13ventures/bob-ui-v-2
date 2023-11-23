/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    Text,
    Image,
    // MotionBox
} from "@chakra-ui/react";
import {
    useSelector,
    useDispatch,
    AppSlice,
    selectMessageModal,
} from "@/lib/redux";
import Lottie from "lottie-react";
import { animationData } from "./animation";

function MessageModal() {
    const dispatch = useDispatch();
    const MessageModalOpen = useSelector(selectMessageModal);

    const texts = ['Analyzing market trends',
        'Crafting innovative solutions',
        'Optimizing performance metrics',
        'Synthesizing AI strategies',
        'Exploring new business frontiers',
        'Personalizing business approach'
    ]

    const [currentTextIndex, setCurrentTextIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTextIndex((prevIndex) =>
                prevIndex === texts.length - 1 ? 0 : prevIndex + 1
            );
        }, 3000);

        return () => {
            clearInterval(timer);
        };
    }, [texts]);

    const closeMessageModal = () => {
        return null
        // dispatch(AppSlice.actions.toggleMessageModal(false));
    };


    const modalContentStyle = {
        backgroundColor: "transparent",
        boxShadow: 'none'
    };

    const modalOverlayStyle = {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
    };

    return (
        <Modal isOpen={MessageModalOpen} onClose={closeMessageModal} isCentered>
            <ModalOverlay style={modalOverlayStyle} />
            <ModalContent style={modalContentStyle}>
                <ModalBody display={'flex'} justifyContent={'center'} flexDirection={'column'} alignItems={'center'}>
                    <Lottie
                        animationData={animationData}
                        className="flex justify-center items-center"
                        loop={true}
                    />
                    {/* <MotionBox
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                    > */}
                    <Text fontSize={'2xl'} color={'white'} fontWeight={'semibold'} textAlign={'center'} my={3}>
                        {texts[currentTextIndex]}
                    </Text>
                    {/* </MotionBox> */}

                </ModalBody>
            </ModalContent>
        </Modal>
    );
}

export default MessageModal;
