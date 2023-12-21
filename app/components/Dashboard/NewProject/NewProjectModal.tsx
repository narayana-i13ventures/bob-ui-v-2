"use client";
import React, { JSXElementConstructor } from "react";
import Slide from "@mui/material/Slide";
import Dialog from "@mui/material/Dialog";
import { IconButton } from "@mui/material";
import ProjectStages from "./ProjectStages";
import CloseIcon from '@mui/icons-material/Close';
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import { TransitionProps } from "@mui/material/transitions";
import { appSlice, selectApp, useDispatch, useSelector } from "@/lib/redux";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<unknown, JSXElementConstructor<unknown>>;
    },
    ref: React.Ref<unknown>
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const NewProjectModal = () => {
    const dispatch = useDispatch();
    const { NewProjectModal }: { NewProjectModal: any } = useSelector(selectApp);
    const handleClose = () => {
        dispatch(appSlice.actions.toggleNewProjectModal(false));
    };
    return (
        <>
            <Dialog
                TransitionComponent={Transition}
                keepMounted
                // fullScreen
                maxWidth={"sm"}
                fullWidth
                disableEscapeKeyDown
                open={NewProjectModal}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="project-modal-title" className="flex justify-between items-center">
                    {"Create New Project"}
                    <IconButton size="small" onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <ProjectStages />
                </DialogContent>
            </Dialog>
        </>
    );
};

export default NewProjectModal;
