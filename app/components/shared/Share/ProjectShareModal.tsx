"use client";
import React, { JSXElementConstructor } from "react";
import Slide from "@mui/material/Slide";
import Dialog from "@mui/material/Dialog";
import {
    IconButton,
    Select,
    MenuItem,
    FormControl,
    Button,
    Snackbar,
    DialogActions,
} from "@mui/material";
import UserSearch from "./UserSearch";
import { useSession } from "next-auth/react";
import LinkIcon from "@mui/icons-material/Link";
import CloseIcon from "@mui/icons-material/Close";
import DialogTitle from "@mui/material/DialogTitle";
import ShareUserNameCard from "./ShareUserNameCard";
import DialogContent from "@mui/material/DialogContent";
import { TransitionProps } from "@mui/material/transitions";
import { appSlice, selectApp, useSelector, useDispatch } from "@/lib/redux";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<unknown, JSXElementConstructor<unknown>>;
    },
    ref: React.Ref<unknown>
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ProjectShareModal = (props: any) => {
    const { project, open, closeModal } = props;
    const { data } = useSession();
    const dispatch = useDispatch();

    const handleCloseShareModal = () => {
        closeModal();
    };

    const handleLinkCopy = () => {
        dispatch(
            appSlice.actions.setGlobalSnackBar({ content: "Link Copied", open: true })
        );
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
                open={open}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle
                    id="project-modal-title"
                    className="flex justify-between items-center"
                >
                    {`share "${project?.companyName}"`}
                    <IconButton size="small" onClick={handleCloseShareModal}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent className="py-5 scrollbar-thin !scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                    <UserSearch projectId={project?.id} />
                    <p className="font-semibold text-lg my-4">People With Access</p>
                    <div className="max-h-[200px] overflow-y-auto scrollbar-thin !scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                        <ShareUserNameCard
                            key={"owner"}
                            user={{
                                username: data?.user?.name,
                                email: data?.user?.email,
                                owner: true,
                            }}
                        />
                        {project?.shared?.map((user: any, index: any) => {
                            return (
                                <ShareUserNameCard
                                    key={index}
                                    user={user}
                                    roleControl={true}
                                    projectId={project?.id}
                                />
                            );
                        })}
                    </div>
                    <hr className="border-slate-200 my-4 w-full" />
                    <div className="flex justify-between items-center">
                        Anyone with link can?
                        <FormControl size="small">
                            <Select
                                id="link-role-select"
                                value={"view"}
                            // onChange={handleChange}
                            >
                                <MenuItem value={"view"}>View</MenuItem>
                                <MenuItem value={"comment"}>Comment</MenuItem>
                                <MenuItem value={"edit"}>Edit</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <hr className="border-slate-200 my-4 w-full" />
                </DialogContent>
                <DialogActions>
                    <div className="flex justify-between items-center w-full !px-4 !py-3">
                        <Button
                            onClick={handleLinkCopy}
                            variant="outlined"
                            className="!capitalize !font-semibold"
                        >
                            <LinkIcon className="mr-3" /> Copy Link
                        </Button>
                        <Button
                            variant="contained"
                            className="!capitalize !font-semibold !text-white"
                        >
                            Done
                        </Button>
                    </div>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default ProjectShareModal;
