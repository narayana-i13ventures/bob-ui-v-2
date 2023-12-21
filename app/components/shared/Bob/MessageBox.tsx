import React, { useState, useRef, useEffect } from "react";
import Message from "./Message";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import { TextField, InputAdornment, useTheme, IconButton } from "@mui/material";
import { appSlice, selectApp, useDispatch, useSelector } from "@/lib/redux";
import { useParams, usePathname } from "next/navigation";

const MessageBox = (props: {
  className?: string;
  arrow?: boolean;
  header?: boolean;
  height: number;
  messages: any;
  sendMessage: any;
}) => {
  const params = useParams();
  const path = usePathname();
  const theme: any = useTheme();
  const dispatch = useDispatch();
  const { bobThinking } = useSelector(selectApp);
  const [message, setMessage] = useState<any>("");
  const textFieldRef = useRef<HTMLInputElement | null>(null);
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);
  const {
    className,
    arrow,
    header,
    height,
    messages: BobMessages,
    sendMessage,
  } = props;
  
  const handleSendMessage = () => {
    if (message.trim() !== "") {
      sendMessage(message);
      setMessage("");
      if (textFieldRef.current) {
        textFieldRef.current.focus();
      }
    }
  };

  const handleEnterKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [BobMessages]);

  const handleCloseMessageBox = () => {
    dispatch(appSlice.actions.toggleBobOpen(false));
  };

  return (
    <div
      style={{
        backgroundColor: theme.custom.cardBackground,
        borderColor: theme?.palette?.primary?.main,
      }}
      className={`${className} ${height !== 1000 ? `h-[${height}px]` : 'h-[65vh]'} rounded-md border-[0px]  relative z-[10] flex flex-col justify-start items-start`}
    >
      {arrow && (
        <div
          style={{
            backgroundColor: theme.custom.cardBackground,
            borderColor: theme?.palette?.primary?.main,
          }}
          className="absolute w-[20px] h-[20px] -bottom-[10px] right-5 rotate-45 border-[0px] -z-[1]"
        ></div>
      )}
      {header && (
        <>
          <div
            style={{ backgroundColor: theme.palette.primary.main }}
            className="p-1 px-4 flex justify-between items-center rounded-t-md h-[40px] w-full"
          >
            <p className="font-semibold !text-white text-lg">Bob</p>
            {arrow && (
              <IconButton onClick={handleCloseMessageBox}>
                <CloseIcon className="!text-white" />
              </IconButton>
            )}
          </div>
          <hr
            style={{ borderColor: theme.palette.primary.main }}
            className="w-full"
          />
        </>
      )}
      <div className={`px-2 mb-2 grow w-full flex flex-col justify-between`}>
        <div
          ref={messagesContainerRef}
          style={{
            height: `${height !== 1000 ? `${height - 100}px` : 'calc(65vh - 60px)'}`,
            maxHeight: `${height !== 1000 ? `${height - 100}px` : 'calc(65vh - 60px)'}`,
          }}
          className={`p-2 grow flex flex-col-reverse justify-start items-start overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300`}
        >
          {BobMessages?.slice()
            .reverse()
            .filter((message: any) => message.role !== 'system')
            .map((message: any, index: number) => {
              return (
                <Message
                  key={index}
                  message={message?.content}
                  sender={message?.role}
                />
              );
            })}
        </div>
        <div className="flex mt-2">
          <TextField
            disabled={bobThinking}
            id="bob-message-input"
            placeholder="Enter Your Message"
            className="w-full"
            value={message}
            size="small"
            multiline
            variant="outlined"
            maxRows={4}
            sx={{ backgroundColor: theme.custom.contrastBg }}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleEnterKeyPress}
            inputRef={(input) => (textFieldRef.current = input)}
            InputProps={{
              style: {
                fontSize: "14px",
                padding: "10px",
              },
              endAdornment: (
                <InputAdornment
                  position="end"
                  className="cursor-pointer"
                  onClick={handleSendMessage}
                >
                  <SendIcon sx={{ w: 12 }} />
                </InputAdornment>
              ),
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default MessageBox;
