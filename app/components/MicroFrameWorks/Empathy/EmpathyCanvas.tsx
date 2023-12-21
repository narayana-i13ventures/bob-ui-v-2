'use client';
import React from 'react'
import CanvasCard from '../CanvasCard'
import { useTheme } from '@mui/material'

const EmpathyCanvas = () => {
    const theme: any = useTheme();
    const empathyCanvasCards = [
        {
            cardCanvas: "Empathy",
            future: 1,
            cardNumber: 0,
            cardName: "Who are we Empathizing with?",
            selected: true,
            keyPoints: "",
            locked: false,
            loadingKeyPoints: false,
            chat: [],
            size: "full",
            labelHeading: "",
            label: [],
            surety: 0,
            userLock: false,
            shared: [],
            color: "#fff",
            comments: [],
            id: "655a8d0e03bce43fdecadec1",
        },
        {
            cardCanvas: "Empathy",
            future: 1,
            cardNumber: 1,
            cardName: "What do they need to Do?",
            selected: false,
            keyPoints: "",
            locked: false,
            loadingKeyPoints: false,
            chat: [],
            size: "full",
            labelHeading: "",
            label: [],
            surety: 0,
            userLock: false,
            shared: [],
            color: "#fff",
            comments: [],
            id: "655a8d0e03bce43fdecadec2",
        },
        {
            cardCanvas: "Empathy",
            future: 1,
            cardNumber: 2,
            cardName: "What do they SEE?",
            selected: false,
            keyPoints: "",
            locked: false,
            loadingKeyPoints: false,
            chat: [],
            size: "full",
            labelHeading: "",
            label: [],
            surety: 0,
            userLock: false,
            shared: [],
            color: "#fff",
            comments: [],
            id: "655a8d0e03bce43fdecadec3",
        },
        {
            cardCanvas: "Empathy",
            future: 1,
            cardNumber: 3,
            cardName: "What do they SAY?",
            selected: false,
            keyPoints: "",
            locked: false,
            loadingKeyPoints: false,
            chat: [],
            size: "full",
            labelHeading: "",
            label: [],
            surety: 0,
            userLock: false,
            shared: [],
            color: "#fff",
            comments: [],
            id: "655a8d0e03bce43fdecadec4",
        },
        {
            cardCanvas: "Empathy",
            future: 1,
            cardNumber: 4,
            cardName: "What do they HEAR?",
            selected: false,
            keyPoints: "",
            locked: false,
            loadingKeyPoints: false,
            chat: [],
            size: "full",
            labelHeading: "",
            label: [],
            surety: 0,
            userLock: false,
            shared: [],
            color: "#fff",
            comments: [],
            id: "655a8d0e03bce43fdecadec5",
        },
        {
            cardCanvas: "Empathy",
            future: 1,
            cardNumber: 5,
            cardName: "What do they DO?",
            selected: false,
            keyPoints: "",
            locked: false,
            loadingKeyPoints: false,
            chat: [],
            size: "full",
            labelHeading: "",
            label: [],
            surety: 0,
            userLock: false,
            shared: [],
            color: "#fff",
            comments: [],
            id: "655a8d0e03bce43fdecadec6",
        },
        {
            cardCanvas: "Empathy",
            future: 1,
            cardNumber: 6,
            cardName: "Pains",
            selected: false,
            keyPoints: "",
            locked: false,
            loadingKeyPoints: false,
            chat: [],
            size: "full",
            labelHeading: "",
            label: [],
            surety: 0,
            userLock: false,
            shared: [],
            color: "#fff",
            comments: [],
            id: "655a8d0e03bce43fdecadec7",
        },
        {
            cardCanvas: "Empathy",
            future: 1,
            cardNumber: 7,
            cardName: "Gains",
            selected: false,
            keyPoints: "",
            locked: false,
            loadingKeyPoints: false,
            chat: [],
            size: "full",
            labelHeading: "",
            label: [],
            surety: 0,
            userLock: false,
            shared: [],
            color: "#fff",
            comments: [],
            id: "655a8d0e03bce43fdecadec8",
        }
    ]
    return (
        <>
            <div className="select-none max-h-full w-full h-full grid grid-rows-4 grid-cols-12 gap-2">
                <div className='col-span-6 row-span-1'>
                    <CanvasCard
                        expand={true}
                        loading={false}
                        className={`${theme?.palette?.mode === "light" ? "!bg-cyan-100" : "!bg-cyan-900"
                            }`}
                        card={empathyCanvasCards?.find(
                            (card: any) => card?.cardNumber === 0
                        )}
                    />
                </div>
                <div className='col-span-6 row-span-1'>
                    <CanvasCard
                        expand={true}
                        loading={false}
                        className={`${theme?.palette?.mode === "light" ? "!bg-cyan-100" : "!bg-cyan-900"
                            }`}
                        card={empathyCanvasCards?.find(
                            (card: any) => card?.cardNumber === 1
                        )}
                    />
                </div>
                <div className='col-span-5 row-span-1'>
                    <CanvasCard
                        expand={true}
                        loading={false}
                        className={`${theme?.palette?.mode === "light" ? "!bg-cyan-100" : "!bg-cyan-900"
                            }`}
                        card={empathyCanvasCards?.find(
                            (card: any) => card?.cardNumber === 2
                        )}
                    />
                </div>
                <div className='col-span-2 row-span-3 flex flex-col justify-end items-end'>
                    <img src='/images/person-standing.png' className='max-h-full'/>
                </div>
                <div className='col-span-5 row-span-1'>
                    <CanvasCard
                        expand={true}
                        loading={false}
                        className={`${theme?.palette?.mode === "light" ? "!bg-cyan-100" : "!bg-cyan-900"
                            }`}
                        card={empathyCanvasCards?.find(
                            (card: any) => card?.cardNumber === 3
                        )}
                    />
                </div>
                <div className='col-span-5 row-span-1'>
                    <CanvasCard
                        expand={true}
                        loading={false}
                        className={`${theme?.palette?.mode === "light" ? "!bg-cyan-100" : "!bg-cyan-900"
                            }`}
                        card={empathyCanvasCards?.find(
                            (card: any) => card?.cardNumber === 4
                        )}
                    />
                </div>
                <div className='col-span-5 row-span-1'>
                    <CanvasCard
                        expand={true}
                        loading={false}
                        className={`${theme?.palette?.mode === "light" ? "!bg-cyan-100" : "!bg-cyan-900"
                            }`}
                        card={empathyCanvasCards?.find(
                            (card: any) => card?.cardNumber === 5
                        )}
                    />
                </div>
                <div className='col-span-5 row-span-1'>
                    <CanvasCard
                        expand={true}
                        loading={false}
                        className={`${theme?.palette?.mode === "light" ? "!bg-cyan-100" : "!bg-cyan-900"
                            }`}
                        card={empathyCanvasCards?.find(
                            (card: any) => card?.cardNumber === 6
                        )}
                    />
                </div>
                <div className='col-span-5 row-span-1'>
                    <CanvasCard
                        expand={true}
                        loading={false}
                        className={`${theme?.palette?.mode === "light" ? "!bg-cyan-100" : "!bg-cyan-900"
                            }`}
                        card={empathyCanvasCards?.find(
                            (card: any) => card?.cardNumber === 7
                        )}
                    />
                </div>
            </div>
        </>
    )
}

export default EmpathyCanvas