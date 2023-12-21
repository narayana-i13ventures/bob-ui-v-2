"use client";
import CanvasCard from "../CanvasCard";
import { useTheme } from "@mui/material";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import ConfirmationModal from "../ConfirmationModal";
import { Future1CVPSlice, useDispatch } from "@/lib/redux";
import { useLazyGetFuture1CVPQuery } from "@/lib/redux/Api";
import BobPrefillingBackdrop from "../../shared/BobPrefillingBackdrop";

const ValuePropositionCanvas = () => {
    const theme: any = useTheme();
    const { futureId } = useParams();
    const dispatch = useDispatch();
    const [{ CVPCards, loading, error }, setCVP] = useState({
        CVPCards: [],
        loading: true,
        error: false,
    });
    const [getFuture1CVP, Future1CVPData] = useLazyGetFuture1CVPQuery({});

    useEffect(() => {
        switch (futureId) {
            case "Future1":
                getFuture1CVP({});
                break;
            default:
                break;
        }
    }, []);

    useEffect(() => {
        switch (futureId) {
            case "Future1":
                setCVP({
                    CVPCards: Future1CVPData?.data,
                    loading: Future1CVPData?.isLoading,
                    error: Future1CVPData?.isError,
                });
                break;
            default:
                break;
        }
        return () => {
            setCVP({
                CVPCards: [],
                loading: true,
                error: false,
            });
        };
    }, [Future1CVPData]);

    useEffect(() => {
        if (Array.isArray(CVPCards)) {
            const hasLockedCard = CVPCards.some((card: any) => card?.locked === true);
            if (hasLockedCard) {
                dispatch(Future1CVPSlice.actions.setCanvasCompleted(false));
            } else {
                dispatch(Future1CVPSlice.actions.setCanvasCompleted(true));
            }
        }
    }, [CVPCards]);
    return (
        <>
            <div className="select-none max-h-full w-full h-full grid grid-rows-5 grid-cols-9 gap-2 py-2 transition-all duration-100 ease-in">
                <div className="row-span-5 col-span-2">
                    <div className="flex h-full flex-col justify-center items-center w-full">
                        <CanvasCard
                            expand={true}
                            loading={loading}
                            className={`${theme?.palette?.mode === "light" ? "!bg-cyan-100" : "!bg-cyan-900"
                                }`}
                            card={CVPCards?.find(
                                (card: any) => card?.cardName === "Client Pains"
                            )}
                        />
                        <div className="py-1"></div>
                        <CanvasCard
                            expand={true}
                            loading={loading}
                            className={`${theme?.palette?.mode === "light" ? "!bg-cyan-100" : "!bg-cyan-900"
                                }`}
                            card={CVPCards?.find(
                                (card: any) => card?.cardName === "Client Gains"
                            )}
                        />
                    </div>
                </div>
                <div className="row-span-5 col-span-2">
                    <CanvasCard
                        expand={true}
                        loading={loading}
                        className={`${theme?.palette?.mode === "light" ? "!bg-cyan-100" : "!bg-cyan-900"
                            }`}
                        card={CVPCards?.find(
                            (card: any) => card?.cardName === "Client Jobs"
                        )}
                    />
                </div>
                <div className="row-span-5 col-span-1 flex flex-col w-full h-full justify-center items-center">
                    <img src="/images/double-arrow.png" className="max-w-[80%]"/>
                </div>
                <div className="row-span-5 col-span-2">
                    <div className="flex h-full flex-col justify-center items-center w-full">
                        <CanvasCard
                            expand={true}
                            loading={loading}
                            className={`${theme?.palette?.mode === "light" ? "!bg-cyan-100" : "!bg-cyan-900"
                                }`}
                            card={CVPCards?.find(
                                (card: any) => card?.cardName === "Pain Relievers"
                            )}
                        />
                        <div className="py-1"></div>
                        <CanvasCard
                            expand={true}
                            loading={loading}
                            className={`${theme?.palette?.mode === "light" ? "!bg-cyan-100" : "!bg-cyan-900"
                                }`}
                            card={CVPCards?.find(
                                (card: any) => card?.cardName === "Gain Creators"
                            )}
                        />
                    </div>
                </div>
                <div className="row-span-5 col-span-2">
                    <CanvasCard
                        expand={true}
                        loading={loading}
                        className={`${theme?.palette?.mode === "light" ? "!bg-cyan-100" : "!bg-cyan-900"
                            }`}
                        card={CVPCards?.find(
                            (card: any) => card?.cardName === "Products and Services"
                        )}
                    />
                </div>
            </div>
            <ConfirmationModal />
            <BobPrefillingBackdrop />
        </>
    );
};

export default ValuePropositionCanvas;
