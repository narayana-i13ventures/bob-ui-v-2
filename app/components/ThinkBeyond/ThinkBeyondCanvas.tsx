"use client";
import Lottie from "lottie-react";
import { Button } from "@mui/material";
import { useParams } from "next/navigation";
import ThinkBeyondCard from "./ThinkBeyondCard";
import ThinkBeyondModal from "./ThinkBeyondModal";
import React, { useEffect, useState } from "react";
import animationData from "@/public/images/sphere.json";
import {
  useGetThinkBeyondQuery,
} from "@/lib/redux/Api";
import { useGetProjectByIdQuery } from "@/lib/redux/projectApi";

function setPrefillBodyKey(heading: any) {
  switch (heading) {
    case "What is the change":
      return "change";
    case "What is the Moonshot":
      return "ultimate goal";
    case "Problem to be solved":
      return "Problem";
    case "Hypothesis":
      return "Hypothesis";
    case "Envisaged Timeframe":
      return "Envisaged Timeframe";
    default:
      return "";
  }
}
function extractKeyValues(cards: any, cardNumber: any): Record<string, string> {
  const card = cards?.find((card: any) => card?.cardNumber === cardNumber);
  const keyValues: Record<string, string> = {};
  card?.cardInfo.forEach((info: any) => {
    keyValues[setPrefillBodyKey(info.heading)] = info.text;
  });
  return keyValues;
}
function extractText(cards: any, cardNumber: any) {
  const card = cards?.find((card: any) => card?.cardNumber === cardNumber);
  if (card) {
    const cardInfo = card.cardInfo[0];
    return cardInfo.text;
  }
  return undefined;
}

const ThinkBeyondCanvas = () => {
  const {
    isSuccess: success,
    isFetching: loading,
    data: ThinkBeyondCards,
    isError: error,
    refetch,
  } = useGetThinkBeyondQuery({});

  const { projectId }: any = useParams();

  const {
    data: company,
    isLoading: companyLoading,
    isError: companyError,
  } = useGetProjectByIdQuery(projectId);

  const [prefillBody, setPrefillBody] = useState({});

  useEffect(() => {
    if (ThinkBeyondCards && projectId && !companyLoading && !companyError) {
      const data = {
        thinkBeyondCards: {
          change: extractText(ThinkBeyondCards, 0),
          "ultimate goal": extractText(ThinkBeyondCards, 1),
          Future: {
            key: 1,
            Data: { ...extractKeyValues(ThinkBeyondCards, 2) },
          },
        },
      };
      const {
        shared,
        id,
        can_modify,
        is_active,
        is_owner,
        milvus_collection,
        modified_on,
        user_id,
        project_id,
        ...updatedCompanyData
      } = company[0];
      setPrefillBody({ ...data, companyData: updatedCompanyData });
    }
  }, [ThinkBeyondCards, projectId, company]);

  const handleRetry = () => {
    refetch();
  };

  return (
    <>
      {error ? (
        <div className="flex flex-col items-center justify-center w-full">
          <p className="my-4">Something Went Wrong. Please Try Again</p>
          <Button
            variant="contained"
            className="!capitalize !text-white !font-semibold"
            onClick={handleRetry}
          >
            Retry
          </Button>
        </div>
      ) : (
        <>
          <div className="w-full -mt-8 flex flex-col justify-center items-center grow">
            <div className="flex justify-center items-center w-full">
              <ThinkBeyondCard
                loading={loading}
                card={ThinkBeyondCards?.find(
                  (card: any) => card?.cardNumber === 2
                )}
                BMCCard={ThinkBeyondCards?.find(
                  (card: any) => card?.cardNumber === 4
                )}
              />
              <ThinkBeyondCard
                loading={loading}
                card={ThinkBeyondCards?.find(
                  (card: any) => card?.cardNumber === 5
                )}
                BMCCard={ThinkBeyondCards?.find(
                  (card: any) => card?.cardNumber === 7
                )}
                className="mb-20"
              />
              <ThinkBeyondCard
                loading={loading}
                card={ThinkBeyondCards?.find(
                  (card: any) => card?.cardNumber === 8
                )}
                BMCCard={ThinkBeyondCards?.find(
                  (card: any) => card?.cardNumber === 10
                )}
              />
            </div>
            <div className="flex justify-center items-center w-full -mt-12">
              <ThinkBeyondCard
                loading={loading}
                card={ThinkBeyondCards?.find(
                  (card: any) => card?.cardNumber === 0
                )}
              />
              <Lottie
                className="w-[300px] mx-24 -z-[1]"
                animationData={animationData}
                loop={true}
              />
              <ThinkBeyondCard
                loading={loading}
                card={ThinkBeyondCards?.find(
                  (card: any) => card?.cardNumber === 1
                )}
              />
            </div>
            <div className="flex justify-center items-center w-full -mt-16">
              <ThinkBeyondCard
                loading={loading}
                card={ThinkBeyondCards?.find(
                  (card: any) => card?.cardNumber === 3
                )}
              />
              <ThinkBeyondCard
                loading={loading}
                card={ThinkBeyondCards?.find(
                  (card: any) => card?.cardNumber === 6
                )}
                className="mt-20"
              />
              <ThinkBeyondCard
                loading={loading}
                card={ThinkBeyondCards?.find(
                  (card: any) => card?.cardNumber === 9
                )}
              />
            </div>
            <ThinkBeyondModal prefillBody={prefillBody} />
          </div>
        </>
      )}
    </>
  );
};

export default ThinkBeyondCanvas;
