import { apiSlice } from "../../Api";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: any = {
    selectedCard: {},
    shared: [],
    canvasCompleted: false
};

export const Future1CVPSlice = createSlice({
    name: "Future1BMC",
    initialState,
    reducers: {
        updateChat(state, action: PayloadAction<string>) {
            if (state.selectedCard !== null && state.selectedCard !== undefined) {
                const updatedCVPCard: any = { ...state.selectedCard };
                if (updatedCVPCard?.chat?.length > 0) {
                    const lastMessage = updatedCVPCard?.chat?.[updatedCVPCard?.chat?.length - 1];
                    lastMessage.content += action.payload;
                }
                state.selectedCard.chat = updatedCVPCard.chat;
                return state;
            }
            return state;
        },
        updateKeyPoints: (state, action: PayloadAction<string>) => {
            state.selectedCard.loadingKeyPoints = false;
            if (state.selectedCard !== null && state.selectedCard !== undefined) {
                const updatedCVPCard = { ...state.selectedCard };
                updatedCVPCard.keyPoints += action.payload;
                state.selectedCard = updatedCVPCard;
            }
        },
        updateSingleById: (state, action: PayloadAction<any>) => {
            const card: any = action.payload;
            if (state.selectedCard !== null && state.selectedCard !== undefined) {
                const updatedCard = {
                    ...state.selectedCard,
                    ...card,
                };
                state.selectedCard = updatedCard;
            }
        },
        setCanvasCompleted: (state, action) => {
            state.canvasCompleted = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(
                apiSlice.endpoints.getFuture1CVP.matchFulfilled,
                (state, action) => {
                    state.selectedCard = action.payload.find(
                        (card: any) => card?.selected
                    );
                }
            )
            .addMatcher(
                apiSlice.endpoints.updateFuture1CVP.matchFulfilled,
                (state, action) => {
                    if (action.payload.selected) {
                        state.selectedCard = action.payload;
                    }
                }
            )
            .addMatcher(
                apiSlice.endpoints.nextFuture1CVP.matchFulfilled,
                (state, action) => {
                    const response = action.payload;
                    const selectedCard = response.find((card: any) => card.selected === true);
                    if (selectedCard) {
                        state.selectedCard = selectedCard;
                    }
                }
            )
    },
});
