'use client';
import React from 'react'
import SaveIcon from "@mui/icons-material/Save";
import ShareIcon from "@mui/icons-material/Share";
import DeleteIcon from '@mui/icons-material/Delete';
import SettingsIcon from '@mui/icons-material/Settings';
import { SpeedDial, SpeedDialAction } from "@mui/material";
import { useResetThinkBeyondMutation } from '@/lib/redux/Api';
import { appSlice, selectApp, useDispatch, useSelector } from '@/lib/redux';

const ThinkBeyondSettings = () => {
    const dispatch = useDispatch();
    const [ResetThinkBeyond] = useResetThinkBeyondMutation()
    const { ThinkBeyondSettingsOpen } = useSelector(selectApp);

    const handleThinkBeyondReset = () => {
        ResetThinkBeyond({})
    }

    const handleThinkBeyongSettingsOpen = () => {
        dispatch(appSlice.actions.toggleThinkBeyondSettingsOpen(true))
    };

    const handleThinkBeyongSettingsClose = () => {
        dispatch(appSlice.actions.toggleThinkBeyondSettingsOpen(false))
    };

    const actions = [
        { icon: <DeleteIcon />, name: "Reset Canvas", onclick: handleThinkBeyondReset },
        { icon: <SaveIcon />, name: "Save" },
        { icon: <ShareIcon />, name: "Share" },
    ];

    return (
        <SpeedDial
            ariaLabel="thinkbeyond-speed-dail"
            className="absolute bottom-5 left-10"
            icon={<SettingsIcon className='!text-white' />}
            direction="right"
            onClose={handleThinkBeyongSettingsClose}
            onOpen={handleThinkBeyongSettingsOpen}
            open={ThinkBeyondSettingsOpen}
            FabProps={{
                className: '!shadow-none'
            }}
        >
            {actions.map((action) => (
                <SpeedDialAction
                    key={action.name}
                    icon={action.icon}
                    tooltipTitle={action.name}
                    onClick={action?.onclick}
                    arrow
                />
            ))}
        </SpeedDial>
    )
}

export default ThinkBeyondSettings