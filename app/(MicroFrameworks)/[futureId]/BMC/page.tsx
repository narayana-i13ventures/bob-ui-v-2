/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useState } from "react";
import {
  useSelector,
  useDispatch,
  selectBMCFuture1,
  selectedFuture1BMCCard,
  updateBMCCardsfuture1,
  fetchBMCCardsfuture1,
  Future1BMCNextCard,
  menuSlice,
  Future1CVPPrefill,
  fetchBMCCardsfuture2,
  Future3BMCNextCard,
  Future2BMCNextCard,
  updateBMCCardsfuture2,
  updateBMCCardsfuture3,
  fetchBMCCardsfuture3,
  selectBMCFuture3,
  selectBMCFuture2,
  selectedFuture3BMCCard,
  selectedFuture2BMCCard,
  AppSlice,
  selectChatBotModal,
} from "@/lib/redux";
import {
  Flex,
  useDisclosure,
  Text,
  useMediaQuery,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import BuisnessModelCanvas from "@/app/components/MicroFrameworks/Canvas/BusinessModelCanvas";
import { useParams, useRouter } from "next/navigation";
import ChatBotModal from "@/app/components/MicroFrameworks/chatModal";
import { fetchPrefillData } from "@/lib/redux/apiCalls";
import MessageModal from "@/app/components/MessageModal";
import addNotification from 'react-push-notification';

const BMCCanvas = () => {
  const toast = useToast()
  const dispatch = useDispatch();
  const router = useRouter()
  const { futureId } = useParams();
  const chatModal = useDisclosure();
  const [body, setBody] = useState({});
  const Future1Data = useSelector(selectBMCFuture1);
  const Future2Data = useSelector(selectBMCFuture2);
  const Future3Data = useSelector(selectBMCFuture3);
  const Future1BMCCard = useSelector(selectedFuture1BMCCard);
  const Future2BMCCard = useSelector(selectedFuture2BMCCard);
  const Future3BMCCard = useSelector(selectedFuture3BMCCard);
  const [BMCCard, setBMCCard] = useState<any>({});
  const [{ data: BMCCards, loading = true, error }, setData] = useState<any>({})
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  const url = "https://bobapi.i13ventures.com/v1/value/prefill";

  useEffect(() => {
    if (futureId === "Future1") {
      setData(Future1Data);
      setBMCCard(Future1BMCCard);
    } else if (futureId === "Future2") {
      setData(Future2Data);
      setBMCCard(Future2BMCCard);
    } else if (futureId === "Future3") {
      setData(Future3Data);
      setBMCCard(Future3BMCCard);
    } else {
      setData({});
    }
    return () => {
      setData({});
      setBMCCard({})
    };
  }, [futureId, Future1Data, Future2Data, Future3Data, Future1BMCCard, Future2BMCCard, Future3BMCCard]);


  useEffect(() => {
    if (Array.isArray(BMCCards)) {
      const cardsArray = Object.values(BMCCards);
      const data = cardsArray.reduce((result: any, card: any) => {
        const cardName: any = card?.cardName;
        const keyPoints = card?.keyPoints;

        if (cardName) {
          result[cardName] = {
            details: keyPoints
              .split("--")
              .filter((value: any) => value.trim() !== ""),
          };
        }

        return result;
      }, {});
      const response = {
        bmc: { ...data },
      };
      setBody(response);
    }
  }, [BMCCards]);

  useEffect(() => {
    if (futureId == "Future1") {
      dispatch(fetchBMCCardsfuture1());
    }
    if (futureId == "Future2") {
      dispatch(fetchBMCCardsfuture2());
    }
    if (futureId == "Future3") {
      dispatch(fetchBMCCardsfuture3());
    }
  }, []);

  function nextCard(card: any) {
    // chatModal.onClose()
    dispatch(AppSlice.actions.toggleChatModal(false))
    if (card.cardName === 'Revenue Streams') {
      dispatch(AppSlice.actions.toggleMessageModal(true))
      if (futureId == "Future1") {
        fetchPrefillData(url, body)
          .then((data) => {
            dispatch(Future1CVPPrefill(data))
              .then((data) => {
                dispatch(AppSlice.actions.toggleMessageModal(false))
                dispatch(menuSlice.actions.toggleCanvasLocked({ canvasName: 'Value Proposisition Canvas', value: false }))
                if ("Notification" in window) {
                  if (Notification.permission === "granted") {
                    const notification = new Notification("CVP Canvas Unlocked", {
                      body: "Bob Completed Creating your canvas.",
                      icon: "/images/i13logo.png",
                    });
                    notification.onclick = () => {
                      router.push(`/Future1/CVP`)
                    }
                  }
                }
                toast({
                  title: "🚀Value Proposition Canvas Unlocked🚀",
                  description: "You have unlocked the Value Proposition Canvas.",
                  status: "success",
                  duration: 3000,
                  isClosable: true,
                  position: 'top-right'
                });
              })
          })
      }
    } else {
      if (futureId == "Future1") {
        dispatch(Future1BMCNextCard(card?.id))
      }
      if (futureId == "Future2") {
        dispatch(Future2BMCNextCard(card?.id))
      }
      if (futureId == "Future3") {
        dispatch(Future3BMCNextCard(card?.id))
      }
    }
  }

  const selectCard = (card: any) => {
    if (BMCCard && card && BMCCards?.length > 0) {
      if (!card?.locked) {
        let selectedCard: any | undefined = { ...BMCCard };
        if (selectedCard && selectedCard.id !== card.id) {
          const updatedSelectedCard = { ...selectedCard, selected: false };
          if (futureId == "Future1") {
            dispatch(updateBMCCardsfuture1(updatedSelectedCard)).then(
              (data: any) => {
                const updatedCard = { ...card, selected: true };
                dispatch(updateBMCCardsfuture1(updatedCard));
              }
            );
          }
          if (futureId == "Future2") {
            dispatch(updateBMCCardsfuture2(updatedSelectedCard)).then(
              (data: any) => {
                const updatedCard = { ...card, selected: true };
                dispatch(updateBMCCardsfuture2(updatedCard));
              }
            );
          }
          if (futureId == "Future3") {
            dispatch(updateBMCCardsfuture3(updatedSelectedCard)).then(
              (data: any) => {
                const updatedCard = { ...card, selected: true };
                dispatch(updateBMCCardsfuture3(updatedCard));
              }
            );
          }
        }
      }
    }
  };

  const handleChatButtonPress = () => {
    // chatModal.onOpen();
    dispatch(AppSlice.actions.toggleChatModal(true))
  };


  return (
    <>
      {loading ? <>
        <Flex flexDirection={'column'} alignItems={'center'} justifyContent={'center'} h={'100%'} w={'100%'}>
          <Text fontSize="lg" fontWeight={"semibold"}>Fetching Future {futureId} BMC Cards</Text>
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

          <BuisnessModelCanvas
            cards={BMCCards}
            handleChatButtonPress={handleChatButtonPress}
            selectCard={selectCard}
          />
          <ChatBotModal
            {...chatModal}
            nextCard={nextCard} />
          <MessageModal />
        </>
      }
    </>
  );
};

export default BMCCanvas;
