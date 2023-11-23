'use client';
import {
    Flex,
    Icon,
    Text,
    useMediaQuery,
    Tooltip,
} from '@chakra-ui/react'
import {
    BsChevronCompactLeft,
    BsChevronCompactRight,
    BsChevronCompactUp,
    BsChevronCompactDown
} from 'react-icons/bs'
import Menu from '@/app/components/MicroFrameworks/Menu';
import Steppr from '@/app/components/MicroFrameworks/Stepper';
import { useEffect, useState } from 'react'
import ChatHistory from '@/app/components/MicroFrameworks/ChatHistory';


export default function MicroFrameworkWrapper({ children }: { children: React.ReactNode }) {

    const [seeMenu, setSeeMenu] = useState(true)
    const [darkTheme, setDarkTheme] = useState(false)
    const [seeChatBar, setSeeChatBar] = useState(false)
    const [seeProgress, setSeeProgress] = useState(false)
    const [isMobile] = useMediaQuery('(max-width: 768px)')
    const [smallScreen] = useMediaQuery('(max-width: 1024px)')

    useEffect(() => {
        if (smallScreen) {
            setSeeChatBar(false)
        }
    }, [smallScreen])

    function continueChat(cardName: string) {

    }

    function handleSeeMenu() {
        if (seeMenu) {
            setSeeMenu(false)
        }
        else if (!seeMenu && seeChatBar && smallScreen) {
            setSeeMenu(true)
            setSeeChatBar(false)
        }
        else {
            setSeeMenu(true)
        }
    }

    function handleSeeChatHistory() {
        if (seeChatBar) {
            setSeeChatBar(false)
        }
        else if (!seeChatBar && seeMenu && smallScreen) {
            setSeeChatBar(true)
            setSeeMenu(false)
        }
        else {
            setSeeChatBar(true)
        }
    }
    if (isMobile) {
        return (
            <Flex
                w={'100%'}
                h={'100%'}
                direction={'column'}
                alignItems={'center'}
                textAlign={'center'}
                justifyContent={'center'}
                p={6}
            >
                <Text>
                    Apollo is optimized for desktop. Please use a desktop/laptop computer
                    to access this feature.
                </Text>
            </Flex>
        )
    }
    return (
        <Flex
            h="100vh"
            maxW="100vw"
            bg="green.50"
            direction="row"
            justify="space-between"
            overflow={"hidden"}
        >
            <Menu seeMenu={seeMenu} seeChatHistory={seeChatBar} smallScreen={smallScreen} darkTheme={darkTheme} setDarkTheme={setDarkTheme} />
            <Tooltip label="Menu" placement="right" hasArrow>
                <Flex
                    shadow="greenShadowRight"
                    zIndex={1}
                    alignSelf={"center"}
                    alignItems={"center"}
                    justifyContent={"end"}
                    h={12}
                    w={"30px"}
                    position={"absolute"}
                    left={seeMenu ? "20%" : "0"}
                    transition="left 0.5s ease-in-out"
                    bg="white"
                    borderEndRadius={"50%"}
                    onClick={() => handleSeeMenu()}>
                    <Icon as={seeMenu ? BsChevronCompactLeft : BsChevronCompactRight} boxSize={9}
                        opacity={0.5}
                        _hover={{ opacity: 1 }}
                    />
                </Flex>
            </Tooltip>
            <Flex
                w={seeChatBar && seeMenu ? "60%" : seeChatBar || seeMenu ? "80%" : "100%"}
                position={"absolute"}
                h="100%"
                right={seeChatBar ? "20%" : "0"}
                transition={"right 0.5s ease-in-out, width 0.5s ease-in-out"} direction={"column"} alignItems={"center"}>
                <Flex
                    roundedBottom={"md"}
                    shadow="greenShadow"
                    transition="height 0.3s ease-out"
                    bg="white" p={seeProgress ? 3 : 0}
                    w="50%"
                    h={seeProgress && smallScreen ? "12%" : seeProgress ? "10%" : "0vh"}>

                    <Steppr seeProgress={seeProgress} />
                </Flex>
                <Tooltip label="Future Progress" placement="bottom" hasArrow>
                    <Flex
                        shadow="greenShadowRight"
                        zIndex={1}
                        alignSelf={"center"}
                        alignItems={"center"}
                        justifyContent={"center"}
                        h={"20px"}
                        w={12}
                        bg="white"
                        borderBottomRadius={"50%"}
                        onClick={() => seeProgress ? setSeeProgress(false) : setSeeProgress(true)}>
                        <Icon as={seeProgress ? BsChevronCompactUp : BsChevronCompactDown} boxSize={9}
                            opacity={0.5}
                            _hover={{ opacity: 1 }}
                        />
                    </Flex>
                </Tooltip>
                {children}
            </Flex>
            <Tooltip label="User Menu" placement="left" hasArrow>
                <Flex
                    shadow="greenShadowLeft"
                    zIndex={1}
                    alignSelf={"center"}
                    alignItems={"center"}
                    h={12}
                    w={"30px"}
                    bg="white"
                    position={"absolute"}
                    right={seeChatBar ? "20%" : "0"}
                    transition="right 0.5s ease-in-out"
                    borderStartRadius={"50%"}
                    onClick={() => handleSeeChatHistory()}>
                    <Icon as={seeChatBar ? BsChevronCompactRight : BsChevronCompactLeft}
                        boxSize={9}
                        opacity={0.5}
                        _hover={{ opacity: 1 }}
                    />
                </Flex>
            </Tooltip>
            <ChatHistory continueChat={continueChat} seeChatBar={seeChatBar} />
        </Flex>

    )
}