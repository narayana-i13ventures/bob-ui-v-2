import { apiSlice } from "../../Api";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface thinkBeyond {
    selectedCard: any;
    BobMessages: any[];
}
const initialState: thinkBeyond = {
    selectedCard: {},
    BobMessages: [
        {
            content: "Hi, I'm Bob! 👋 Start working on your ThinkBeyond Canvas and I'll gradually give you advice and suggestions!",
            role: "assistant",
        },
    ]
};

export const thinkBeyondSlice = createSlice({
    name: "thinkBeyond",
    initialState,
    reducers: {
        updateText: (
            state,
            action: PayloadAction<{ heading: string; text: string }>
        ) => {
            const { heading, text } = action.payload;
            if (state?.selectedCard !== null && state?.selectedCard !== undefined) {
                state.selectedCard = {
                    ...state?.selectedCard,
                    started: true,
                    cardInfo: state?.selectedCard?.cardInfo?.map(
                        (info: any) => {
                            if (info.heading === heading) {
                                return { ...info, text };
                            }
                            return info;
                        }
                    ),
                };
                const anyEmpty = state?.selectedCard?.cardInfo?.some(
                    (info: any) => info.text === ""
                );
                state.selectedCard.complete = !anyEmpty;
            }
        },
        setBobMessages: (state) => {
            const lastMessage = state.BobMessages[state.BobMessages.length - 1];
            if (!lastMessage || lastMessage.content !== '') {
                state.BobMessages = [...state.BobMessages, { content: '', role: 'assistant' }];
            }
        },
        removeBobMessages: (state) => {
            if (state.BobMessages.length > 0) {
                state.BobMessages.pop();
            }
        },
        updateBobMessages: (state, action) => {
            const updatedMessages = [...state.BobMessages];
            const lastMessage = updatedMessages[state.BobMessages.length - 1];
            if (lastMessage) {
                lastMessage.content = action.payload;
            }
            state.BobMessages = updatedMessages;
        }
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(
                apiSlice.endpoints.getThinkBeyond.matchFulfilled,
                (state, action) => {
                    state.selectedCard = action.payload.find(
                        (card: any) => card?.selected
                    );
                }
            )
            .addMatcher(
                apiSlice.endpoints.updateThinkBeyond.matchFulfilled,
                (state, action) => {
                    if (action.payload.selected) {
                        state.selectedCard = action.payload;
                    }
                }
            )
            .addMatcher(
                apiSlice.endpoints.nextThinkBeyond.matchFulfilled,
                (state, action) => {
                    const response = action.payload;
                    const selectedCard = response.find((card: any) => card.selected === true);
                    if (selectedCard) {
                        state.selectedCard = selectedCard;
                    }
                }
            );
    },
});
