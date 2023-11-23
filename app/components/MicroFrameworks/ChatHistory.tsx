import {
    Flex,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Button,
    Text,
    Box,
    Icon,
    Divider,
    Avatar,
    Spinner,
    Image
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { BsChat } from "react-icons/bs";
import { MdLockReset } from "react-icons/md";
import {
    useSelector,
    useDispatch,
    fetchBMCCardsfuture1Chat,
    selectFuture1BMCCardChat,
    selectFuture1CVPCardChat,
    fetchCVPCardsfuture1Chat,
    Future1BMCReset,
    Future1CVPReset,
    selectBMCFuture1,
    selectCVP,
    selectBMCFuture2,
    selectBMCFuture3,
    selectFuture2BMCCardChat,
    selectFuture3BMCCardChat,
    fetchBMCCardsfuture2Chat,
    fetchBMCCardsfuture3Chat,
    Future2BMCReset,
    Future3BMCReset,
    updateBMCCardsfuture2,
    updateBMCCardsfuture3,
    updateCVPCardsfuture1,
    updateBMCCardsfuture1,
    selectedFuture1BMCCard,
    selectedFuture2BMCCard,
    selectedFuture3BMCCard,
    selectedFuture1CVPCard,
    AppSlice,
    updateMenuLock,
} from "@/lib/redux";
import { usePathname } from "next/navigation";
import { IconContext } from "react-icons";
import { signOut, useSession } from "next-auth/react";
export default function ChatHistory(props: any) {
    const { seeChatBar } = props;
    const dispatch = useDispatch();
    const pathName = usePathname();
    const greenShadow = "0px 0px 8px rgba(6, 188, 6, 0.4)";
    const Future1BMCConversation = useSelector(selectFuture1BMCCardChat);
    const Future2BMCConversation = useSelector(selectFuture2BMCCardChat);
    const Future3BMCConversation = useSelector(selectFuture3BMCCardChat);
    const CVPConversation = useSelector(selectFuture1CVPCardChat)
    const [conversation, setConversation] = useState<any>(null);
    const { data: Future1BMCCards } = useSelector(selectBMCFuture1);
    const { data: Future2BMCCards } = useSelector(selectBMCFuture2);
    const { data: Future3BMCCards } = useSelector(selectBMCFuture3);
    const Future1BMCCard = useSelector(selectedFuture1BMCCard);
    const Future2BMCCard = useSelector(selectedFuture2BMCCard);
    const Future3BMCCard = useSelector(selectedFuture3BMCCard);
    const Future1CVPCard = useSelector(selectedFuture1CVPCard)
    const { data: Future1CVPCards } = useSelector(selectCVP);
    const { data: session }: { data: any } = useSession({
        required: true,
    });

    const [selectedCard, setSelectedCard] = useState<any>(null);


    useEffect(() => {
        if (pathName === "/Future1/BMC") {
            setConversation(Future1BMCConversation);
            dispatch(updateMenuLock({ canvasName: "Value Proposisition Canvas", value: true }))
        } else if (pathName === "/Future2/BMC") {
            setConversation(Future2BMCConversation);
        } else if (pathName === "/Future3/BMC") {
            setConversation(Future3BMCConversation);
        } else if (pathName === "/Future1/CVP") {
            setConversation(CVPConversation);
        } else {
            setConversation(null);
        }
    }, [pathName, Future1BMCConversation, Future2BMCConversation, Future3BMCConversation, CVPConversation]);

    useEffect(() => {
        if (pathName === "/Future1/BMC") {
            dispatch(fetchBMCCardsfuture1Chat());
        } else if (pathName === "/Future2/BMC") {
            dispatch(fetchBMCCardsfuture2Chat());
        } else if (pathName === "/Future3/BMC") {
            dispatch(fetchBMCCardsfuture3Chat());
        } else if (pathName === "/Future1/CVP") {
            dispatch(fetchCVPCardsfuture1Chat())
        }
    }, [pathName, Future1BMCCards, Future2BMCCards, Future3BMCCards, Future1CVPCards]);





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

    const resetCanvas = () => {
        if (pathName === "/Future1/BMC") {
            dispatch(Future1BMCReset())
        } else if (pathName === "/Future2/BMC") {
            dispatch(Future2BMCReset())
        } else if (pathName === "/Future3/BMC") {
            dispatch(Future3BMCReset())
        } else if (pathName === "/Future1/CVP") {
            dispatch(Future1CVPReset())
        }
    }
    function continueChat(cardName: any) {
        if (selectedCard) {
            const updatedSelectedCard = { ...selectedCard, selected: false };
            if (pathName === "/Future1/BMC") {
                const card = Future1BMCCards.find((card: any) => card.cardName === cardName)
                dispatch(updateBMCCardsfuture1(updatedSelectedCard)).then(
                    (data: any) => {
                        const updatedCard = { ...card, selected: true };
                        dispatch(updateBMCCardsfuture1(updatedCard))
                            .then((data) => {
                                dispatch(AppSlice.actions.toggleChatModal(true))
                            });
                    }
                );
            }
            if (pathName === "/Future2/BMC") {
                const card = Future2BMCCards.find((card: any) => card.cardName === cardName)
                dispatch(updateBMCCardsfuture2(updatedSelectedCard)).then(
                    (data: any) => {
                        const updatedCard = { ...card, selected: true };
                        dispatch(updateBMCCardsfuture2(updatedCard))
                            .then((data) => {
                                dispatch(AppSlice.actions.toggleChatModal(true))
                            });
                    }
                );
            }
            if (pathName === "/Future3/BMC") {
                const card = Future3BMCCards.find((card: any) => card.cardName === cardName)
                dispatch(updateBMCCardsfuture3(updatedSelectedCard)).then(
                    (data: any) => {
                        const updatedCard = { ...card, selected: true };
                        dispatch(updateBMCCardsfuture3(updatedCard))
                            .then((data) => {
                                dispatch(AppSlice.actions.toggleChatModal(true))
                            });
                    }
                );
            }
            if (pathName === "/Future1/CVP") {
                const card = Future1CVPCards.find((card: any) => card.cardName === cardName)
                dispatch(updateCVPCardsfuture1(updatedSelectedCard)).then(
                    (data: any) => {
                        const updatedCard = { ...card, selected: true };
                        dispatch(updateCVPCardsfuture1(updatedCard))
                            .then((data) => {
                                dispatch(AppSlice.actions.toggleChatModal(true))
                            });
                    }
                );
            }
        }
    }
    return (

        <>

            <Flex
                bg="white"
                shadow={greenShadow}
                w="20%"
                h="100%"
                position={"absolute"}
                right={seeChatBar ? "0" : "-20%"}
                direction={"column"}
                overflowY={"scroll"}
                transition={"right 0.5s ease-in-out"}
            >
                {(session === null || session === undefined) ?
                    <Flex flexDirection={'column'} alignItems={'center'} justifyContent={'center'} h={'100%'} w={'100%'}>
                        <Spinner
                            mt={8}
                            thickness="4px"
                            speed="0.65s"
                            emptyColor="gray.200"
                            color="green.500"
                            size="xl"
                        />
                    </Flex> :
                    <>
                        <Flex alignItems={"center"} pb={3} px={3} direction={"column"}>
                            <Text fontSize={'md'} my={3} fontWeight={'semibold'}>Hello {session?.user?.name}</Text>
                            <Button my={3} onClick={() => signOut({ callbackUrl: '/ThinkBeyond' })} w={'full'} variant={'solid'} colorScheme="green">
                                Sign Out
                            </Button>
                            <Button onClick={resetCanvas} w={'full'} variant={'solid'} colorScheme="green">
                                <IconContext.Provider
                                    value={{ color: 'white', size: '30px' }}
                                >
                                    <MdLockReset />
                                </IconContext.Provider>&nbsp;&nbsp;Reset Canvas
                            </Button>
                        </Flex>
                        <Flex alignItems={"center"} p={3} direction={"column"}>
                            <Text
                                ms={1}
                                w="full"
                                fontWeight={"semibold"}
                                fontSize={["sm", "sm", "sm", "md", "lg", "xl"]}
                            >
                                Chat History
                            </Text>
                        </Flex>
                        <Accordion allowMultiple>
                            {conversation?.map((conv: any, index: number) => (
                                <AccordionItem
                                    key={index}
                                    rounded={"md"}
                                    alignItems={"center"}
                                    justifyContent={"space-between"}
                                >
                                    <AccordionButton
                                        p={4}
                                        fontWeight={"medium"}
                                        fontSize={["sm", "sm", "sm", "sm", "md", "md"]}
                                    >
                                        <Box as="span" flex="1" textAlign="left">
                                            {conv.cardName}
                                        </Box>
                                        <AccordionIcon />
                                    </AccordionButton>
                                    <AccordionPanel>
                                        <Flex justifyContent={"center"}>
                                            <Button
                                                colorScheme="green"
                                                variant={"outline"}
                                                w="full"
                                                size={"sm"}
                                                mb={3}
                                                rightIcon={<Icon as={BsChat} />}
                                                onClick={() => continueChat(conv.cardName)}
                                            >
                                                Continue Chat
                                            </Button>
                                        </Flex>
                                        {conv?.chat
                                            ?.filter((message: any) => message.role !== "system")
                                            .map((speechBubbles: any, index: number) => (
                                                <Flex
                                                    p={1}
                                                    bg={speechBubbles.role === "user" ? "white" : "gray.100"}
                                                    rounded={"sm"}
                                                    h="100%"
                                                    key={index}
                                                >
                                                    <Flex w={'15%'} alignItems={"center"} mr={2} direction={"column"}>
                                                        <div style={{ height: '40px', width: '40px' }}>
                                                            <Image
                                                                src={
                                                                    speechBubbles.role === "user"
                                                                        ? `${session?.user?.image}`
                                                                        : "/images/bob.png"
                                                                }
                                                                borderRadius={'100%'}
                                                                overflow={'hidden'}
                                                                w={'100%'}
                                                                maxWidth={'100%'}
                                                                referrerPolicy="no-referrer"
                                                                style={{ objectFit: "cover", height: "100%" }}
                                                            />
                                                        </div>
                                                        <Divider
                                                            orientation="vertical"
                                                            borderColor="blue.200"
                                                            borderWidth={2}
                                                            borderRadius={10}
                                                        />
                                                    </Flex>

                                                    <Text
                                                        width={'85%'}
                                                        fontSize={["2xs", "xs", "sm", "sm", "md", "md"]}
                                                        wordBreak={"break-word"}
                                                        maxWidth="100%"
                                                    >
                                                        {speechBubbles.content}
                                                    </Text>
                                                </Flex>
                                            ))}
                                    </AccordionPanel>
                                </AccordionItem>
                            ))}
                            {conversation?.length === 0 && (
                                <Flex>
                                    <Text
                                        color="gray"
                                        fontWeight={"medium"}
                                        p={3}
                                        fontSize={["sm", "sm", "sm", "xs", "sm", "md"]}
                                    >
                                        See your conversations with Bob here!
                                    </Text>
                                </Flex>
                            )}
                        </Accordion>
                    </>}
            </Flex>
        </>
    );
}
