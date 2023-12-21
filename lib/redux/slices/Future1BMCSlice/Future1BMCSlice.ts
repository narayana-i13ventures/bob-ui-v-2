import { apiSlice } from "../../Api";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: any = {
    selectedCard: {},
    CVPPrefillBody: {},
    canvasCompleted: false,
    canvasColors: {

    }
};

export const Future1BMCSlice = createSlice({
    name: "Future1BMC",
    initialState,
    reducers: {
        updateChat(state, action: PayloadAction<string>) {
            if (state.selectedCard !== null && state.selectedCard !== undefined) {
                const updatedBMCCard: any = { ...state.selectedCard };
                if (updatedBMCCard?.chat?.length > 0) {
                    const lastMessage = updatedBMCCard?.chat?.[updatedBMCCard?.chat?.length - 1];
                    lastMessage.content += action.payload;
                }
                state.selectedCard.chat = updatedBMCCard.chat;
                return state;
            }
            return state;
        },
        updateKeyPoints: (state, action: PayloadAction<string>) => {
            state.selectedCard.loadingKeyPoints = false;
            if (state.selectedCard !== null && state.selectedCard !== undefined) {
                const updatedBMCCard = { ...state.selectedCard };
                updatedBMCCard.keyPoints += action.payload;
                state.selectedCard = updatedBMCCard;
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
        setCVPPrefillBody: (state, action) => {
            state.CVPPrefillBody = action.payload;
        },
        setCanvasCompleted: (state, action) => {
            state.canvasCompleted = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(
                apiSlice.endpoints.getFuture1BMC.matchFulfilled,
                (state, action) => {
                    state.selectedCard = action.payload.find(
                        (card: any) => card?.selected
                    );
                    const newCanvasColors: { [cardName: string]: string } = {};
                    action.payload.forEach((card: any) => {
                        newCanvasColors[card.cardName] = card.color || '';
                    });

                    // Update the state only if the canvasColors object is extensible
                    if (Object.isExtensible(state.canvasColors)) {
                        state.canvasColors = newCanvasColors;
                    }
                }
            )
            .addMatcher(
                apiSlice.endpoints.updateFuture1BMC.matchFulfilled,
                (state, action) => {
                    if (action.payload.selected) {
                        state.selectedCard = action.payload;
                    }
                }
            )
            .addMatcher(
                apiSlice.endpoints.nextFuture1BMC.matchFulfilled,
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
