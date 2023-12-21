import React, { useState, useEffect } from "react";
import LockIcon from "@mui/icons-material/Lock";
import {
  appSlice,
  selectedFuture1BMC,
  selectedFuture1CVP,
  selectedFuture1Empathy,
  useDispatch,
  useSelector,
} from "@/lib/redux";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import {
  Button,
  Card,
  Divider,
  IconButton,
  Skeleton,
  Tooltip,
  useTheme,
} from "@mui/material";
import {
  useUpdateFuture1BMCMutation,
  useUpdateFuture1CVPMutation,
} from "@/lib/redux/Api";
import { usePathname } from "next/navigation";

const CanvasCard = (props: any) => {
  const theme: any = useTheme();
  const pathName = usePathname();
  const dispatch = useDispatch();
  const { card, className, loading, expand } = props;
  const Future1BMCCard = useSelector(selectedFuture1BMC);
  const Future1CVPCard = useSelector(selectedFuture1CVP);
  const Future1EmpathyCard = useSelector(selectedFuture1Empathy);
  const [selectedCard, setSelectedCard] = useState<any>(null);
  const [updateFuture1BMC] = useUpdateFuture1BMCMutation();
  const [updateFuture1CVP] = useUpdateFuture1CVPMutation();

  useEffect(() => {
    if (pathName.includes("/Future1/BMC")) {
      setSelectedCard(Future1BMCCard);
    } else if (pathName.includes("/Future2/BMC")) {
      // setSelectedCard(Future2BMCCard);
    } else if (pathName.includes("/Future3/BMC")) {
      // setSelectedCard(Future3BMCCard);
    } else if (pathName.includes("/Future1/CVP")) {
      setSelectedCard(Future1CVPCard);
    } else if (pathName.includes("/Future1/Empathy")) {
      setSelectedCard(Future1EmpathyCard);
    } else {
      setSelectedCard(null);
    }
    return () => {
      setSelectedCard(null);
    };
  }, [pathName, Future1BMCCard, Future1CVPCard, Future1EmpathyCard]);

  const handleCardOpen = () => {
    if (!card?.locked) {
      if (selectedCard && selectedCard.id === card.id) {
        dispatch(appSlice.actions.toggleCanvasCardModal(true));
      }
    }
  };

  const selectCard = () => {
    if (!card?.locked) {
      if (selectedCard && selectedCard.id !== card.id) {
        const updatedSelectedCard = { ...selectedCard, selected: false };
        if (pathName.includes("/Future1/BMC")) {
          updateFuture1BMC(updatedSelectedCard)
            .unwrap()
            .then((data: any) => {
              const updatedCard = { ...card, selected: true };
              updateFuture1BMC(updatedCard);
            });
        } else if (pathName.includes("/Future2/BMC")) {
          // setSelectedCard(Future2BMCCard);
        } else if (pathName.includes("/Future3/BMC")) {
          // setSelectedCard(Future3BMCCard);
        } else if (pathName.includes("/Future1/CVP")) {
          updateFuture1CVP(updatedSelectedCard)
            .unwrap()
            .then((data: any) => {
              const updatedCard = { ...card, selected: true };
              updateFuture1CVP(updatedCard);
            });
        }
      }
    }
  };

  const CardSkeleton = (props: any) => {
    return (
      <Card className={`p-3 opacity-40 h-full w-full ${className}`}>
        <div className="m-3 overflow-hidden">
          <Skeleton
            className="rounded-2xl mb-3"
            variant="rectangular"
            width={"100%"}
            height={"20px"}
          />
          <Divider />
          <Skeleton
            className="rounded-2xl my-3"
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
            className="rounded-2xl my-3"
            variant="rectangular"
            width={"100%"}
            height={"20px"}
          />
        </div>
      </Card>
    );
  };
  return (
    <>
      {loading ? (
        <>
          <CardSkeleton />
        </>
      ) : (
        <>
          <Card
            onClick={selectCard}
            className={`${className} ${card?.selected
              ? "border-2 border-primary"
              : "border-2 border-transparent"
              } p-2 rounded-md flex flex-col justify-start items-start h-full w-full cursor-pointer`}
          >
            <div className="flex justify-between items-center w-full">
              <p className="p-2 text-md font-semibold">{card?.cardName}</p>
              {expand && (
                <>
                  {card?.selected && (
                    <Tooltip
                      title={`Expand ${card?.cardName}`}
                      arrow
                      placement="bottom"
                    >
                      <IconButton onClick={handleCardOpen}>
                        <OpenInFullIcon />
                      </IconButton>
                    </Tooltip>
                  )}
                </>
              )}
            </div>
            <Divider className="w-full" />
            {card?.locked ? (
              <div className="flex justify-center items-center grow w-full">
                <LockIcon className="!text-[70px] opacity-30" />
              </div>
            ) : card?.keyPoints === "" && card?.selected ? (
              <div className="flex justify-center items-center grow w-full">
                <Button
                  onClick={handleCardOpen}
                  variant="contained"
                  className="!text-white !font-semibold !capitalize"
                >
                  <ChatBubbleIcon className="!text-white !text-[20px]" />
                  &nbsp;&nbsp;&nbsp;Chat With Bob
                </Button>
              </div>
            ) : card?.keyPoints === "" && !card?.selected ? (
              <div className="flex justify-center items-center grow w-full">
                <p>No Information Available</p>
              </div>
            ) : (
              <div className="flex justify-start items-start grow overflow-y-auto scrollbar-thin !scrollbar-thumb-gray-300 scrollbar-track-gray-100 w-full">
                <ul className="list-disc pl-5 text-sm">
                  {card?.keyPoints
                    ?.split("--")
                    .filter((keypoint: any) => keypoint !== "")
                    .map((keypoint: any, index: number) => (
                      <li className="my-2" key={index}>
                        {keypoint}
                      </li>
                    ))}
                </ul>
              </div>
            )}
          </Card>
        </>
      )}
    </>
  );
};

export default CanvasCard;
