import React, { JSXElementConstructor, ChangeEvent } from "react";
import Slide from "@mui/material/Slide";
import Dialog from "@mui/material/Dialog";
import { useKeyPressEvent } from "react-use";
import CloseIcon from "@mui/icons-material/Close";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import { TransitionProps } from "@mui/material/transitions";
import {
    appSlice,
    selectApp,
    useDispatch,
    useSelector,
    thinkBeyondSlice,
    notificationSlice,
    selectBobMessages,
    selectedThinkBeyondCard,
} from "@/lib/redux";
import KBD from "../shared/KBD";
import { fetchPrefillData } from "@/lib/redux/slices/ApiCalls";
import { Button, DialogActions, IconButton, TextField } from "@mui/material";
import {
    useGetCompanyByIdQuery,
    useNextThinkBeyondMutation,
    usePrefillFuture1BMCMutation,
} from "@/lib/redux/Api";
import { useParams } from "next/navigation";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<unknown, JSXElementConstructor<unknown>>;
    },
    ref: React.Ref<unknown>
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ThinkBeyondModal = (props: any) => {
    const dispatch = useDispatch();
    const { projectId } = useParams();
    const {
        data: company,
        isLoading: companyLoading,
        isError: companyError,
    } = useGetCompanyByIdQuery(projectId);
    const BobMessages = useSelector(selectBobMessages);
    const [setNextCard] = useNextThinkBeyondMutation();
    const selectedCard = useSelector(selectedThinkBeyondCard);
    const [prefillFuture1BMC] = usePrefillFuture1BMCMutation();
    const { ThinkBeyondModalOpen }: any = useSelector(selectApp);

    const handleInputChange = (
        e: ChangeEvent<HTMLTextAreaElement>,
        heading: string
    ) => {
        const updatedText = e?.target?.value;
        dispatch(
            thinkBeyondSlice.actions.updateText({ heading, text: updatedText })
        );
    };

    const handleClose = () => {
        dispatch(appSlice.actions.toggleThinkBeyondModalOpen(false));
    };

    const nextCard = () => {
        if (selectedCard.cardName === "Future 1 (OKRs)") {
            dispatch(appSlice.actions.toggleThinkBeyondModalOpen(false));
            dispatch(appSlice.actions.toggleBobPrefillingOpen(true));
            setNextCard(selectedCard);
            dispatch(
                notificationSlice.actions.createNotification({
                    content: "Congratulations!! You Have Unlocked Microframeworks",
                    action: "Microframeworks",
                })
            );
            fetchPrefillData(
                "https://bobapi.i13ventures.com/v1/bmc/prefill",
                props?.prefillBody
            ).then((data: any) => {
                prefillFuture1BMC(data)
                    .unwrap()
                    .then((data) => {
                        dispatch(appSlice.actions.toggleBobPrefillingOpen(false));
                        dispatch(appSlice.actions.toggleConfirmationModalOpen(true));
                        fetch("https://bobapi.i13ventures.com/v1/bmc/sendmail", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                data: {
                                    name: "Narayana Lvsaln",
                                    project: "i13 ventures",
                                    canvas: "Business Model Canvas",
                                },
                                email: "narayana@i13ventures.com",
                            }),
                        });
                    });

                //  if ("Notification" in window) {
                //      if (Notification.permission === "granted") {
                //          const notification = new Notification("BMC Canvas Unlocked", {
                //              body: "Bob Completed Creating your canvas.",
                //              icon: "/images/i13logo.png",
                //          });
                //          notification.onclick = () => {
                //              router.push(`/Future1/BMC`)
                //          }
                //      }
                //  }
            });
        } else {
            setNextCard(selectedCard)
                .unwrap()
                .then((data) => {
                    dispatch(appSlice.actions.toggleThinkBeyondModalOpen(false));
                });
        }
    };

    useKeyPressEvent("Alt", (e: any) => {
        e.preventDefault();
        if (ThinkBeyondModalOpen) {
            addMessage();
        }
    });
    const handleAskBobHelp = () => {
        if (ThinkBeyondModalOpen) {
            addMessage();
        }
    };
    async function addMessage() {
        if (!companyLoading && !companyError) {
            const data: any = {
                cardIndex: selectedCard?.cardNumber,
                card: selectedCard?.cardInfo,
                company: {
                    ...company,
                    shared: undefined,
                    id: undefined,
                    createdAt: undefined,
                },
                bobMessages: BobMessages?.slice(
                    Math.max(BobMessages.length - 5, 0)
                ).map((message: any) => message.content),
            };

            const cardIsEmpty =
                selectedCard?.cardInfo?.reduce(
                    (acc: any, curr: any) => acc + curr.text,
                    ""
                ).length === 0 || !selectedCard;
            if (cardIsEmpty) {
                dispatch(
                    appSlice.actions.setGlobalSnackBar({
                        open: true,
                        content: "Card is Empty",
                    })
                );
                return;
            }
            dispatch(appSlice.actions.toggleBobThinking(true));
            dispatch(thinkBeyondSlice.actions.setBobMessages());
            dispatch(appSlice.actions.toggleBobOpen(true));
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
                    dispatch(
                        thinkBeyondSlice.actions.updateBobMessages(responseData?.message)
                    );
                } else {
                    dispatch(
                        appSlice.actions.setGlobalSnackBar({
                            open: true,
                            content: "Data Not Present",
                        })
                    );
                }
            } catch (error) {
                console.error("Error:", error);
                dispatch(thinkBeyondSlice.actions.removeBobMessages());
                dispatch(
                    appSlice.actions.setGlobalSnackBar({
                        open: true,
                        content: "Bob is Not Able to think",
                    })
                );
            } finally {
                dispatch(appSlice.actions.toggleBobThinking(false));
            }
        }
    }
    return (
        <>
            <Dialog
                TransitionComponent={Transition}
                keepMounted
                // fullScreen
                maxWidth={"sm"}
                fullWidth
                disableEscapeKeyDown
                open={ThinkBeyondModalOpen}
                aria-labelledby="think-beyond-modal"
                aria-describedby="think-beyond-modal-description"
            >
                <DialogTitle
                    id="project-modal-title"
                    className="flex justify-between items-center"
                >
                    {selectedCard?.cardName}
                    <IconButton size="small" onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent className="scrollbar-thin !scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                    {selectedCard?.cardInfo?.map((info: any, index: number) => {
                        return (
                            <div key={index}>
                                <p className="text-lg mt-5 mb-2">{info?.heading}</p>
                                <TextField
                                    id={`think-beyond-answer-${index}`}
                                    placeholder={info?.placeholder}
                                    multiline
                                    fullWidth
                                    value={info?.text}
                                    minRows={4}
                                    maxRows={4}
                                    onChange={(e: any) => handleInputChange(e, info.heading)}
                                />
                            </div>
                        );
                    })}
                </DialogContent>
                <DialogActions className="!px-5 !py-5">
                    <div className="flex justify-between items-end w-full">
                        <div>
                            <div className="text-xs text-neutral-500 mb-3 font-semibold">
                                Press
                                <KBD>Alt</KBD>
                                to ask Bob's Help
                            </div>
                            <Button
                                onClick={handleAskBobHelp}
                                className="!font-semibold !capitalize"
                                variant="outlined"
                            >
                                Ask Bob's Help
                            </Button>
                        </div>
                        <div>
                            <Button
                                onClick={handleClose}
                                className="!font-semibold !capitalize w-[100px] !mr-3"
                                variant="outlined"
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={nextCard}
                                className="!font-semibold !capitalize !text-white w-[100px]"
                                variant="contained"
                            >
                                Save
                            </Button>
                        </div>
                    </div>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default ThinkBeyondModal;
