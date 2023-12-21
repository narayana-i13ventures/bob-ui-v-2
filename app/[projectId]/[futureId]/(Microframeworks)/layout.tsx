import React from "react";
import MicroframeworkWrapper from "./MicroframworkWrapper";
import Header from "@/app/components/shared/Header/Header";
import CanvasCardModal from "@/app/components/MicroFrameWorks/CanvasCardModal";

const layout = (props: any) => {
    return (
        <>
            <div className="flex flex-col justify-start items-center w-full min-h-screen max-h-screen overflow-hidden">
                <Header />
                <MicroframeworkWrapper>
                    {props?.children}
                </MicroframeworkWrapper>
                <CanvasCardModal />
            </div>
        </>
    );
};

export default layout;
