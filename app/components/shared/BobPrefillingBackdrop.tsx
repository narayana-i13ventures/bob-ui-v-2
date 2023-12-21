'use client';
import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import { selectApp, useSelector } from '@/lib/redux';
import BobPrefillingLoading from "./BobPrefillingLoading";


export default function BobPrefillingBackdrop() {
    const { BobPrefillingOpen } = useSelector(selectApp)

    return (
        <div>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
                open={BobPrefillingOpen}
            >
                <BobPrefillingLoading width={400} color={'white'} />
            </Backdrop>
        </div>
    );
}