"use client";
import React, { useEffect, useState } from "react";
import { Container } from "@mui/material";
import { selectApp, useSelector } from "@/lib/redux";
import Header from "@/app/components/shared/Header/Header";
import MicroframeworkCard from "@/app/components/MicroFrameWorks/MicroframeworkCard";
import BobPrefillingLoading from "@/app/components/shared/BobPrefillingLoading";
import { useGetMenuQuery } from "@/lib/redux/Api";

const Microframeworks = () => {
  const { BobPrefillingOpen } = useSelector(selectApp);
  const [canvases, setCanvases] = useState<any>([]);
  const {
    data: Menu,
    isLoading: loading,
    isError: error,
    refetch: MenuRefetch,
  } = useGetMenuQuery({});

  useEffect(() => {
    if (!loading && !error) {
      if (Menu?.[0]?.frameworks && Menu?.[0]?.frameworks?.length > 0) {
        const extractedCanvases = Menu?.[0]?.frameworks?.[0]?.canvases;
        setCanvases(extractedCanvases);
      }
    }
  }, [Menu]);

  return (
    <>
      <>
        <Header />
        <Container
          className="!flex flex-col justify-between items-start !px-10 !pb-6"
          maxWidth={"xl"}
          disableGutters
        >
          <div className="flex justify-between items-center w-full mt-8">
            <div>
              <h3 className="text-2xl font-semibold">Microframeworks</h3>
            </div>
          </div>
          <hr className="border-slate-200 mt-2 w-full" />
          {BobPrefillingOpen ? (
            <>
              <div className="mt-14 flex justify-center center-start w-full">
                <BobPrefillingLoading width={300} color={"black"} />
              </div>
            </>
          ) : (
            <div className="mt-6 grid grid-cols-5 gap-4 w-full">
              {canvases?.filter((canvas:any) => canvas?.locked === false)?.map((canvas: any, index: any) => (
                <MicroframeworkCard key={index} canvas={canvas} />
              ))}
            </div>

          )}
        </Container>
      </>
    </>
  );
};

export default Microframeworks;
