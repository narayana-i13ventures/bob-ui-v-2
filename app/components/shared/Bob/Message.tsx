import { selectApp, useSelector } from "@/lib/redux";
import { Avatar } from "@mui/material";
import { useTheme } from "@mui/material";
import { useSession } from "next-auth/react";
const Message = (props: { sender: string; message: String }) => {
    const theme: any = useTheme();
    const { sender, message } = props;
    const { data }: any = useSession();
    const { bobThinking } = useSelector(selectApp);
    const bobTyping = bobThinking && (sender === 'assistant') && message === "";
    return (
        <>
            <div className="flex justify-start items-start flex-col max-w-[95%] mb-3 w-full">
                <div
                    className={`w-full flex justify-start ${!bobTyping ? "items-start" : "center"
                        } ${(sender === 'user') ? "flex-row-reverse" : ""}`}
                >
                    <div className={`mt-0 w-[15%]`}>
                        {(sender === 'assistant') ? (
                            <img src={"/images/bob.png"} className="max-w-full" />
                        ) : (
                            <img
                                referrerPolicy="no-referrer"
                                className="!bg-indigo-500"
                                style={{
                                    width: "35px",
                                    height: "35px",
                                    borderRadius: "100%"
                                }}
                                src={data?.user?.image}
                            />
                        )}
                    </div>
                    <div className={`flex flex-col w-[85%] ${sender === 'assistant' ? 'items-start' : 'items-end'}`}>
                        <div
                            style={{
                                border: `1px solid ${theme.palette.primary.main}`,
                                backgroundColor: `${theme.custom.contrastBg}`,
                            }}
                            className={` ${(sender === 'user') ? "mr-4" : "ml-4"
                                } p-2 rounded-lg text-sm relative w-fit`}
                        >
                            <div
                                style={{
                                    borderTop: `1px solid ${theme.palette.primary.main}`,
                                    borderRight: `1px solid ${theme.palette.primary.main}`,
                                    backgroundColor: `${theme.custom.contrastBg}`,
                                }}
                                className={`absolute w-[9px] h-[9px] ${!bobTyping ? "top-3" : "top-3"
                                    }  ${(sender === 'user')
                                        ? "-right-[5px] rotate-45"
                                        : "-left-[5px] -rotate-[135deg]"
                                    }`}
                            ></div>
                            {!bobTyping ? (
                                <>
                                    <p>{message}</p>
                                </>
                            ) : (
                                <>
                                    <div className="flex justify-center items-center px-3 py-1">
                                        <div className="animate-bounce w-2 h-2 rounded-full bg-primary"></div>
                                        <div className="animate-bounce delay-200 w-2 h-2 rounded-full bg-primary mx-3"></div>
                                        <div className="animate-bounce delay-500 w-2 h-2 rounded-full bg-primary"></div>
                                    </div>
                                </>
                            )}
                        </div>
                        {!bobTyping && (
                            <p
                                className={`text-[8px] text-right mt-1 mr-4 text-neutral-500  w-full ${(sender === 'user') ? "" : "text-right"
                                    }`}
                            >
                                10:35 AM
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Message;
