'use client';
import React, { useEffect, useState } from 'react';
import {
    useSelector,
    useDispatch,
    fetchThinkBeyond,
    updateThinkBeyond,
    selectThinkBeyond,
    selectDarkTheme,
    selectedThinkBeyondCard,
    nextCardThinkBeyond,
    Future1BMCPrefill,
    fetchCompany,
    AppSlice,
    selectMessageModal,
} from '@/lib/redux';
import {
    Flex,
    useDisclosure,
    Box,
    Image,
    Spinner,
    Text
} from "@chakra-ui/react";
import Bob from '../components/ThinkBeyond/Bob';
import ThinkBeyondModal from '../components/ThinkBeyond/ThinkBeyondModal';
import ThinkBeyondCard from '../components/ThinkBeyond/ThinkBeyondCard';
import GoToBMCCard from '../components/ThinkBeyond/GoToBMCCard';
import { fetchPrefillData } from '@/lib/redux/apiCalls';
import MessageModal from '../components/MessageModal';
import { useRouter } from 'next/navigation';

const ThinkBeyond = () => {
    const dispatch = useDispatch();
    const modal = useDisclosure();
    const darkTheme = useSelector(selectDarkTheme);
    const selectedCard = useSelector(selectedThinkBeyondCard)
    const { data: ThinkBeyondCards, loading, error } = useSelector(selectThinkBeyond);
    const [prefillBody, setPrefillBody] = useState({});
    const messageModal = useSelector(selectMessageModal);
    const router = useRouter()

    function setPrefillBodyKey(heading: any) {
        switch (heading) {
            case 'What is the change':
                return 'change';
            case 'What is the Moonshot':
                return 'ultimate goal';
            case 'Problem to be solved':
                return 'Problem';
            case 'Hypothesis':
                return 'Hypothesis';
            case 'Envisaged Timeframe':
                return 'Envisaged Timeframe';
            default:
                return ''
        }
    }
    function extractKeyValues(cards: any, cardNumber: any): Record<string, string> {
        const card = cards.find((card: any) => card.cardNumber === cardNumber)
        const keyValues: Record<string, string> = {};
        card?.cardInfo.forEach((info: any) => {
            keyValues[setPrefillBodyKey(info.heading)] = info.text;
        });
        return keyValues;
    }
    function extractText(cards: any, cardNumber: any) {
        const card = cards.find((card: any) => card.cardNumber === cardNumber);
        if (card) {
            const cardInfo = card.cardInfo[0];
            return cardInfo.text;
        }
        return undefined;
    }

    useEffect(() => {
        dispatch(fetchThinkBeyond())
        dispatch(fetchCompany())
            .then((data: any) => {
                setPrefillBody({ companyData: data.payload })
            })
    }, []);

    useEffect(() => {
        const data = {
            "thinkBeyondCards":
            {
                "change": extractText(ThinkBeyondCards, 0),
                "ultimate goal": extractText(ThinkBeyondCards, 1),
                "Future": {
                    "key": 1,
                    "Data": { ...extractKeyValues(ThinkBeyondCards, 2) }
                }
            }
        };
        setPrefillBody((prevData) => ({ ...data, ...prevData }));
    }, [ThinkBeyondCards]);

    function nextCard(card: any) {
        modal.onClose();
        if (card.cardName === 'Future 1 (OKRs)') {
            dispatch(AppSlice.actions.toggleMessageModal(true))
            fetchPrefillData('https://bobapi.i13ventures.com/v1/bmc/prefill', prefillBody)
                .then((data: any) => {
                    dispatch(Future1BMCPrefill(data))
                        .then((data2) => {
                            if ("Notification" in window) {
                                if (Notification.permission === "granted") {
                                    const notification = new Notification("BMC Canvas Unlocked", {
                                        body: "Bob Completed Creating your canvas.",
                                        icon: "/images/i13logo.png",
                                    });
                                    notification.onclick = () => {
                                        router.push(`/Future1/BMC`)
                                    }
                                }
                            }
                            dispatch(nextCardThinkBeyond(card?.id))
                            dispatch(AppSlice.actions.toggleMessageModal(false))
                        })
                })
        } else {

            dispatch(nextCardThinkBeyond(card?.id))
        }
    }

    function selectCard(card: any) {
        if (ThinkBeyondCards && ThinkBeyondCards?.length > 0) {
            if (!card?.locked) {
                if (selectedCard && selectedCard.id !== card.id) {
                    const updatedSelectedCard = { ...selectedCard, selected: false };
                    dispatch(updateThinkBeyond(updatedSelectedCard))
                        .then((data) => {
                            const updatedCard = { ...card, selected: true };
                            dispatch(updateThinkBeyond(updatedCard))
                        });
                }
            }
        }
    }

    function handleStartButtonPress() {
        modal.onOpen()
    }
    return (
        <Flex
            h="100vh"
            w="full"
            alignItems={"center"}
            justifyContent={"center"}
            overflow={"hidden"}
            bgImage={darkTheme ? "url(images/space.png)" : "url('images/apollobg.webp')"}
            bgSize={"cover"}
        >
            {loading ?
                <>
                    <Flex flexDirection={'column'} alignItems={'center'} justifyContent={'center'} h={'100%'} w={'100%'}>
                        <Text fontSize="lg" fontWeight={"semibold"}>Fetching Think Beyond Cards</Text>
                        <Spinner
                            mt={8}
                            thickness="4px"
                            speed="0.65s"
                            emptyColor="gray.200"
                            color="green.500"
                            size="xl"
                        />
                    </Flex>
                </> :
                <>
                    <Flex
                        p={"20px"}
                        direction="column"
                        alignItems={"center"}
                        justifyContent={"center"}
                        zIndex={(modal.isOpen || messageModal) ? 'inherit' : 10002}
                    >
                        <Flex mr="9%">
                            <Flex gap="50px" mb="20px">
                                <Flex>
                                    <GoToBMCCard darkTheme={darkTheme} card={ThinkBeyondCards.find((card: any) => card.cardNumber === 4)} selectCard={selectCard} nextCard={nextCard} future={1} />
                                    <ThinkBeyondCard darkTheme={darkTheme} card={ThinkBeyondCards.find((card: any) => card.cardNumber === 2)} selectCard={selectCard} handleStartButtonPress={handleStartButtonPress} />
                                </Flex>
                                <Flex>
                                    <GoToBMCCard darkTheme={darkTheme} card={ThinkBeyondCards.find((card: any) => card.cardNumber === 7)} selectCard={selectCard} nextCard={nextCard} future={2} />
                                    <ThinkBeyondCard darkTheme={darkTheme} card={ThinkBeyondCards.find((card: any) => card.cardNumber === 5)} selectCard={selectCard} handleStartButtonPress={handleStartButtonPress} />
                                </Flex>
                                <Flex>
                                    <GoToBMCCard darkTheme={darkTheme} card={ThinkBeyondCards.find((card: any) => card.cardNumber === 10)} selectCard={selectCard} nextCard={nextCard} future={3} />
                                    <ThinkBeyondCard darkTheme={darkTheme} card={ThinkBeyondCards.find((card: any) => card.cardNumber === 8)} selectCard={selectCard} handleStartButtonPress={handleStartButtonPress} />
                                </Flex>
                            </Flex>
                        </Flex>
                        <Box>
                            <Flex alignItems={"center"} justifyContent="center" gap="30px">
                                <Flex>
                                    <ThinkBeyondCard darkTheme={darkTheme} card={ThinkBeyondCards.find((card: any) => card.cardNumber === 0)} selectCard={selectCard} handleStartButtonPress={handleStartButtonPress} />
                                </Flex>
                                <Flex position="relative" w="50%">
                                    <Image src="images/glowi13.png" alt="First Image" />
                                    <Image src="images/glow2.0.png" alt="Second Image" position="absolute" top={-1} left="0" opacity={1} transition="opacity 1s ease-in-out" />
                                </Flex>
                                <Flex>
                                    <ThinkBeyondCard darkTheme={darkTheme} card={ThinkBeyondCards.find((card: any) => card.cardNumber === 1)} selectCard={selectCard} handleStartButtonPress={handleStartButtonPress} />
                                </Flex>
                            </Flex>
                        </Box>
                        <Flex >
                            <Flex gap="50px" mt="20px">
                                <ThinkBeyondCard darkTheme={darkTheme} card={ThinkBeyondCards.find((card: any) => card.cardNumber === 3)} selectCard={selectCard} handleStartButtonPress={handleStartButtonPress} />
                                <ThinkBeyondCard darkTheme={darkTheme} card={ThinkBeyondCards.find((card: any) => card.cardNumber === 6)} selectCard={selectCard} handleStartButtonPress={handleStartButtonPress} />
                                <ThinkBeyondCard darkTheme={darkTheme} card={ThinkBeyondCards.find((card: any) => card.cardNumber === 9)} selectCard={selectCard} handleStartButtonPress={handleStartButtonPress} />
                            </Flex>
                        </Flex>
                    </Flex>
                    <Bob />
                    <ThinkBeyondModal
                        {...modal}
                        nextCard={nextCard}
                        darkTheme={darkTheme}
                    />
                    <MessageModal />
                </>}
        </Flex>

    )
}

export default ThinkBeyond