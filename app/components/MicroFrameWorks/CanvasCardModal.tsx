"use client";
import React, { JSXElementConstructor, useState, useEffect } from "react";
import CommentBox from "./CommentBox";
import Slide from "@mui/material/Slide";
import Dialog from "@mui/material/Dialog";
import MessageBox from "../shared/Bob/MessageBox";
import CloseIcon from "@mui/icons-material/Close";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import { useParams, usePathname, useRouter } from "next/navigation";
import { TransitionProps } from "@mui/material/transitions";
import {
    Future1BMCSlice,
    Future1CVPSlice,
    appSlice,
    notificationSlice,
    selectApp,
    selectCVPPrefillBody,
    selectedFuture1BMC,
    selectedFuture1CVP,
    selectedFuture1Empathy,
    useDispatch,
    useSelector,
} from "@/lib/redux";
import {
    apiSlice,
    useGetThinkBeyondQuery,
    useNextFuture1BMCMutation,
    usePrefillFuture1CVPMutation,
    useUpdateFuture1BMCMutation,
    useUpdateFuture1CVPMutation,
} from "@/lib/redux/Api";
import {
    Button,
    CircularProgress,
    DialogActions,
    Divider,
    IconButton,
    useTheme,
} from "@mui/material";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import { fetchPrefillData } from "@/lib/redux/slices/ApiCalls";
import { fetchEventSource } from "@microsoft/fetch-event-source";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<unknown, JSXElementConstructor<unknown>>;
    },
    ref: React.Ref<unknown>
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const CanvasCardModal = () => {
    const router = useRouter();
    const theme: any = useTheme();
    const dispatch = useDispatch();
    const pathName = usePathname();
    const { futureId } = useParams();
    const { bobThinking } = useSelector(selectApp);
    const [
        nextFuture1BMC,
        {
            isLoading: nextFuture1BMCLoading
        }
    ] = useNextFuture1BMCMutation();
    const Future1BMCCard = useSelector(selectedFuture1BMC);
    const Future1CVPCard = useSelector(selectedFuture1CVP);
    const Future1EmpathyCard = useSelector(selectedFuture1Empathy);
    const [activeBubble, setActiveBubble] = useState("bob");
    const [updateFuture1BMC] = useUpdateFuture1BMCMutation();
    const [updateFuture1CVP] = useUpdateFuture1CVPMutation();
    const CVPPrefillData = useSelector(selectCVPPrefillBody);
    const [prefillFuture1CVP] = usePrefillFuture1CVPMutation();
    const [selectedCard, setSelectedCard] = useState<any>(null);
    const { data: ThinkBeyondCards } = useGetThinkBeyondQuery({});

    const { CanvasCardModalOpen }: any = useSelector(selectApp);

    const currentFuture =
        futureId === "Future1"
            ? 1
            : futureId === "Future2"
                ? 2
                : futureId === "Future3"
                    ? 3
                    : null;

    useEffect(() => {
        if (pathName.includes("/Future1/BMC")) {
            setSelectedCard(Future1BMCCard);
        } else if (pathName.includes("/Future2/BMC")) {
            // setSelectedCard(Future2BMCCard);
        } else if (pathName.includes("/Future3/BMC")) {
            // setSelectedCard(Future3BMCCard);
        } else if (pathName.includes("/Future1/CVP")) {
            setSelectedCard(Future1CVPCard);
        } else if (pathName.includes("/Future1/Empathy")) {
            setSelectedCard(Future1EmpathyCard);
        } else {
            setSelectedCard(null);
        }
        return () => {
            setSelectedCard(null);
        };
    }, [pathName, Future1BMCCard, Future1CVPCard, Future1EmpathyCard]);

    useEffect(() => {
        if (selectedCard) {
            const updatedCard = { ...selectedCard };
            if (CanvasCardModalOpen) {
                if (updatedCard?.chat?.length === 0) {
                    updatedCard.chat = [
                        {
                            role: "system",
                            content: `You are Bob, a helpful and experienced business advisor, and i13 venture builder, that is helping someone put together their ${selectedCard?.cardCanvas}. You work for i13. You are currently talking about ${selectedCard?.cardName}! Your questions should only relate to ${selectedCard?.cardName}. Never ask about any other sections of the business model canvas except for the one you are currently working on. This is very important. You are asking the user questions to help them build a good ${selectedCard?.cardName} section. Engage in the conversation until you have helped the user piece together a good ${selectedCard?.cardName} section. The user will always end their latest message with information about their business. Keep this in mind and try to use that information in your responses. Only ever ask 1 question at a time. Once you have asked enough questions, you have enough information for this section or you are ready to move on to the next section, respond with exactly the following: "That's all my questions now; it's your turn to ask me anything!" and nothing else.`,
                        },
                    ];
                    updatedCard.chat = [
                        ...updatedCard.chat,
                        {
                            role: "user",
                            content: `Hi Bob, I am starting a new company and I am trying to figure out my ${selectedCard?.cardName}!`,
                        },
                    ];
                    if (pathName.includes("/Future1/BMC")) {
                        updateFuture1BMC(updatedCard).then(({ data }: any) => {
                            streamResponse(data, false, false);
                        });
                    } else if (pathName.includes("/Future2/BMC")) {
                        // dispatch(updateBMCCardsfuture2(updatedCard))
                        //     .then((data: any) => {
                        //         streamResponse(data?.payload);
                        //     });
                    } else if (pathName.includes("/Future3/BMC")) {
                        // dispatch(updateBMCCardsfuture3(updatedCard))
                        //     .then((data: any) => {
                        //         streamResponse(data?.payload);
                        //     });
                    } else if (pathName.includes("/Future1/CVP")) {
                        updateFuture1CVP(updatedCard).then(({ data }: any) => {
                            streamResponse(data, false, false);
                        });
                    }
                }
            }
        }
    }, [CanvasCardModalOpen, dispatch, selectedCard, pathName]);

    const handleClose = () => {
        dispatch(appSlice.actions.toggleCanvasCardModal(false));
        setActiveBubble("bob");
    };

    const handleSetActiveBubble = (bubbleName: any) => {
        setActiveBubble(bubbleName);
    };

    const getFutureData = () => {
        if (ThinkBeyondCards && ThinkBeyondCards?.length > 0) {
            const change = ThinkBeyondCards?.[0];
            const moonshot = ThinkBeyondCards?.[1];
            let future,
                okrs = null;

            switch (currentFuture) {
                case 1:
                    future = ThinkBeyondCards?.[2];
                    okrs = ThinkBeyondCards?.[3];
                    break;
                case 2:
                    future = ThinkBeyondCards?.[5];
                    okrs = ThinkBeyondCards?.[6];
                    break;
                case 3:
                    future = ThinkBeyondCards?.[8];
                    okrs = ThinkBeyondCards?.[9];
                    break;
                default:
                    break;
            }

            if (
                future === null ||
                okrs === null ||
                change === null ||
                moonshot === null
            ) {
                return null;
            } else {
                const changeData = `${change?.cardInfo?.[0]?.heading}:\n${change?.cardInfo?.[0]?.text}`;
                const moonshotData = `${moonshot?.cardInfo?.[0]?.heading}:\n${moonshot?.cardInfo?.[0]?.text}`;
                const futureData = future?.cardInfo
                    ?.map((item: any) => `${item?.heading}:\n${item?.text}`)
                    .join("\n");
                const okrsData = okrs?.cardInfo
                    ?.map((item: any) => `${item?.heading}:\n${item?.text}`)
                    .join("\n");
                if (changeData && moonshotData && futureData && okrsData) {
                    const result = {
                        change: changeData,
                        moonshot: moonshotData,
                        future: `Future ${currentFuture}:\n${futureData}`,
                        okrs: `OKRs:\n${okrsData}`,
                    };
                    return result;
                }
            }
        }
        return null;
    };

    const userMessage = (message: any) => {
        if (selectedCard !== undefined) {
            const updatedCard: any = { ...selectedCard };
            if (message === "" || bobThinking) {
                return;
            }
            if (!updatedCard.chat) {
                updatedCard.chat = [];
            }
            updatedCard.chat = [
                ...updatedCard.chat,
                { role: "user", content: message },
            ];
            if (pathName.includes("/Future1/BMC")) {
                updateFuture1BMC(updatedCard)
                    .unwrap()
                    .then((data) => {
                        streamResponse(data, false, false);
                    });
            } else if (pathName.includes("/Future1/CVP")) {
                updateFuture1CVP(updatedCard)
                    .unwrap()
                    .then((data) => {
                        streamResponse(data, false, false);
                    });
            }
        }
    };

    const generateKeypoints = (next: any) => {
        const ResponseCard: any = { ...selectedCard };
        ResponseCard.loadingKeyPoints = true;
        ResponseCard.keyPoints = "";
        if (pathName.includes("/Future1/BMC")) {
            updateFuture1BMC(ResponseCard)
                .unwrap()
                .then((data: any) => {
                    streamResponse(data, true, next);
                });
        } else if (pathName.includes("/Future1/CVP")) {
            updateFuture1CVP(ResponseCard)
                .unwrap()
                .then((data: any) => {
                    streamResponse(data, true, next);
                });
        }
    };

    const streamResponse = async (card: any, keypoints = false, next: any) => {
        const ResponseCard: any = { ...card };
        let endpoint = "keypoints";
        let streamBody: any = {
            chat: ResponseCard?.chat,
            prefill: ResponseCard?.keyPoints,
            cardName: ResponseCard?.cardName,
            card_canvas: ResponseCard?.cardCanvas,
        };
        if (!!card) {
            if (!keypoints) {
                (streamBody = {
                    futureData: getFutureData(),
                    chat: ResponseCard?.chat,
                }),
                    (ResponseCard.chat = [
                        ...(ResponseCard?.chat || []),
                        { role: "assistant", content: "" },
                    ]);
                if (pathName.includes("/Future1/BMC")) {
                    dispatch(Future1BMCSlice.actions.updateSingleById(ResponseCard));
                } else if (pathName.includes("/Future1/CVP")) {
                    dispatch(Future1CVPSlice.actions.updateSingleById(ResponseCard));
                }
                endpoint = "message";
            }
            dispatch(appSlice.actions.toggleBobThinking(true));
            const ctrl = new AbortController();
            const baseUrl = "https://bobapi.i13ventures.com/v1";
            let apiUrl = `${baseUrl}/bmc`;
            if (pathName.includes("/Future1/CVP")) {
                apiUrl = `${baseUrl}/value`;
            }
            await fetchEventSource(`${apiUrl}/${endpoint}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(streamBody),
                signal: ctrl.signal,
                onopen: async function (response: Response) {
                    console.log("Connection opened");
                    return Promise.resolve();
                },
                onmessage: function (res: any) {
                    const { data, type } = res;
                    if (!!data) {
                        const { suggestion } = JSON.parse(data);
                        if (suggestion === "") return;
                        if (keypoints) {
                            ResponseCard.loadingKeyPoints = false;
                            ResponseCard.keyPoints = ResponseCard.keyPoints + suggestion;
                            if (pathName.includes("/Future1/BMC")) {
                                dispatch(Future1BMCSlice.actions.updateKeyPoints(suggestion));
                                dispatch(
                                    apiSlice.util.updateQueryData(
                                        "getFuture1BMC",
                                        {},
                                        (draft: any) => {
                                            return draft.map((card: any) => {
                                                if (card.id === ResponseCard?.id) {
                                                    return {
                                                        ...card,
                                                        keyPoints: card.keyPoints + suggestion,
                                                    };
                                                } else {
                                                    return card;
                                                }
                                            });
                                        }
                                    )
                                );
                            } else if (pathName.includes("/Future1/CVP")) {
                                dispatch(Future1CVPSlice.actions.updateKeyPoints(suggestion));
                                dispatch(
                                    apiSlice.util.updateQueryData(
                                        "getFuture1CVP",
                                        {},
                                        (draft: any) => {
                                            return draft.map((card: any) => {
                                                if (card.id === ResponseCard?.id) {
                                                    return {
                                                        ...card,
                                                        keyPoints: card.keyPoints + suggestion,
                                                    };
                                                } else {
                                                    return card;
                                                }
                                            });
                                        }
                                    )
                                );
                            }
                        } else {
                            ResponseCard.chat = [...ResponseCard.chat];
                            const lastMessage = {
                                ...ResponseCard?.chat?.[ResponseCard.chat.length - 1],
                            };
                            lastMessage.content = lastMessage.content + suggestion;
                            ResponseCard.chat[ResponseCard.chat.length - 1] = lastMessage;
                            if (pathName.includes("/Future1/BMC")) {
                                dispatch(Future1BMCSlice.actions.updateChat(suggestion));
                            } else if (pathName.includes("/Future1/CVP")) {
                                dispatch(Future1CVPSlice.actions.updateChat(suggestion));
                            }
                        }
                    }
                },
                onerror: function (error: any) {
                    // handleSSEError(error)
                    ctrl.abort();
                    if (keypoints) {
                        ResponseCard.loadingKeyPoints = false;
                        if (pathName.includes("/Future1/BMC")) {
                            updateFuture1BMC(ResponseCard)
                                .unwrap()
                                .then((data) => {
                                    dispatch(appSlice.actions.toggleBobThinking(false));
                                });
                        } else if (pathName.includes("/Future1/CVP")) {
                            updateFuture1CVP(ResponseCard)
                                .unwrap()
                                .then((data) => {
                                    dispatch(appSlice.actions.toggleBobThinking(false));
                                });
                        }
                    }
                },
                onclose: function () {
                    console.log("connection closed");
                    if (pathName.includes("/Future1/BMC")) {
                        updateFuture1BMC(ResponseCard)
                            .unwrap()
                            .then((data: any) => {
                                dispatch(appSlice.actions.toggleBobThinking(false));
                                if (next && ResponseCard?.cardName !== "Revenue Streams") {
                                    // dispatch(appSlice.actions.toggleCanvasCardModal(false));
                                    nextFuture1BMC(ResponseCard);
                                } else if (
                                    next &&
                                    ResponseCard?.cardName === "Revenue Streams"
                                ) {
                                    fetchPrefillData(
                                        "https://bobapi.i13ventures.com/v1/value/prefill",
                                        CVPPrefillData
                                    ).then((data: any) => {
                                        console.log(data);
                                        prefillFuture1CVP(data)
                                            .unwrap()
                                            .then((data: any) => {
                                                router.push("CVP");
                                                dispatch(
                                                    notificationSlice.actions.createNotification({
                                                        content:
                                                            "Congratulations!! You Have Unlocked Customer Value Proposition Canvas",
                                                        action: "Microframeworks",
                                                    })
                                                );
                                                dispatch(
                                                    appSlice.actions.toggleBobPrefillingOpen(false)
                                                );
                                            });
                                    });
                                }
                            });
                    } else if (pathName.includes("/Future1/CVP")) {
                        updateFuture1CVP(ResponseCard)
                            .unwrap()
                            .then((data: any) => {
                                dispatch(appSlice.actions.toggleBobThinking(false));
                            });
                    }
                },
            });
        }
    };

    return (
        <>
            <Dialog
                className="select-none"
                TransitionComponent={Transition}
                keepMounted
                // fullScreen
                maxWidth={"md"}
                fullWidth
                disableEscapeKeyDown
                open={CanvasCardModalOpen}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                PaperProps={{
                    className: "",
                }}
            >
                {nextFuture1BMCLoading ? (
                    <>
                        <div className="w-full min-h-[75vh] flex justify-center items-center">
                            <CircularProgress />
                        </div>
                    </>
                ) : (
                    <>
                        <DialogTitle
                            id="project-modal-title"
                            className="flex justify-between items-center"
                        >
                            {selectedCard?.cardName}
                            <IconButton size="small" onClick={handleClose}>
                                <CloseIcon />
                            </IconButton>
                        </DialogTitle>
                        <Divider />
                        <DialogContent className="!min-h-[70vh] !overflow-hidden">
                            <div className="flex justify-center items-start">
                                <div className="w-1/2 px-4 py-1 h-[65vh] overflow-y-auto scrollbar-thin !scrollbar-thumb-gray-300 scrollbar-track-gray-100 ">
                                    {selectedCard?.loadingKeyPoints ? (
                                        <div className="flex justify-center items-center grow w-full py-6">
                                            <CircularProgress />
                                        </div>
                                    ) : selectedCard?.keyPoints === "" ? (
                                        <div className="flex justify-center items-center grow w-full">
                                            <p>No Information Available</p>
                                        </div>
                                    ) : (
                                        <div className="flex justify-start items-start w-full grow">
                                            <ul className="list-disc pl-5 text-sm">
                                                {selectedCard?.keyPoints
                                                    ?.split("--")
                                                    .filter((keypoint: any) => keypoint !== "")
                                                    .map((keypoint: any, index: any) => (
                                                        <li className="my-2" key={index}>
                                                            {keypoint}
                                                        </li>
                                                    ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                                <Divider orientation="vertical" className="!mx-2 h-full" />
                                <div className="w-1/2 flex justify-start items-start">
                                    <div className="relative w-5/6 h-[65vh] border-primary border-0 rounded-md mr-2">
                                        {activeBubble === "bob" && (
                                            <MessageBox
                                                sendMessage={userMessage}
                                                messages={selectedCard?.chat}
                                                className="w-full"
                                                arrow={false}
                                                header={false}
                                                height={1000}
                                            />
                                        )}
                                        {activeBubble === "comments" && (
                                            <CommentBox className="w-full" height={1000} />
                                        )}
                                    </div>
                                    <div className="w-1/6 flex justify-start items-center flex-col h-[65vh] rounded-lg border-primary border-2 py-3">
                                        <IconButton
                                            disableRipple
                                            onClick={() => handleSetActiveBubble("bob")}
                                            className={`${activeBubble === "bob" &&
                                                "shadow-primary shadow-sm scale-110"
                                                } transition-all ease-in duration-100 !p-0 !mb-3`}
                                        >
                                            <img
                                                src={"/images/bob.png"}
                                                className="max-w-full w-10"
                                            />
                                        </IconButton>
                                        <IconButton
                                            disableRipple
                                            onClick={() => handleSetActiveBubble("comments")}
                                            className={`${activeBubble === "comments" &&
                                                "shadow-primary shadow-sm scale-110"
                                                } transition-all ease-in duration-100 !mb-3`}
                                            sx={{
                                                backgroundColor: theme.palette.primary.main,
                                                "&:hover": {
                                                    backgroundColor: theme.palette.primary.dark,
                                                },
                                            }}
                                        >
                                            <ChatBubbleIcon className="!text-white" />
                                        </IconButton>
                                    </div>
                                </div>
                            </div>
                        </DialogContent>
                        <Divider />
                        <DialogActions>
                            <div className="flex justify-end items-center px-3">
                                {!pathName.includes("/Future1/CVP") && (
                                    <Button
                                        onClick={() => generateKeypoints(true)}
                                        variant="outlined"
                                        className="!font-semibold !capitalize !mr-3"
                                    >
                                        {selectedCard?.cardName !== "Revenue Streams"
                                            ? "Next Card"
                                            : "Load Next Canvas"}
                                    </Button>
                                )}
                                <Button
                                    onClick={() => generateKeypoints(false)}
                                    variant="contained"
                                    className="!text-white !font-semibold !capitalize"
                                >
                                    Load Keypoints
                                </Button>
                            </div>
                        </DialogActions>
                    </>
                )}
            </Dialog>
        </>
    );
};

export default CanvasCardModal;
