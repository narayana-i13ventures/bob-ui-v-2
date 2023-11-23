import {
    Card,
    CardBody,
    Text,
    Icon,
    Flex,
} from '@chakra-ui/react'

import { BsGrid1X2Fill } from 'react-icons/bs'
import { TbShieldLockFilled } from 'react-icons/tb'
import { useRouter } from 'next/navigation';

interface props {
    card?: any;
    selectCard: any;
    nextCard: any;
    future: any;
    darkTheme: any
}
export default function GoToBMCCard(props: props) {
    const { card, selectCard, darkTheme } = props;
    const router = useRouter();

    const goToBMC = () => {
        if (card.type === 'future_1_bmc') {
            router.push('Future1/BMC')
        }
    }

    return (
        <Card
            shadow={card?.selected ? "greenShadow" : !darkTheme ? "md" : "whiteShadow"}
            variant={card?.locked ? "filled" : "elevated"}
            onClick={() => selectCard(card)}
            bg={darkTheme && card?.locked ? "blue.900" : darkTheme ? "blue.600" : "white"}
            minH="120px"
            left={card?.locked ? "70px" : "0px"}
            transition="box-shadow 0.3s ease-in-out, left 0.5s ease-in-out"
            _hover={{ shadow: card?.selected ? "greenShadow" : !card?.locked ? "greenLight" : "md" }}
        >
            <CardBody>
                <Flex direction="column" alignItems={"center"} gap="10px" >
                    <Text color={darkTheme ? "white" : "black"} fontSize={"xs"} fontWeight={"semibold"}>BMC</Text>
                    <div>
                        <Icon
                            as={card?.locked ? TbShieldLockFilled : BsGrid1X2Fill}
                            boxSize={7}
                            mt={2}
                            color={card?.locked ? "gray.400" : "green.300"}
                            transition={"color 0.3s ease-in-out"}
                            onClick={() => card?.selected ? goToBMC() : null}
                            _hover={{ color: card?.locked ? "gray.400" : card?.selected ? "green.600" : "green.300", cursor: card?.selected ? "pointer" : "normal" }}
                        />
                    </div>
                </Flex>
            </CardBody>
        </Card>
    )
}