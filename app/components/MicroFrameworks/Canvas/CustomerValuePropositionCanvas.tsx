import React from 'react';
import MicroframeworkCard from '../MicroframeworkCard';
import { Flex, Grid, GridItem, Image, Text } from "@chakra-ui/react";

const CustomerValuePropositionCanvas = (props: any) => {
    const { cards, handleChatButtonPress, selectCard } = props;

    return (
        <Grid
            templateRows="repeat(10, 1fr)"
            templateColumns="repeat(13, 1fr)"
            gap={2}
            w="100%"
            pr={"30px"}
            pl={"30px"}
            pb={"30px"}
            pt={"15px"}
            h="full"
        >
            <GridItem rowSpan={1} colSpan={6}>
                <Text fontSize="xl" fontWeight={"semibold"} textAlign={'center'}>Value</Text>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
            </GridItem>
            <GridItem rowSpan={1} colSpan={6}>
                <Text fontSize="xl" fontWeight={"semibold"} textAlign={'center'}>Customer</Text>
            </GridItem>
            <GridItem rowSpan={9} colSpan={3}>
                <Flex h="full" direction={"column"} justifyContent={"space-between"}>
                    <MicroframeworkCard selectCard={selectCard} card={cards.find((card: { cardName: string; }) => card.cardName === 'Gain Creators')} handleChatButtonPress={handleChatButtonPress} />
                    <MicroframeworkCard selectCard={selectCard} card={cards.find((card: { cardName: string; }) => card.cardName === 'Pain Relievers')} handleChatButtonPress={handleChatButtonPress} />
                </Flex>
            </GridItem>
            <GridItem rowSpan={9} colSpan={3}>
                <MicroframeworkCard selectCard={selectCard} card={cards.find((card: { cardName: string; }) => card.cardName === 'Products and Services')} handleChatButtonPress={handleChatButtonPress} />
            </GridItem>
            <GridItem rowSpan={9} colSpan={1}>
                <Flex h="full" justifyContent={"center"} alignItems={'center'}>
                    <Image src={'/images/double-arrow.png'} alt={'arrow'} maxW={'100%'} />
                </Flex>
            </GridItem>
            <GridItem rowSpan={9} colSpan={3}>
                <MicroframeworkCard selectCard={selectCard} card={cards.find((card: { cardName: string; }) => card.cardName === 'Client Jobs')} handleChatButtonPress={handleChatButtonPress} />
            </GridItem>
            <GridItem rowSpan={9} colSpan={3}>
                <Flex h="full" direction={"column"} justifyContent={"space-between"}>
                    <MicroframeworkCard selectCard={selectCard} card={cards.find((card: { cardName: string; }) => card.cardName === 'Client Gains')} handleChatButtonPress={handleChatButtonPress} />
                    <MicroframeworkCard selectCard={selectCard} card={cards.find((card: { cardName: string; }) => card.cardName === 'Client Pains')} handleChatButtonPress={handleChatButtonPress} />
                </Flex>
            </GridItem>
        </Grid>
    )
}

export default CustomerValuePropositionCanvas