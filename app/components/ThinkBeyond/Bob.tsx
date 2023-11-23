/* eslint-disable react-hooks/exhaustive-deps */
import React, { use, useEffect, useState } from "react";
import {
  Avatar,
  Flex,
  Icon,
  IconButton,
  SlideFade,
  Stack,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import { BsFillChatFill, BsFillTrashFill } from "react-icons/bs";
import { FaCog, FaQuestionCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { ThinkBeyondCards, Company } from "@/app/Interfaces";
import {
  useSelector,
  useDispatch,
  AppSlice,
  selectThinkBeyond,
  selectedThinkBeyondCard,
  fetchCompany,
  selectCompany,
  selectAltPressed,
  selectBobThinking,
  selectDarkTheme,
  ThinkBeyondReset,
} from "@/lib/redux";

const Bob = () => {
  let timer: NodeJS.Timeout;
  const {
    data: thinkBeyondCards,
    loading,
    error,
  } = useSelector(selectThinkBeyond);
  const toast = useToast();
  const router = useRouter();
  const dispatch = useDispatch()
  const company = useSelector(selectCompany);
  const darkTheme = useSelector(selectDarkTheme);
  const altPressed = useSelector(selectAltPressed);
  const bobThinking = useSelector(selectBobThinking);
  const [showBob, setShowBob] = useState<boolean>(false);
  const ThinkBeyondCard = useSelector(selectedThinkBeyondCard);
  const [messages, setMessages] = useState<string[]>([
    "Hi, I'm Bob! 👋 Start working on your ThinkBeyond Canvas and I'll gradually give you advice and suggestions!",
  ]);

  useEffect(() => {
    dispatch(fetchCompany())
  }, []);

  useEffect(() => {
    if (!altPressed) {
      clearTimeout(timer);
    }
    if (!bobThinking && altPressed) {
      timer = setTimeout(async () => {
        await addMessage();
      }, 1000);
    }
  }, [altPressed]);

  useEffect(() => {
    const el = document.getElementById(`message-${messages.length - 1}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    const el = document.getElementById("bob-thinking");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }, [bobThinking]);

  useEffect(() => {
    if (!showBob) {
      const el = document.getElementById(`message-${messages.length - 1}`);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [messages.length, showBob]);

  async function addMessage() {
    const data = {
      cardIndex: ThinkBeyondCard?.cardNumber,
      card: ThinkBeyondCard?.cardInfo,
      company,
      bobMessages: messages.slice(messages.length - 5, messages.length),
    };
    const cardIsEmpty =
      ThinkBeyondCard?.cardInfo?.reduce((acc: any, curr: any) => acc + curr.text, "")
        .length === 0 || !ThinkBeyondCard;
    const noCardsOpen =
      thinkBeyondCards?.filter((card: ThinkBeyondCards) => card.open).length === 0;
    if (cardIsEmpty) {
      toast({
        title: "Warning",
        description: "Card is Empty",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    if (noCardsOpen) {
      toast({
        title: "Warning",
        description: "No Card Selected",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    dispatch(AppSlice.actions.toggleBobThinking(true));
    try {
      const apiUrl =
        "https://bobapi.i13ventures.com/v1/think_beyond/suggestion";
      if (data) {
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const responseData = await response.json();
        setMessages([...messages, responseData?.message]);
      } else {
        toast({
          title: "Error",
          description: "Something went wrong. Please try again later.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again later.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      dispatch(AppSlice.actions.toggleAltPressed(false))
      dispatch(AppSlice.actions.toggleBobThinking(false))
    }
  }
  function resetCanvas() {
    // localStorage.removeItem("currentFuture");
    // removeCompany();
    // for (let i = 0; i < thinkBeyondCards.length; i++) {
    //   localStorage.removeItem(`card-${i}`);
    // }
    // Redirect to home page
    // router.push("/");
    dispatch(ThinkBeyondReset())
  }
  return (
    <>
      <Flex
        position="absolute"
        bottom="0"
        right="0"
        mb="8%"
        h="100%"
        w="100%"
        maxW="300px"
        borderRadius="20px"
        direction="column"
        justifyContent="flex-end"
        zIndex={showBob ? 1000 : 100}
        transition="all 0.5s ease"
      >
        <Flex
          direction="column-reverse"
          p={4}
          position="absolute"
          w="100%"
          h="85%"
          sx={{
            "&::-webkit-scrollbar": {
              width: "6px", // Change this value to set the width of the scroll bar
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "#F0F0F0",
            },
            "&::-webkit-scrollbar-thumb": {
              rounded: "full",
              backgroundColor: darkTheme ? "#2C5282" : "green",
            },
          }}
          overflowY={showBob ? "scroll" : "hidden"}
        >
          <Stack h="100%" justifyContent="end">
            {messages?.map((message, index) => (
              <SlideFade key={index} in={true} offsetY="20px">
                <Flex
                  id={`message-${index}`}
                  bg={darkTheme ? "blue.900" : "gray.100"}
                  borderRadius="20px"
                  p="20px"
                  mb="10px"
                  color={darkTheme ? "white" : "black"}
                  alignItems="center"
                  justifyContent="center"
                  // Visibility on only the last 5 messages
                  visibility={
                    index < messages.length - 5 && !showBob
                      ? "hidden"
                      : "visible"
                  }
                  // Pulse animation on only the last message for 5 seconds
                  style={{
                    animationName:
                      index === messages.length - 1 ? "pulse" : "none",
                    animationDuration: "1s",
                    animationIterationCount: "3",
                  }}
                >
                  {message}
                </Flex>
              </SlideFade>
            ))}
            {bobThinking && (
              <SlideFade in={true} offsetY="20px">
                <Flex
                  id="bob-thinking"
                  bg={darkTheme ? "blue.900" : "white"}
                  borderRadius="20px"
                  p="20px"
                  mb="10px"
                  alignItems="center"
                  justifyContent="center"
                  // Pulse animation
                  animation="pulse 1s infinite"
                >
                  <div className="typing__dot"></div>
                  <div className="typing__dot"></div>
                  <div className="typing__dot"></div>
                </Flex>
              </SlideFade>
            )}
          </Stack>
        </Flex>
      </Flex>
      <Flex
        position="absolute"
        bottom="0"
        right="0"
        mb="2.5%"
        mr={showBob ? "18%" : "2%"}
        transition="all 0.5s ease"
        zIndex={9999}
      >
        <Tooltip
          label="Reset Canvas"
          aria-label="Reset Canvas"
          placement="top"
          hasArrow
        >
          <IconButton
            icon={<Icon as={BsFillTrashFill} />}
            aria-label="Reset Canvas"
            size={"sm"}
            mx={2}
            colorScheme="green"
            onClick={resetCanvas}
          ></IconButton>
        </Tooltip>
      </Flex>
      <Flex
        position="absolute"
        bottom="0"
        right="0"
        mb="2.5%"
        mr={showBob ? "14%" : "2%"}
        transition="all 0.5s ease"
        zIndex={9999}
      >
        <Tooltip
          label="Speak to Bob"
          aria-label="Speak to Bob"
          placement="top"
          hasArrow
        >
          <IconButton
            icon={<Icon as={BsFillChatFill} />}
            aria-label="Chat with Bob"
            size={"sm"}
            mx={2}
            colorScheme="green"
          ></IconButton>
        </Tooltip>
      </Flex>
      <Flex
        position="absolute"
        bottom="0"
        right="0"
        mb="2.5%"
        mr={showBob ? "10%" : "2%"}
        transition="all 0.5s ease"
        zIndex={9999}
      >
        <Tooltip label="Help" aria-label="Help" placement="top" hasArrow>
          <IconButton
            icon={<Icon as={FaQuestionCircle} />}
            aria-label="Help"
            size={"sm"}
            mx={2}
            colorScheme="green"
          ></IconButton>
        </Tooltip>
      </Flex>
      <Flex
        position="absolute"
        bottom="0"
        right="0"
        mb="2.5%"
        mr={showBob ? "6%" : "2%"}
        transition="all 0.5s ease"
        zIndex={9999}
      >
        <Tooltip
          label="Settings"
          aria-label="Settings"
          placement="top"
          hasArrow
        >
          <IconButton
            icon={<Icon as={FaCog} />}
            aria-label="Settings"
            size={"sm"}
            mx={2}
            colorScheme="green"
          ></IconButton>
        </Tooltip>
      </Flex>
      <Flex
        position="absolute"
        bottom="0"
        right="0"
        mr="2%"
        mb="2%"
        zIndex={10000}
      >
        <Tooltip
          label="See all messages"
          aria-label="See all messages"
          placement="top"
          hasArrow
        >
          <IconButton
            icon={<Avatar src="images/bob.png" boxShadow={"lg"} />}
            aria-label="Chat with Bob"
            size={"lg"}
            variant={"ghost"}
            onClick={() => setShowBob(!showBob)}
            // Different color if all messages are shown
            _hover={{ bg: darkTheme ? "blue.900" : "green" }}
            bg="transparent"
          />
        </Tooltip>
      </Flex>
    </>
  );
};


export default Bob
