"use client";
import React from "react";
import { Button } from "@mui/material";
import { appSlice, useDispatch } from "@/lib/redux";
const NewProjectModalButton = () => {
    const dispatch = useDispatch();

    const openProjectModal = () => {
        dispatch(appSlice.actions.toggleNewProjectModal(true));
    };

    return (
        <Button
            onClick={openProjectModal}
            variant="contained"
            className="!text-white !font-semibold !capitalize"
        >
            +&nbsp;New Project
        </Button>
    );
};

export default NewProjectModalButton;
