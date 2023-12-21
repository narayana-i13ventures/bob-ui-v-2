import React from "react";
import Bob from "@/app/components/shared/Bob/Bob";
import GoBack from "@/app/components/shared/GoBack";
import Header from "@/app/components/shared/Header/Header";
import ThinkBeyondCanvas from "@/app/components/ThinkBeyond/ThinkBeyondCanvas";
import ThinkBeyondSettings from "@/app/components/ThinkBeyond/ThinkBeyondSettings";

const ThinkBeyond = () => {
    return (
        <>
            <div className="flex flex-col justify-start items-center w-full relative min-h-screen max-h-screen overflow-hidden">
                <Header />
                <ThinkBeyondSettings />
                <ThinkBeyondCanvas />
                <Bob/>
                {/* <BobPrefillingBackdrop/> */}
                <GoBack route={"/Dashboard"} message={"Back To Projects"} />
            </div>
        </>
    );
};

export default ThinkBeyond;
