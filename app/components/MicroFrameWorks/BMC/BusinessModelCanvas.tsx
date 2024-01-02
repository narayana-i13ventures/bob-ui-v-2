"use client";
import React, { useEffect, useRef, useState } from "react";
import CanvasCard from "../CanvasCard";
import { useTheme } from "@mui/material";
import { useParams } from "next/navigation";
import ConfirmationModal from "../ConfirmationModal";
import { useLazyGetFuture1BMCQuery } from "@/lib/redux/Api";
import {
    Future1BMCSlice,
    useDispatch,
} from "@/lib/redux";
import BobPrefillingBackdrop from "../../shared/BobPrefillingBackdrop";
import { toPng, toSvg } from 'html-to-image';
const BusinessModelCanvas = () => {
    const theme: any = useTheme();
    const { futureId } = useParams();
    const dispatch = useDispatch();
    const [{ BMCCards, loading, error }, setBMC] = useState({
        BMCCards: [],
        loading: true,
        error: false,
    });
    const [getFuture1BMC, Future1BMCData] = useLazyGetFuture1BMCQuery({});

    useEffect(() => {
        switch (futureId) {
            case "Future1":
                getFuture1BMC({});
                break;
            default:
                break;
        }
    }, []);

    useEffect(() => {
        switch (futureId) {
            case "Future1":
                setBMC({
                    BMCCards: Future1BMCData?.data,
                    loading: Future1BMCData?.isLoading,
                    error: Future1BMCData?.isError,
                });
                break;
            default:
                break;
        }
        return () => {
            setBMC({
                BMCCards: [],
                loading: true,
                error: false,
            });
        };
    }, [Future1BMCData]);

    useEffect(() => {
        if (Array.isArray(BMCCards)) {
            const cardsArray = Object.values(BMCCards);
            const data = cardsArray.reduce((result: any, card: any) => {
                const cardName: any = card?.cardName;
                const keyPoints = card?.keyPoints;

                if (cardName) {
                    result[cardName] = {
                        details: keyPoints
                            .split("--")
                            .filter((value: any) => value.trim() !== ""),
                    };
                }

                return result;
            }, {});
            const response = {
                bmc: { ...data },
            };
            dispatch(Future1BMCSlice.actions.setCVPPrefillBody(response));
            const hasLockedCard = BMCCards.some((card: any) => card?.locked === true);
            if (hasLockedCard) {
                dispatch(Future1BMCSlice.actions.setCanvasCompleted(false));
            } else {
                dispatch(Future1BMCSlice.actions.setCanvasCompleted(true));
            }
        }
    }, [BMCCards]);

    const elementRef: any = useRef(null);

    const htmlToImageConvert = () => {
        toSvg(elementRef?.current, {
            canvasHeight: 2000,
            cacheBust: false,
            backgroundColor: 'white'
        })
            .then((dataUrl) => {
                const link = document.createElement("a");
                link.download = "my-image-name.svg";
                link.href = dataUrl;
                link.click();
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <>
            <div ref={elementRef} className="select-none max-h-full w-full h-full grid grid-rows-6 grid-cols-10 gap-2 py-2 transition-all duration-100 ease-in">
                <div className="row-span-4 col-span-2">
                    <CanvasCard
                        expand={true}
                        loading={loading}
                        className={`${theme?.palette?.mode === "light" ? "!bg-cyan-100" : "!bg-cyan-900"
                            }`}
                        card={BMCCards?.find(
                            (card: any) => card?.cardName === "Key Partners"
                        )}
                    />
                </div>

                <div className="row-span-4 col-span-2">
                    <div className="h-full flex flex-col justify-between">
                        <CanvasCard
                            expand={true}
                            loading={loading}
                            className={`${theme?.palette?.mode === "light"
                                ? "!bg-cyan-100"
                                : "!bg-cyan-900"
                                }`}
                            card={BMCCards?.find(
                                (card: any) => card?.cardName === "Key Activities"
                            )}
                        />
                        <div className="py-1"></div>
                        <CanvasCard
                            expand={true}
                            loading={loading}
                            className={`${theme?.palette?.mode === "light"
                                ? "!bg-cyan-100"
                                : "!bg-cyan-900"
                                }`}
                            card={BMCCards?.find(
                                (card: any) => card?.cardName === "Key Resources"
                            )}
                        />
                    </div>
                </div>

                <div className="row-span-4 col-span-2">
                    <CanvasCard
                        expand={true}
                        loading={loading}
                        className={`${theme?.palette?.mode === "light"
                            ? "!bg-orange-100"
                            : "!bg-orange-900"
                            }`}
                        card={BMCCards?.find(
                            (card: any) => card?.cardName === "Value Propositions"
                        )}
                    />
                </div>

                <div className="row-span-4 col-span-2">
                    <div className="h-full flex flex-col justify-between">
                        <CanvasCard
                            expand={true}
                            loading={loading}
                            className={`${theme?.palette?.mode === "light"
                                ? "!bg-purple-100"
                                : "!bg-purple-900"
                                }`}
                            card={BMCCards?.find(
                                (card: any) => card?.cardName === "Customer Relationships"
                            )}
                        />
                        <div className="py-1"></div>
                        <CanvasCard
                            expand={true}
                            loading={loading}
                            className={`${theme?.palette?.mode === "light"
                                ? "!bg-purple-100"
                                : "!bg-purple-900"
                                }`}
                            card={BMCCards?.find(
                                (card: any) => card?.cardName === "Channels"
                            )}
                        />
                    </div>
                </div>

                <div className="row-span-4 col-span-2">
                    <CanvasCard
                        expand={true}
                        loading={loading}
                        className={`${theme?.palette?.mode === "light"
                            ? "!bg-purple-100"
                            : "!bg-purple-900"
                            }`}
                        card={BMCCards?.find(
                            (card: any) => card?.cardName === "Customer Segments"
                        )}
                    />
                </div>

                <div className="row-span-2 col-span-5">
                    <CanvasCard
                        expand={true}
                        loading={loading}
                        className={`${theme?.palette?.mode === "light"
                            ? "!bg-emerald-100"
                            : "!bg-emerald-900"
                            }`}
                        card={BMCCards?.find(
                            (card: any) => card?.cardName === "Cost Structure"
                        )}
                    />
                </div>

                <div className="row-span-2 col-span-5">
                    <CanvasCard
                        expand={true}
                        loading={loading}
                        className={`${theme?.palette?.mode === "light"
                            ? "!bg-emerald-100"
                            : "!bg-emerald-900"
                            }`}
                        card={BMCCards?.find(
                            (card: any) => card?.cardName === "Revenue Streams"
                        )}
                    />
                </div>
            </div>
            <ConfirmationModal />
            <BobPrefillingBackdrop />
        </>
    );
};

export default BusinessModelCanvas;
