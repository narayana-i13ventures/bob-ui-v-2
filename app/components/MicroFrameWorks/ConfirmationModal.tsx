"use client";
import React, { JSXElementConstructor } from "react";
import Slide from "@mui/material/Slide";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { TransitionProps } from "@mui/material/transitions";
import {
    Button,
    DialogActions,
    DialogTitle,
    Divider,
    useTheme,
} from "@mui/material";
import {
    appSlice,
    notificationSlice,
    selectApp,
    selectCVPPrefillBody,
    selectFuture1BMCCompleted,
    useDispatch,
    useSelector,
} from "@/lib/redux";
import { useSession } from "next-auth/react";
import { fetchPrefillData } from "@/lib/redux/slices/ApiCalls";
import { usePathname, useRouter } from "next/navigation";
import { usePrefillFuture1CVPMutation } from "@/lib/redux/Api";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<unknown, JSXElementConstructor<unknown>>;
    },
    ref: React.Ref<unknown>
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ConfirmationModal = () => {
    const router = useRouter();
    const theme: any = useTheme();
    const { data } = useSession();
    const dispatch = useDispatch();
    const pathName = usePathname();
    const [prefillFuture1CVP] = usePrefillFuture1CVPMutation();
    const CVPPrefillData = useSelector(selectCVPPrefillBody);
    const canvasCompleted = useSelector(selectFuture1BMCCompleted);

    const { confirmationModalOpen }: { confirmationModalOpen: any } =
        useSelector(selectApp);

    const handleClose = () => {
        dispatch(appSlice.actions.toggleConfirmationModalOpen(false));
    };

    const fetchNextCanvas = () => {
        if (canvasCompleted) {
            if (pathName.includes("/Future1/BMC")) {
                if (!!CVPPrefillData) {
                    dispatch(appSlice.actions.toggleConfirmationModalOpen(false));
                    dispatch(appSlice.actions.toggleBobPrefillingOpen(true));
                    fetchPrefillData(
                        "https://bobapi.i13ventures.com/v1/value/prefill",
                        CVPPrefillData
                    ).then((data: any) => {
                        prefillFuture1CVP(data).unwrap().then((data: any) => {
                            router.push('CVP')
                            dispatch(
                                notificationSlice.actions.createNotification({
                                    content: "Congratulations!! You Have Unlocked Customer Value Proposition Canvas",
                                    action: "CVP",
                                })
                            );
                            dispatch(appSlice.actions.toggleBobPrefillingOpen(false));
                        })
                    });
                }
            } else if (pathName.includes("/Future2/BMC")) {
                // setSelectedCard(Future2BMCCard);
            } else if (pathName.includes("/Future3/BMC")) {
                // setSelectedCard(Future3BMCCard);
            } else if (pathName.includes("/Future1/CVP")) {
                // setSelectedCard(Future1CVPCard);
            }
        }
    };

    return (
        <>
            <Dialog
                className="select-none"
                TransitionComponent={Transition}
                keepMounted
                // fullScreen
                maxWidth={"sm"}
                fullWidth
                disableEscapeKeyDown
                open={confirmationModalOpen}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle
                    id="project-modal-title"
                    className="flex justify-between items-center"
                >
                    {"Message From Bob"}
                </DialogTitle>
                <Divider />
                <DialogContent className="!overflow-hidden">
                    <div className="relative flex justify-center items-center w-full">
                        <img
                            src="/images/bob.png"
                            className="max-w-full w-[100px] my-8"
                            alt="bob"
                        />
                        <div className="absolute top-1/3 left-1/2 translate-x-[40px] -translate-y-[30px] flex justify-center items-center p-1 border-2 border-primary rounded-t-md rounded-e-md">
                            <div className="animate-bounce w-2 h-2 rounded-full bg-primary"></div>
                            <div className="animate-bounce delay-200 w-2 h-2 rounded-full bg-primary mx-2"></div>
                            <div className="animate-bounce delay-500 w-2 h-2 rounded-full bg-primary"></div>
                        </div>
                    </div>
                    <p className="text-lg">
                        Hello {data?.user?.name} I have created your Business Model Canvas
                        Based on your details. You can continue editing this canvas or got
                        to next canvas.
                    </p>
                </DialogContent>
                <Divider />
                <DialogActions>
                    <div className="flex justify-between items-center w-full p-3">
                        <Button
                            onClick={handleClose}
                            variant="outlined"
                            className="!capitalize !font-semibold"
                        >
                            Continue
                        </Button>
                        <Button
                            onClick={fetchNextCanvas}
                            variant="contained"
                            className="!text-white !capitalize !font-semibold"
                        >
                            Go To Next Canvas
                        </Button>
                    </div>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default ConfirmationModal;
