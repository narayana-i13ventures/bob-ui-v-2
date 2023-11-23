/* eslint-disable react/no-unescaped-entities */

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Flex,
    Text,
    Textarea,
    Button,
    Kbd,
} from "@chakra-ui/react";

import {
    useSelector,
    useDispatch,
    thinkBeyondSlice,
    updateThinkBeyond,
    selectedThinkBeyondCard,
    selectBobThinking,
    selectAltPressed,
    selectDarkTheme,
    AppSlice
} from '@/lib/redux';

import { ChangeEvent, useEffect, useState } from "react";
import { useKeyPressEvent } from "react-use";
import { CardInfo } from "@/app/Interfaces";

export default function ThinkBeyondModal(props: any) {
    const {
        isOpen,
        onClose,
        nextCard,
    } = props;
    const dispatch = useDispatch();
    const altPressed = useSelector(selectAltPressed);
    const bobIsThinking = useSelector(selectBobThinking);
    const darkTheme = useSelector(selectDarkTheme);
    const selectedCard: any = useSelector(selectedThinkBeyondCard);

    useEffect(() => {
        if (isOpen) {
            const updatedCard = { ...selectedCard, open: isOpen };
            dispatch(updateThinkBeyond(updatedCard));
        }
    }, [isOpen]);

    useKeyPressEvent(
        "Alt",
        (e) => {
            e.preventDefault();
            if (!bobIsThinking && isOpen) {
                dispatch(updateThinkBeyond(selectedCard)).then((_data) => {
                    dispatch(AppSlice.actions.toggleAltPressed(true));
                });
            }
        },
        () => {
            if (isOpen) {
                dispatch(updateThinkBeyond(selectedCard)).then((_data) => {
                    dispatch(AppSlice.actions.toggleAltPressed(true));
                });
            }
        }
    );

    const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>, heading: string) => {
        const updatedText = e?.target?.value;
        dispatch(thinkBeyondSlice.actions.updateText({ heading, text: updatedText }));
    };

    function closeModal() {
        dispatch(updateThinkBeyond(selectedCard)).then((_data) => {
            onClose();
        });;
    };

    function goNext() {
        dispatch(updateThinkBeyond(selectedCard)).then((_data) => {
            nextCard(selectedCard);
        });
    };

    return (
        <Modal isOpen={isOpen} onClose={closeModal} size="xl">
            <ModalOverlay />
            <ModalContent
                mx="auto"
                my="auto"
                shadow={'whiteShadow'}
                maxH="80vh"
                bg={darkTheme ? "gray.900" : "white"}
            >
                <ModalHeader>
                    <Text color={darkTheme ? "white" : "black"}>{selectedCard?.cardName}</Text>
                    <Text color={darkTheme ? "white" : "black"} fontSize={"lg"}>
                        {selectedCard?.cardSubName}
                    </Text>
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody overflowY={"scroll"}>
                    <Flex direction="column" gap="10px">
                        {selectedCard?.cardInfo?.map((info: CardInfo, index: number) => (
                            <Flex direction={"column"} gap={"10px"} key={index}>
                                <Text color={darkTheme ? "white" : "black"}>
                                    {info.heading}
                                </Text>
                                <Textarea
                                    bg={darkTheme ? "gray.800" : "white"}
                                    color={darkTheme ? "white" : "black"}
                                    rounded="md"
                                    // onFocus={() => setFocused(info.heading)}
                                    value={info?.text}
                                    onChange={(e) => handleInputChange(e, info.heading)}
                                    h="20vh"
                                    size="sm"
                                    placeholder={info.placeholder}
                                />
                            </Flex>
                        ))}
                    </Flex>
                </ModalBody>
                <ModalFooter>
                    <Flex
                        me={4}
                        ms={1}
                        w="100%"
                        alignItems={"center"}
                        justifyContent={"space-between"}
                    >
                        <Flex animation={altPressed ? "pulse 1s infinite" : "none"}>
                            <Kbd colorScheme="blue" size="xs">
                                Alt
                            </Kbd>
                            <Text
                                color={
                                    altPressed && !darkTheme
                                        ? "blue.600"
                                        : darkTheme
                                            ? "white"
                                            : "gray.400"
                                }
                                fontSize="xs"
                                p={1}
                                rounded="md"
                                fontWeight={"semibold"}
                            >
                                Hold 'Alt' to get help from Bob
                            </Text>
                        </Flex>
                        <Button
                            colorScheme="green"
                            isDisabled={!selectedCard?.complete}
                            onClick={goNext}
                        >
                            Next
                        </Button>
                    </Flex>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

