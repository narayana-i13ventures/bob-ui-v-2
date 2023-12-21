'use client';
import React from 'react'
import { Tooltip, IconButton, useTheme } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/navigation';
const GoBack = (props: any) => {
    const theme:any = useTheme();
    const router = useRouter();
    return (
        <div className='absolute top-16 left-10 z-[1]'>
            <Tooltip title={props?.message} placement="bottom" arrow>
                <IconButton sx={{ backgroundColor: theme.custom.cardBackground }} onClick={() => router.push(props?.route)}>
                    <ArrowBackIcon />
                </IconButton>
            </Tooltip>
        </div>
    )
}

export default GoBack