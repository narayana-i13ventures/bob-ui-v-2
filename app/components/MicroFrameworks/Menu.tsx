import {
    Flex,
    Image,
    Text,
    Icon,
    Accordion,
    AccordionButton,
    AccordionItem,
    AccordionPanel,
    Button,
    Tooltip,
    LinkBox,
} from "@chakra-ui/react";

import Link from "next/link";

import { useEffect, useState } from "react";
import {
    BsShieldLock,
    BsFillDoorOpenFill,
    BsFillDoorClosedFill,
} from "react-icons/bs";
import { BiCompass } from "react-icons/bi";
import { FaGlobeEurope } from "react-icons/fa";
import { usePathname, useRouter } from "next/navigation";
import { menuSlice, selectMenu, useDispatch, useSelector } from "@/lib/redux";

export default function Menu(props: any) {
    const { seeMenu, seeChatHistory, smallScreen, setDarkTheme, darkTheme } =
        props;
    const pathName = usePathname();
    const dispatch = useDispatch()
    const menu = useSelector(selectMenu);
    const [doorOpen, setDoorOpen] = useState(false);

    useEffect(() => {
        const updatedMenu = menu?.map((method: any) => ({
            ...method,
            frameworks: method.frameworks.map((framework: any) => ({
                ...framework,
                canvases: framework.canvases.map((canvas: any) => ({
                    ...canvas,
                    selected: canvas.route !== '' ? pathName.includes(canvas.route) : false,
                })),
            })),
        }));
        dispatch(menuSlice.actions.setCanvas(updatedMenu))
    }, [pathName]);

    const handleCanvasClick = (clickedCanvas: any) => {
        const updatedMenu = menu?.map((method: any) => ({
            ...method,
            frameworks: method.frameworks.map((framework: any) => ({
                ...framework,
                canvases: framework.canvases.map((canvas: any) => ({
                    ...canvas,
                    selected: canvas.name === clickedCanvas.name,
                })),
            })),
        }));
        dispatch(menuSlice.actions.setCanvas(updatedMenu))
    };

    function truncate(str: any, n: Number | any) {
        return str.length > n ? str.substr(0, n - 1) + "..." : str;
    }
    return (
        <Flex
            w="20%"
            position={"absolute"}
            left={seeMenu ? "0" : "-20%"}
            transition="left 0.5s ease-in-out"
            h="100%"
            direction="column"
            overflowY={"auto"}
            bg="white"
            shadow={'greenShadow'}
        >
            <Flex direction="column">
                <Image m={"15px"} src="/images/i13logo.png" alt="i13logo" />
                {menu.map((methodology) => (
                    <Accordion allowToggle key={methodology.methodology} index={0}>
                        <AccordionItem>
                            <AccordionButton>
                                <LinkBox
                                    w="100%"
                                    onMouseLeave={() => setDoorOpen(false)}
                                    onMouseEnter={() => setDoorOpen(true)}
                                >
                                    <Link href="/ThinkBeyond">
                                        <Flex justifyContent={"space-between"}>
                                            <Flex direction="row" alignItems="center">
                                                <Icon
                                                    boxSize={smallScreen ? 5 : 7}
                                                    as={FaGlobeEurope}
                                                    color="green"
                                                />
                                                <Text
                                                    ml={2}
                                                    fontWeight={"semibold"}
                                                    fontSize={["2xs", "2xs", "2xs", "2xs", "sm", "md"]}
                                                    color="green"
                                                >
                                                    {methodology.methodology}
                                                </Text>
                                            </Flex>
                                            <Icon
                                                color="green"
                                                boxSize={smallScreen ? 5 : 7}
                                                as={
                                                    doorOpen ? BsFillDoorOpenFill : BsFillDoorClosedFill
                                                }
                                            />
                                        </Flex>
                                    </Link>
                                </LinkBox>
                            </AccordionButton>
                            <AccordionPanel pb={4}>
                                {methodology.frameworks.map((framework: any) => (
                                    <Accordion allowToggle key={framework.name} index={0}>
                                        <AccordionItem>
                                            <AccordionButton>
                                                <Flex direction="row" alignItems="center">
                                                    <Icon boxSize={6} as={BiCompass} />
                                                    <Text
                                                        ml={2}
                                                        fontWeight={"semibold"}
                                                        fontSize={["2xs", "2xs", "2xs", "2xs", "sm", "md"]}
                                                    >
                                                        {framework.name}
                                                    </Text>
                                                </Flex>
                                            </AccordionButton>
                                            <AccordionPanel pb={4}>
                                                {framework.canvases.filter((canvas: any) => { return canvas.locked === false }).map((canvas: any) => (
                                                    <Tooltip
                                                        label={canvas.name}
                                                        aria-label={canvas.name}
                                                        key={canvas.name}
                                                        placement="right"
                                                        hasArrow
                                                    >
                                                        <Link href={canvas?.route}>
                                                            <Button
                                                                colorScheme={canvas.selected ? "green" : "gray"}
                                                                leftIcon={
                                                                    canvas.locked ? (
                                                                        <Icon
                                                                            boxSize={[4, 4, 4, 4, 5, 6]}
                                                                            as={BsShieldLock}
                                                                        />
                                                                    ) : (
                                                                        <Image
                                                                            boxSize={[4, 4, 4, 5, 6, 7]}
                                                                            src={"/images/white fire gif.gif"}
                                                                            style={{ filter: "hue-rotate(0deg)" }}
                                                                        ></Image>
                                                                    )
                                                                }
                                                                variant={canvas.selected ? "solid" : "ghost"}
                                                                size={["xs", "xs", "xs", "xs", "xs", "sm"]}
                                                                mb={2}
                                                                opacity={canvas.locked ? 0.5 : 1}
                                                                cursor={canvas.locked ? "not-allowed" : "pointer"}
                                                                disabled={canvas.locked}
                                                                onClick={() => handleCanvasClick(canvas)}
                                                            >
                                                                {smallScreen
                                                                    ? truncate(canvas.name, 12)
                                                                    : seeChatHistory
                                                                        ? truncate(canvas.name, 28)
                                                                        : canvas.name}
                                                            </Button>
                                                        </Link>
                                                    </Tooltip>
                                                ))}
                                            </AccordionPanel>
                                        </AccordionItem>
                                    </Accordion>
                                ))}
                            </AccordionPanel>
                        </AccordionItem>
                    </Accordion>
                ))}
            </Flex>
        </Flex>
    );
}
