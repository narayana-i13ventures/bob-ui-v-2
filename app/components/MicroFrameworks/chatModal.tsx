/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useState, useEffect } from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    Text,
    IconButton,
    Button,
    Flex,
    Tooltip,
    Icon,
    useToast,
    Avatar,
    Textarea,
    Image
} from "@chakra-ui/react";
import {
    useSelector,
    useDispatch,
    fetchThinkBeyond,
    selectThinkBeyond,
    selectedFuture1BMCCard,
    Future1BMCSlice,
    updateBMCCardsfuture1,
    selectBobThinking,
    selectAltPressed,
    AppSlice,
    selectedFuture1CVPCard,
    updateCVPCardsfuture1,
    Future1CVPSlice,
    selectedFuture2BMCCard,
    updateBMCCardsfuture2,
    updateBMCCardsfuture3,
    selectedFuture3BMCCard,
    Future2BMCSlice,
    Future3BMCSlice,
    selectChatBotModal,
} from "@/lib/redux";
import { fetchEventSource } from "@microsoft/fetch-event-source";
import { BsFillMicFill, BsSend } from "react-icons/bs";
import { useKeyPressEvent } from "react-use";
import { useParams, usePathname } from "next/navigation";
import { useSession } from "next-auth/react";


function ChatBotModal(props: any) {
    const { isOpen, onClose, nextCard } = props;
    const toast = useToast();
    const chatRef = useRef(null);
    const pathName = usePathname();
    const dispatch = useDispatch();
    const { futureId } = useParams()
    const [message, setMessage] = useState("");
    const [focused, setFocused] = useState(false);
    const [minHeight, setMinHeight] = useState(50);
    const altPressed = useSelector(selectAltPressed);
    const bobThinking = useSelector(selectBobThinking);
    const Future1CVPCard = useSelector(selectedFuture1CVPCard);
    const Future1BMCCard = useSelector(selectedFuture1BMCCard);
    const Future2BMCCard = useSelector(selectedFuture2BMCCard);
    const Future3BMCCard = useSelector(selectedFuture3BMCCard);
    const chatModalOpen = useSelector(selectChatBotModal)
    const {
        data: ThinkBeyondCards,
        loading,
        error,
    } = useSelector(selectThinkBeyond);

    const { data: session }: { data: any } = useSession({
        required: true,
    });

    const [selectedCard, setSelectedCard] = useState<any>(null);
    const currentFuture = futureId === 'Future1' ? 1 : futureId === 'Future2' ? 2 : futureId === 'Future3' ? 3 : null;


    useEffect(() => {
        if (pathName === "/Future1/BMC") {
            setSelectedCard(Future1BMCCard);
        } else if (pathName === "/Future2/BMC") {
            setSelectedCard(Future2BMCCard);
        } else if (pathName === "/Future3/BMC") {
            setSelectedCard(Future3BMCCard);
        } else if (pathName === "/Future1/CVP") {
            setSelectedCard(Future1CVPCard);
        } else {
            setSelectedCard(null);
        }
        return () => {
            setSelectedCard(null);
        };
    }, [pathName, Future1BMCCard, Future2BMCCard, Future3BMCCard, Future1CVPCard]);

    useEffect(() => {
        dispatch(fetchThinkBeyond());
    }, []);

    useEffect(() => {
        if (selectedCard) {
            const updatedCard = { ...selectedCard };
            // if (isOpen) {
            if (chatModalOpen) {
                if (updatedCard?.chat?.length === 0) {
                    updatedCard.chat = [
                        {
                            role: "system",
                            content: `You are Bob, a helpful and experienced business advisor, and i13 venture builder, that is helping someone put together their ${selectedCard?.cardCanvas}. You work for i13. You are currently talking about ${selectedCard?.cardName}! Your questions should only relate to ${selectedCard?.cardName}. Never ask about any other sections of the business model canvas except for the one you are currently working on. This is very important. You are asking the user questions to help them build a good ${selectedCard?.cardName} section. Engage in the conversation until you have helped the user piece together a good ${selectedCard?.cardName} section. The user will always end their latest message with information about their business. Keep this in mind and try to use that information in your responses. Only ever ask 1 question at a time. Once you have asked enough questions, you have enough information for this section or you are ready to move on to the next section, respond with exactly the following: "That's all my questions now; it's your turn to ask me anything!" and nothing else.`,
                        },
                    ];
                    updatedCard.chat = [
                        ...updatedCard.chat,
                        {
                            role: "user",
                            content: `Hi Bob, I am starting a new company and I am trying to figure out my ${selectedCard?.cardName}!`,
                        },
                    ];
                    if (pathName === "/Future1/BMC") {
                        dispatch(updateBMCCardsfuture1(updatedCard))
                            .then((data: any) => {
                                streamResponse(data?.payload);
                            });
                    } else if (pathName === "/Future2/BMC") {
                        dispatch(updateBMCCardsfuture2(updatedCard))
                            .then((data: any) => {
                                streamResponse(data?.payload);
                            });
                    } else if (pathName === "/Future3/BMC") {
                        dispatch(updateBMCCardsfuture3(updatedCard))
                            .then((data: any) => {
                                streamResponse(data?.payload);
                            });
                    } else if (pathName === "/Future1/CVP") {
                        dispatch(updateCVPCardsfuture1(updatedCard))
                            .then((data: any) => {
                                streamResponse(data?.payload);
                            });
                    }

                }
            }
        }
    }, [chatModalOpen, dispatch]);//isOpen,

    useKeyPressEvent(
        "Alt",
        (e) => {
            e.preventDefault();
            if (chatModalOpen) {
                dispatch(AppSlice.actions.toggleAltPressed(!altPressed));
            }
        },
        (e) => {
            if (chatModalOpen) {
                dispatch(AppSlice.actions.toggleAltPressed(!altPressed));
            }
        }
    );

    const handleScrollToBottom = () => {
        const element = chatRef.current as HTMLElement | null;
        if (element) {
            element.scrollTo(0, element.scrollHeight);
        }
    };

    const onTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.target.value);
        setMinHeight(e.target.scrollHeight);
    };

    const getFutureData = () => {
        if (ThinkBeyondCards && ThinkBeyondCards?.length > 0) {
            const change = ThinkBeyondCards?.[0];
            const moonshot = ThinkBeyondCards?.[1];
            let future,
                okrs = null;

            switch (currentFuture) {
                case 1:
                    future = ThinkBeyondCards?.[2];
                    okrs = ThinkBeyondCards?.[3];
                    break;
                case 2:
                    future = ThinkBeyondCards?.[5];
                    okrs = ThinkBeyondCards?.[6];
                    break;
                case 3:
                    future = ThinkBeyondCards?.[8];
                    okrs = ThinkBeyondCards?.[9];
                    break;
                default:
                    break;
            }

            if (
                future === null ||
                okrs === null ||
                change === null ||
                moonshot === null
            ) {
                return null;
            } else {
                const changeData = `${change?.cardInfo?.[0]?.heading}:\n${change?.cardInfo?.[0]?.text}`;
                const moonshotData = `${moonshot?.cardInfo?.[0]?.heading}:\n${moonshot?.cardInfo?.[0]?.text}`;
                const futureData = future?.cardInfo
                    ?.map((item: any) => `${item?.heading}:\n${item?.text}`)
                    .join("\n");
                const okrsData = okrs?.cardInfo
                    ?.map((item: any) => `${item?.heading}:\n${item?.text}`)
                    .join("\n");
                if (changeData && moonshotData && futureData && okrsData) {
                    const result = {
                        change: changeData,
                        moonshot: moonshotData,
                        future: `Future ${currentFuture}:\n${futureData}`,
                        okrs: `OKRs:\n${okrsData}`,
                    };
                    return result;
                }
            }
        }
        return null;
    };

    const userMessage = () => {
        if (selectedCard !== undefined) {
            const updatedCard: any = { ...selectedCard };
            if (message === "" || bobThinking) {
                return;
            }
            setMessage("");
            setMinHeight(40);
            if (!updatedCard.chat) {
                updatedCard.chat = [];
            }
            updatedCard.chat = [
                ...updatedCard.chat,
                { role: "user", content: message },
            ];
            if (pathName === "/Future1/BMC") {
                dispatch(updateBMCCardsfuture1(updatedCard))
                    .then((data: any) => {
                        handleScrollToBottom();
                        streamResponse(data?.payload);
                    });
            } else if (pathName === "/Future2/BMC") {
                dispatch(updateBMCCardsfuture2(updatedCard))
                    .then((data: any) => {
                        handleScrollToBottom();
                        streamResponse(data?.payload);
                    });
            } else if (pathName === "/Future3/BMC") {
                dispatch(updateBMCCardsfuture3(updatedCard))
                    .then((data: any) => {
                        handleScrollToBottom();
                        streamResponse(data?.payload);
                    });
            } else if (pathName === "/Future1/CVP") {
                dispatch(updateCVPCardsfuture1(updatedCard))
                    .then((data: any) => {
                        handleScrollToBottom();
                        streamResponse(data?.payload);
                    });
            }

        }
    };

    const handleSSEError = (error: string) => {
        // If the error is a string
        if (typeof error === "string") {
            // If the error is a 429, it is a rate limit error
            if (error.includes("429")) {
                toast({
                    title: "Too many requests!",
                    description:
                        "You are making too many requests. Please try again later.",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
            } else {
                toast({
                    title: "Error!",
                    description: error,
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
            }
        }
    };

    async function updateCard() {
        generateKeypoint();
    }

    async function generateKeypoint() {
        const ResponseCard: any = { ...selectedCard };
        ResponseCard.loadingKeyPoints = true;
        ResponseCard.keyPoints = '';
        if (pathName === "/Future1/BMC") {
            dispatch(updateBMCCardsfuture1(ResponseCard)).then((data: any) => {
                // onClose();
                closeChatModal();
                streamResponse(data?.payload, true);
            });
        } else if (pathName === "/Future2/BMC") {
            dispatch(updateBMCCardsfuture2(ResponseCard)).then((data: any) => {
                // onClose();
                closeChatModal();
                streamResponse(data?.payload, true);
            });
        } else if (pathName === "/Future3/BMC") {
            dispatch(updateBMCCardsfuture3(ResponseCard)).then((data: any) => {
                // onClose();
                closeChatModal();
                streamResponse(data?.payload, true);
            });
        } else if (pathName === "/Future1/CVP") {
            dispatch(updateCVPCardsfuture1(ResponseCard)).then((data: any) => {
                // onClose();
                closeChatModal();
                streamResponse(data?.payload, true);
            });
        }
    }

    async function streamResponse(card: any, keypoints = false) {
        const ResponseCard: any = { ...card };
        let endpoint = "keypoints";
        let streamBody: any = {
            chat: ResponseCard?.chat,
            prefill: ResponseCard?.keyPoints,
            cardName: ResponseCard?.cardName,
            card_canvas: ResponseCard?.cardCanvas
        };
        if (!!card) {
            if (!keypoints) {
                streamBody = {
                    futureData: getFutureData(),
                    chat: ResponseCard?.chat
                },
                    ResponseCard.chat = [
                        ...(ResponseCard?.chat || []),
                        { role: "assistant", content: "" },
                    ];
                if (pathName === "/Future1/BMC") {
                    dispatch(Future1BMCSlice.actions.updateSingleById(ResponseCard));
                } else if (pathName === "/Future2/BMC") {
                    dispatch(Future2BMCSlice.actions.updateSingleById(ResponseCard));
                } else if (pathName === "/Future3/BMC") {
                    dispatch(Future3BMCSlice.actions.updateSingleById(ResponseCard));
                } else if (pathName === "/Future1/CVP") {
                    dispatch(Future1CVPSlice.actions.updateSingleById(ResponseCard));
                }
                endpoint = "message";
            }
            dispatch(AppSlice.actions.toggleBobThinking(true));
            const ctrl = new AbortController();
            const baseUrl = "https://bobapi.i13ventures.com/v1";
            let apiUrl = `${baseUrl}/bmc`;
            if (pathName === "/Future1/CVP") {
                apiUrl = `${baseUrl}/value`;
            }
            await fetchEventSource(
                `${apiUrl}/${endpoint}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(streamBody),
                    signal: ctrl.signal,
                    onopen: async function (response: Response) {
                        console.log("Connection opened");
                        return Promise.resolve();
                    },
                    onmessage: function (res: any) {
                        const { data, type } = res;
                        if (!!data) {
                            const { suggestion } = JSON.parse(data);
                            if (suggestion === "") return;
                            if (keypoints) {
                                ResponseCard.loadingKeyPoints = false;
                                ResponseCard.keyPoints = ResponseCard.keyPoints + suggestion;
                                if (pathName === "/Future1/BMC") {
                                    dispatch(Future1BMCSlice.actions.updateKeyPoints(suggestion));
                                } else if (pathName === "/Future2/BMC") {
                                    dispatch(Future2BMCSlice.actions.updateKeyPoints(suggestion));
                                } else if (pathName === "/Future3/BMC") {
                                    dispatch(Future3BMCSlice.actions.updateKeyPoints(suggestion));
                                } else if (pathName === "/Future1/CVP") {
                                    dispatch(Future1CVPSlice.actions.updateKeyPoints(suggestion));
                                }
                            } else {
                                handleScrollToBottom();
                                ResponseCard.chat = [...ResponseCard.chat];
                                const lastMessage = {
                                    ...ResponseCard?.chat?.[ResponseCard.chat.length - 1],
                                };
                                lastMessage.content = lastMessage.content + suggestion;
                                ResponseCard.chat[ResponseCard.chat.length - 1] = lastMessage;
                                if (pathName === "/Future1/BMC") {
                                    dispatch(Future1BMCSlice.actions.updateChat(suggestion));
                                } else if (pathName === "/Future2/BMC") {
                                    dispatch(Future2BMCSlice.actions.updateChat(suggestion));
                                } else if (pathName === "/Future3/BMC") {
                                    dispatch(Future3BMCSlice.actions.updateChat(suggestion));
                                } else if (pathName === "/Future1/CVP") {
                                    dispatch(Future1CVPSlice.actions.updateChat(suggestion));
                                }
                            }
                        }
                    },
                    onerror: function (error: any) {
                        handleSSEError(error)
                        dispatch(AppSlice.actions.toggleBobThinking(false));
                        ctrl.abort();
                    },
                    onclose: function () {
                        if (pathName === "/Future1/BMC") {
                            dispatch(updateBMCCardsfuture1(ResponseCard))
                                .then((data: any) => {
                                    ctrl.abort();
                                    dispatch(AppSlice.actions.toggleBobThinking(false));
                                    console.log("Connection closed");
                                    if (keypoints) {
                                        nextCard(data?.payload);
                                    }
                                })
                                .catch((err: any) => {
                                    console.log(err);
                                });
                        } else if (pathName === "/Future2/BMC") {
                            dispatch(updateBMCCardsfuture2(ResponseCard))
                                .then((data: any) => {
                                    ctrl.abort();
                                    dispatch(AppSlice.actions.toggleBobThinking(false));
                                    console.log("Connection closed");
                                    if (keypoints) {
                                        nextCard(data?.payload);
                                    }
                                })
                                .catch((err: any) => {
                                    console.log(err);
                                });
                        } else if (pathName === "/Future3/BMC") {
                            dispatch(updateBMCCardsfuture3(ResponseCard))
                                .then((data: any) => {
                                    ctrl.abort();
                                    dispatch(AppSlice.actions.toggleBobThinking(false));
                                    console.log("Connection closed");
                                    if (keypoints) {
                                        nextCard(data?.payload);
                                    }
                                })
                                .catch((err: any) => {
                                    console.log(err);
                                });
                        } else if (pathName === "/Future1/CVP") {
                            dispatch(updateCVPCardsfuture1(ResponseCard))
                                .then((data: any) => {
                                    ctrl.abort();
                                    dispatch(AppSlice.actions.toggleBobThinking(false));
                                    console.log("Connection closed");
                                })
                                .catch((err: any) => {
                                    console.log(err);
                                });
                        }

                    },
                }
            );
        }
    }
    const closeChatModal = () => {
        dispatch(AppSlice.actions.toggleChatModal(false));
    };
    return (
        <Modal isOpen={chatModalOpen} onClose={closeChatModal} size="2xl">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    <Text>{selectedCard?.cardName}</Text>
                    <Text mt={1} fontSize={"lg"} fontWeight={"normal"}>
                        Hey, my name is Bob lets talk!
                    </Text>
                </ModalHeader>
                <ModalBody>
                    {
                        <Flex
                            ref={chatRef}
                            h={`${360 - minHeight}px`}
                            minH="220px"
                            overflowY={"scroll"}
                            border="1px"
                            borderColor={"gray.200"}
                            rounded={"lg"}
                            wordBreak={"break-word"}
                            direction={"column"}
                        >
                            {selectedCard?.chat
                                ?.filter((message: any) => message.role !== "system")
                                .map((speechBubbles: any, index: number) =>
                                    bobThinking && !speechBubbles?.content ? (
                                        <Flex
                                            key={index}
                                            bg="gray.100"
                                            rounded={"sm"}
                                            p={3}
                                            w="100%"
                                            alignSelf="flex-start"
                                        >
                                            <Text p={2} maxWidth="100%" id={`message-${index}`}>
                                                <span className="typing__dot"></span>
                                                <span className="typing__dot"></span>
                                                <span className="typing__dot"></span>
                                            </Text>
                                        </Flex>
                                    ) : (
                                        <Flex
                                            key={index}
                                            alignItems={"center"}
                                            bg={speechBubbles.role === "user" ? "white" : "gray.100"}
                                            rounded={"sm"}
                                            p={1}
                                        >
                                            <Flex mt={3} ml={2} mr={2} w={'7%'} borderRadius={'100%'} overflow={'hidden'}>
                                                <Image
                                                    src={
                                                        speechBubbles.role === "user"
                                                            ? `${session?.user?.image}`
                                                            : "/images/bob.png"
                                                    }
                                                    borderRadius={'100%'} overflow={'hidden'}
                                                    w={'100%'}
                                                    maxWidth={'70px'}
                                                    referrerPolicy="no-referrer"
                                                />
                                            </Flex>
                                            <Text
                                                w={'93%'}
                                                id={`message-${index}`}
                                                fontWeight={
                                                    speechBubbles.role === "user" ? "normal" : "medium"
                                                }
                                                p={2}
                                                wordBreak={"break-word"}
                                                maxWidth="100%"
                                            >
                                                {speechBubbles.content}
                                            </Text>
                                        </Flex>
                                    )
                                )}
                        </Flex>
                    }
                </ModalBody>
                <ModalFooter flexDirection={"column"} alignItems={"end"} gap={2}>
                    {!altPressed ? (
                        <Flex
                            alignItems={"center"}
                            w="100%"
                            p="2px"
                            border="2px"
                            rounded="lg"
                            borderColor={focused ? "blue.400" : "gray.100"}
                            _hover={{ borderColor: focused ? "blue.400" : "gray.200" }}
                        >
                            <Textarea
                                placeholder="Talk to Bob!"
                                value={message}
                                sx={{
                                    "&::-webkit-scrollbar": {
                                        width: "3px", // Change this value to set the width of the scroll bar
                                    },
                                    "&::-webkit-scrollbar-track": {
                                        backgroundColor: "#F0F0F0",
                                    },
                                    "&::-webkit-scrollbar-thumb": {
                                        rounded: "lg",
                                        backgroundColor: "#C0C0C0",
                                    },
                                }}
                                focusBorderColor="white"
                                _hover={{ borderColor: "white" }}
                                borderColor={"white"}
                                roundedEnd={"none"}
                                size="sm"
                                resize={"none"}
                                overflowY={"auto"}
                                onFocus={() => setFocused(true)}
                                onBlur={() => setFocused(false)}
                                onChange={onTextChange}
                                h={`${minHeight}px`}
                                maxH="200px"
                                lineHeight={"short"}
                                onKeyPress={(e) => {
                                    if (e.key === "Enter" && !bobThinking) {
                                        userMessage();
                                    }
                                }}
                            />
                            <Flex direction="column">
                                <IconButton
                                    isDisabled={bobThinking}
                                    aria-label="sendMessage"
                                    size="lg"
                                    bg="white"
                                    icon={<Icon as={BsSend} />}
                                    onClick={() => userMessage()}
                                />
                            </Flex>
                        </Flex>
                    ) : (
                        <Flex w="100%" alignItems={"center"} justifyContent={"center"}>
                            <Flex
                                rounded="full"
                                border="2px"
                                p={6}
                                animation="pulse 1s infinite"
                                color="blue.600"
                            >
                                <Icon as={BsFillMicFill} boxSize={9} />
                            </Flex>
                        </Flex>
                    )}

                    <Flex gap={2} mt={2} w="100%" justifyContent={"space-between"}>
                        <Flex alignItems={"center"} gap={1}>
                            <Text
                                color={altPressed ? "blue.600" : "gray"}
                                fontSize="md"
                                fontWeight={"semibold"}
                            >
                                Hold down Alt to speak to Bob
                            </Text>
                            <Icon
                                color={altPressed ? "blue.600" : "gray"}
                                as={BsFillMicFill}
                            />
                        </Flex>
                        <Tooltip label={"Create key points and move on to next Section"}>
                            <Button
                                isDisabled={bobThinking}
                                colorScheme="green"
                                onClick={() => updateCard()}
                            >
                                Close Chat
                            </Button>
                        </Tooltip>
                    </Flex>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default ChatBotModal;
