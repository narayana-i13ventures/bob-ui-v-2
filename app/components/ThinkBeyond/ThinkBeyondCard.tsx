import {
    useSelector,
    selectedThinkBeyondCard,
    selectCardLoading
} from '@/lib/redux';
import {
    Card,
    CardBody,
    Text,
    Button,
    Icon,
    Flex,
    Tag,
    Spinner
} from '@chakra-ui/react';
import { BsShieldLock } from 'react-icons/bs';

export default function ThinkBeyondCard(props: {
    card: any;
    selectCard: any;
    handleStartButtonPress: any;
    darkTheme: any;
}) {
    const {
        card,
        selectCard,
        handleStartButtonPress,
        darkTheme
    } = props;

    const selectedCard = useSelector(selectedThinkBeyondCard);
    const cardLoading = useSelector(selectCardLoading);

    return (
        <Card
        minW={'160px'}
            cursor={'pointer'}
            shadow={card?.selected ? 'greenShadow' : !'darkTheme' ? "md" : 'whiteShadow'}
            variant={card?.locked ? "filled" : "elevated"}
            bg={darkTheme && card?.locked ? "gray.900" : darkTheme ? "blue.900" : "white"}
            onClick={() => selectCard(card)}
            transition="box-shadow 0.3s ease-in-out"
            _hover={{ shadow: card?.selected ? 'greenShadow' : !card?.locked ? 'greenLight' : !darkTheme ? "md" : 'whiteShadow' }}
        >
            {(selectedCard?.id === card?.id && cardLoading) ?
                <>
                    <Flex alignItems={'center'} justifyContent={'center'} h={'100%'} w={'100%'}>
                        <Spinner
                            thickness="4px"
                            speed="0.65s"
                            emptyColor="gray.200"
                            color="green.500"
                            size="xl"
                        />
                    </Flex>
                </> :
                <CardBody h="full">
                    <Flex alignItems={"center"} justifyContent={"space-between"}>
                        <Text color={darkTheme ? "white" : "black"} fontSize="xs" fontWeight={"semibold"}>{card?.cardName}</Text>
                    </Flex>
                    {card?.locked ? (
                        <Flex justifyContent={"center"} p={2}>
                            <Icon as={BsShieldLock} ml={4} mr={4} boxSize={7} color={darkTheme ? "white" : "gray.400"} />
                        </Flex>
                    ) : (
                        <Flex mt={1} gap={1}>
                            <Tag
                                borderRadius='full'
                                variant='solid'
                                colorScheme={!card?.started ? "red" : card?.complete ? "green" : "yellow"}
                                size="sm"
                            >
                                {!card?.started ? "Incomplete" : card?.complete ? "Completed" : "In Progress..."}
                            </Tag>
                            {card?.type === "future_bmc" && (
                                <Tag
                                    borderRadius='full'
                                    variant='solid'
                                    colorScheme={card?.bmc?.status === "empty" ? "red" : card?.bmc?.status === "complete" ? "green" : "yellow"}
                                    size="sm"
                                >
                                    BMC
                                </Tag>
                            )}
                        </Flex>
                    )}
                    <Flex mt={1}>
                        <Button hidden={!card?.selected} size="xs" colorScheme={!card?.complete ? 'green' : "blue"} onClick={() => handleStartButtonPress()}>
                            {!card?.started ? "Start" : !card?.complete ? "Continue" : "Update"}
                        </Button>
                    </Flex>

                </CardBody>}
        </Card>

    )
}