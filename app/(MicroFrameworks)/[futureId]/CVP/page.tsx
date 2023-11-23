"use client";
import React, { useEffect } from "react";

import {
  AppSlice,
  fetchCVPCardsfuture1,
  selectCVP,
  selectedFuture1CVPCard,
  updateCVPCardsfuture1,
  useDispatch,
  useSelector,
} from "@/lib/redux";
import { CVPCards } from "@/app/Interfaces";
import { Flex, Spinner, useDisclosure, useToast, Text } from "@chakra-ui/react";
import CustomerValuePropositionCanvas from "@/app/components/MicroFrameworks/Canvas/CustomerValuePropositionCanvas";
import { useParams } from "next/navigation";
import ChatBotModal from "@/app/components/MicroFrameworks/chatModal";

const ValueProposition = () => {
  const toast = useToast()
  const dispatch = useDispatch();
  const { futureId } = useParams();
  const chatModal = useDisclosure();
  const { data: CVPCards, loading, error } = useSelector(selectCVP);
  const CVPCard = useSelector(selectedFuture1CVPCard);

  const handleChatButtonPress = () => {
    // chatModal.onOpen()
    dispatch(AppSlice.actions.toggleChatModal(true))
  };

  const selectCard = (card: CVPCards) => {
    if (CVPCard && card && CVPCards?.length > 0) {
      if (!card?.locked) {
        let selectedCard: any | undefined = { ...CVPCard };
        if (selectedCard && selectedCard.id !== card.id) {
          const updatedSelectedCard = { ...selectedCard, selected: false };
          dispatch(updateCVPCardsfuture1(updatedSelectedCard)).then(
            (data: any) => {
              const updatedCard = { ...card, selected: true };
              dispatch(updateCVPCardsfuture1(updatedCard));
            }
          );
        }
      }
    }
  };

  useEffect(() => {
    if (futureId == "Future1") {
      dispatch(fetchCVPCardsfuture1());
    }
  }, []);

  return (
    <>
      {loading ? <>
        <Flex flexDirection={'column'} alignItems={'center'} justifyContent={'center'} h={'100%'} w={'100%'}>
          <Text fontSize="lg" fontWeight={"semibold"}>Fetching Future {futureId} CVP Cards</Text>
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
          <CustomerValuePropositionCanvas
            cards={CVPCards}
            handleChatButtonPress={handleChatButtonPress}
            selectCard={selectCard}
          />
          <ChatBotModal
            {...chatModal}
          />
        </>}
    </>

  );
};

export default ValueProposition;
