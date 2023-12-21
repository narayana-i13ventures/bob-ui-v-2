import { Card } from '@mui/material'
import Link from 'next/link';
import React from 'react'

const MicroframeworkCard = (props: any) => {
    const { canvas } = props;
    return (
        <>
            <Link href={canvas?.route}>
                <Card className='!mx-auto p-2 w-[220px] h-[180px] flex justify-center items-center flex-col'>
                    <div className="select-none max-h-full w-full h-full grid grid-rows-6 grid-cols-10 gap-2 py-2 transition-all duration-100 ease-in">
                        <div className="row-span-4 col-span-2 bg-red-300 rounded-sm"></div>
                        <div className="row-span-4 col-span-2">
                            <div className="h-full flex flex-col justify-between">
                                <div className='h-full bg-red-300 rounded-sm'></div>
                                <div className="py-1"></div>
                                <div className='h-full bg-red-300 rounded-sm'></div>
                            </div>
                        </div>
                        <div className="row-span-4 col-span-2 bg-red-300 rounded-sm"></div>
                        <div className="row-span-4 col-span-2">
                            <div className="h-full flex flex-col justify-between">
                                <div className='h-full bg-red-300 rounded-sm'></div>
                                <div className="py-1"></div>
                                <div className='h-full bg-red-300 rounded-sm'></div>
                            </div>
                        </div>
                        <div className="row-span-4 col-span-2 bg-red-300 rounded-sm"></div>
                        <div className="row-span-2 col-span-5 bg-red-300 rounded-sm"></div>
                        <div className="row-span-2 col-span-5 bg-red-300 rounded-sm"></div>
                    </div>
                    <p className='font-semibold text-center my-2'>{canvas?.name}</p>
                </Card>
            </Link>
        </>
    )
}

export default MicroframeworkCard