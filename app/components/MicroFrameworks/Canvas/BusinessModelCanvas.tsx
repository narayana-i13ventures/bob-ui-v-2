import { Flex, Grid, GridItem } from "@chakra-ui/react"
import MicroframeworkCard from "../MicroframeworkCard";


export default function BuisnessModelCanvas(props: any) {
    const { cards, handleChatButtonPress, selectCard } = props;
    return (
        <Flex h="full" w="full" direction={"column"} alignItems={"center"}>
            <Grid
                templateRows="repeat(12, 1fr)"
                templateColumns="repeat(10, 1fr)"
                gap={2}
                w="100%"
                pr={"30px"}
                pl={"30px"}
                pb={"30px"}
                pt={"15px"}
                h="full"
            >
                <GridItem rowSpan={8} colSpan={2}>
                    <MicroframeworkCard selectCard={selectCard} card={cards?.find((card: { cardName: string; }) => card.cardName === 'Key Partners')} handleChatButtonPress={handleChatButtonPress} />
                </GridItem>

                <GridItem rowSpan={8} colSpan={2}>
                    <Flex h="full" direction={"column"} justifyContent={"space-between"}>
                        <MicroframeworkCard selectCard={selectCard} card={cards?.find((card: { cardName: string; }) => card.cardName === 'Key Activities')} handleChatButtonPress={handleChatButtonPress} />
                        <MicroframeworkCard selectCard={selectCard} card={cards?.find((card: { cardName: string; }) => card.cardName === 'Key Resources')} handleChatButtonPress={handleChatButtonPress} />
                    </Flex>
                </GridItem>

                <GridItem rowSpan={8} colSpan={2}>
                    <MicroframeworkCard selectCard={selectCard} card={cards?.find((card: { cardName: string; }) => card.cardName === 'Value Propositions')} handleChatButtonPress={handleChatButtonPress} />
                </GridItem>

                <GridItem rowSpan={8} colSpan={2}>
                    <Flex h="full" direction={"column"} justifyContent={"space-between"}>
                        <MicroframeworkCard selectCard={selectCard} card={cards?.find((card: { cardName: string; }) => card.cardName === 'Customer Relationships')} handleChatButtonPress={handleChatButtonPress} />
                        <MicroframeworkCard selectCard={selectCard} card={cards?.find((card: { cardName: string; }) => card.cardName === 'Channels')} handleChatButtonPress={handleChatButtonPress} />
                    </Flex>
                </GridItem>

                <GridItem rowSpan={8} colSpan={2}>
                    <MicroframeworkCard selectCard={selectCard} card={cards?.find((card: { cardName: string; }) => card.cardName === 'Customer Segments')} handleChatButtonPress={handleChatButtonPress} />
                </GridItem>

                <GridItem rowSpan={4} colSpan={5}>
                    <MicroframeworkCard selectCard={selectCard} card={cards?.find((card: { cardName: string; }) => card.cardName === 'Cost Structure')} handleChatButtonPress={handleChatButtonPress} />
                </GridItem>

                <GridItem rowSpan={4} colSpan={5}>
                    <MicroframeworkCard selectCard={selectCard} card={cards?.find((card: { cardName: string; }) => card.cardName === 'Revenue Streams')} handleChatButtonPress={handleChatButtonPress} />
                </GridItem>
            </Grid>
        </Flex>
    )
}
