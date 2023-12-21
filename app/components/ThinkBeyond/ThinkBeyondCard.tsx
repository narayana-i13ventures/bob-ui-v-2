import {
    Button,
    Card,
    CircularProgress,
    Skeleton,
    useTheme,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import React from "react";
import {
    appSlice,
    selectedThinkBeyondCard,
    useDispatch,
    useSelector,
} from "@/lib/redux";
import { useUpdateThinkBeyondMutation } from "@/lib/redux/Api";
import { useRouter } from "next/navigation";

const ThinkBeyondCard = (props: any) => {
    const router = useRouter();
    const theme: any = useTheme();
    const dispatch = useDispatch();
    const selectedCard = useSelector(selectedThinkBeyondCard);
    const { card, BMCCard, loading }: { card: any; BMCCard: any; loading: any } =
        props;

    const [
        updateThinkBeyondCard,
        { isLoading: updateThinkBeyondCardLoading }
    ] = useUpdateThinkBeyondMutation();

    const handleThinkBeyondModalOpen = () => {
        if (selectCard !== null && selectedCard !== undefined && selectedCard.cardName !== "BMC") {
            dispatch(appSlice.actions.toggleThinkBeyondModalOpen(true));
        }
    };

    const handleMicroframeworkNavigation = () => {
        if (BMCCard) {
            switch (BMCCard?.type) {
                case 'future_1_bmc':
                    router.push('Future1/Microframeworks')
                    break;
                default:
                    break;
            }
        }
    };

    const selectCard = () => {
        if (!card?.locked && !BMCCard?.selected) {
            if (
                selectedCard &&
                selectedCard.id !== card.id
            ) {
                const updatedSelectedCard = { ...selectedCard, selected: false };
                updateThinkBeyondCard(updatedSelectedCard)
                    .unwrap()
                    .then((data: any) => {
                        const updatedCard = { ...card, selected: true };
                        updateThinkBeyondCard(updatedCard);
                    });
            }
        }
    };

    const CardSkeleton = (props: any) => {
        return (
            <Card className={`m-4 p-3 opacity-40 min-w-[200px] ${props?.className}`}>
                <Skeleton
                    className="rounded-2xl"
                    variant="rectangular"
                    width={"100%"}
                    height={"20px"}
                />
                <Skeleton
                    className="rounded-2xl my-3"
                    variant="rectangular"
                    width={"100%"}
                    height={"20px"}
                />
                <Skeleton
                    className="rounded-2xl"
                    variant="rectangular"
                    width={"100%"}
                    height={"20px"}
                />
            </Card>
        );
    };

    return (
        <>
            {!loading ? (
                <Card
                    onClick={selectCard}
                    className={`${card?.locked ? "cursor-auto" : "cursor-pointer"
                        } min-w-[200px] m-4 p-3 ${props?.className
                        } ease-in transition-all duration-200 shrink`}
                    sx={{
                        boxShadow:
                            card?.selected || BMCCard?.selected
                                ? theme.custom.greenShadow
                                : "none",
                    }}
                >
                    {!card?.locked && (
                        <div
                            className={`${!card?.locked || !BMCCard?.locked
                                ? card?.started
                                    ? card?.complete
                                        ? "bg-green-400"
                                        : "bg-orange-400"
                                    : "bg-red-400"
                                : ""
                                } text-black px-2 inline-block rounded-md text-sm`}
                        >
                            <span>
                                {!card?.started
                                    ? "Incomplete"
                                    : card?.complete
                                        ? "Completed"
                                        : "In Progress..."}
                            </span>
                        </div>
                    )}
                    <p className="font-semibold text-md my-2 text-center">
                        {card?.cardName}
                    </p>
                    {BMCCard &&
                        !BMCCard?.locked &&
                        (card?.selected || BMCCard?.selected) && (
                            <Button
                                onClick={handleMicroframeworkNavigation}
                                variant="outlined"
                                size="small"
                                className="!font-semibold !capitalize w-full !my-2 relative button-pulse"
                            >
                                <LockIcon className="!text-sm mr-3" />
                                Micro Frameworks
                            </Button>
                        )}
                    {card?.locked ? (
                        <div className="w-full flex justify-center items-center">
                            <LockIcon className="text-[50px] text-neutral-400" />
                        </div>
                    ) : (
                        (card?.selected || BMCCard?.selected) &&
                        (updateThinkBeyondCardLoading ? (
                            <div className="flex justify-center items-center my-1">
                                <CircularProgress size={"30px"} />
                            </div>
                        ) : (
                            <Button
                                onClick={handleThinkBeyondModalOpen}
                                disableElevation
                                variant="contained"
                                size="small"
                                className="!text-white !font-semibold !capitalize w-full"
                            >
                                {card.complete ? "Update" : "Start"}
                            </Button>
                        ))
                    )}
                </Card>
            ) : (
                <CardSkeleton className={props?.className} />
            )}
        </>
    );
};

export default ThinkBeyondCard;
