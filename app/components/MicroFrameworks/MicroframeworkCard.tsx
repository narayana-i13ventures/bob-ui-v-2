import {
    Card,
    CardBody,
    Text,
    Button,
    Icon,
    Flex,
    ListItem,
    Tooltip,
    UnorderedList,
    Spinner,
    useMediaQuery,
    Spacer,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverCloseButton,
    PopoverHeader,
    PopoverBody,
    PopoverArrow,
    List,
} from "@chakra-ui/react";
import {
    BsChat,
    BsInfoCircleFill,
    BsFillChatFill,
    BsShieldLock,
} from "react-icons/bs";

export default function MicroframeworkCard(props: any) {
    const {
        card,
        handleChatButtonPress,
        selectCard,
    } = props;

    function truncate(str: string, n: number) {
        return str.length > n ? str.substr(0, n - 1) + "..." : str;
    }

    const [smallScreen] = useMediaQuery("(max-width: 1024px)");
    return (
        <Card
            h={card?.size === "half" ? "49.5%" : "100%"}
            shadow={card?.selected ? 'greenShadow' : card?.locked ? "none" : "md"}
            variant={card?.locked ? "filled" : "elevated"}
            onClick={() => selectCard(card)}
            transition="box-shadow 0.3s ease-in-out"
            _hover={{
                shadow: card?.selected
                    ? 'greenShadow'
                    : !card?.locked
                        ? 'greenLight'
                        : "none",
            }}
        >
            <CardBody
                h="full"
                overflowY={card?.selected ? "auto" : "hidden"}
                sx={{
                    "&::-webkit-scrollbar": {
                        width: "2px", 
                    },
                    "&::-webkit-scrollbar-track": {
                        backgroundColor: "#F0F0F0",
                    },
                    "&::-webkit-scrollbar-thumb": {
                        rounded: "lg",
                        backgroundColor: "green",
                    },
                }}
            >
                <Flex direction={"column"} h="full">
                    <Flex
                        mb={2}
                        alignItems={"center"}
                        w="full"
                        justifyContent={"space-between"}
                    >
                        <Text
                            fontWeight={"semibold"}
                            fontSize={["2xs", "2xs", "2xs", "2xs", "xs", "sm"]}
                        >
                            {card?.cardName}
                        </Text>
                        {card?.selected && card?.keyPoints !== "" ? (
                            <Icon
                                as={BsFillChatFill}
                                boxSize={[3, 3, 3, 4, 5, 6]}
                                color="green.300"
                                transition={"color 0.3s ease-in-out"}
                                onClick={() => handleChatButtonPress()}
                                _hover={{ color: "green.600", cursor: "pointer" }}
                            />
                        ) : (
                            <Flex boxSize={5}></Flex>
                        )}
                    </Flex>

                    <Flex
                        h="full"
                        justifyContent={
                            card?.loadingKeyPoints || card?.keyPoints === ""
                                ? "center"
                                : "start"
                        }
                        alignItems={
                            card?.loadingKeyPoints || card?.keyPoints === "" ? "center" : "top"
                        }
                    >
                        {card?.locked ? (
                            <Icon
                                as={BsShieldLock}
                                boxSize={[4, 4, 5, 7, 8, 10]}
                                color={"gray.400"}
                            />
                        ) : card?.loadingKeyPoints ? (
                            <Spinner />
                        ) : card?.keyPoints === "" && card?.selected ? (
                            <Flex
                                direction={"column"}
                                height={"100%"}
                                justifyContent={"center"}
                                w="100%"
                            >
                                <Spacer />
                                <Flex justifyContent={"center"}>
                                    <Button
                                        size={["xs", "xs", "xs", "xs", "sm", "md"]}
                                        colorScheme="green"
                                        rightIcon={<Icon as={BsChat} />}
                                        onClick={() => handleChatButtonPress()}
                                    >
                                        Chat
                                    </Button>
                                </Flex>
                                <Spacer />
                                <Flex
                                    hidden={!card?.selected}
                                    alignSelf={"end"}
                                    justifySelf={"baseline"}
                                >
                                    <Popover placement="left" closeOnBlur>
                                        <PopoverTrigger>
                                            <Flex boxSize={[1, 1, 1, 1, 2, 2]}>
                                                <Icon
                                                    boxSize={[2, 3, 3, 3, 4, 4]}
                                                    color="green"
                                                    as={BsInfoCircleFill}
                                                />
                                            </Flex>
                                        </PopoverTrigger>
                                        <PopoverContent bg="green.100">
                                            <PopoverArrow bg="green.100" />
                                            <PopoverCloseButton />
                                            <PopoverHeader fontWeight="semibold">
                                                {card?.labelHeading}
                                            </PopoverHeader>
                                            <PopoverBody>
                                                <UnorderedList>
                                                    {card?.label.map((label: string) => (
                                                        <ListItem
                                                            key={label}
                                                            fontSize={[
                                                                "2xs",
                                                                "2xs",
                                                                "2xs",
                                                                "2xs",
                                                                "xs",
                                                                "sm",
                                                            ]}
                                                        >
                                                            {label}
                                                        </ListItem>
                                                    ))}
                                                </UnorderedList>
                                            </PopoverBody>
                                        </PopoverContent>
                                    </Popover>
                                </Flex>
                            </Flex>
                        ) : (
                            <UnorderedList color={card?.score == 0
                                ? 'red'
                                : card?.score == 1 && card?.score == 2
                                    ? 'orange'
                                    : 'green'}>
                                {card?.keyPoints?.split("--")
                                    .filter((keyPoint: string) => keyPoint !== "")
                                    .map((keyPoint: any, index: number) => (
                                        <ListItem
                                            key={index}
                                            fontSize={["2xs", "2xs", "2xs", "2xs", "xs", "sm"]}
                                        >
                                            {keyPoint}
                                        </ListItem>
                                    ))}
                            </UnorderedList>
                        )}
                    </Flex>
                </Flex>
            </CardBody>
        </Card>
    );
}
