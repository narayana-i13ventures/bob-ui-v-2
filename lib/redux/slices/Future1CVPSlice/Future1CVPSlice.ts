import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import {
    fetchCVPCardsfuture1,
    fetchCVPCardsfuture1Chat,
    Future1CVPPrefill,
    Future1CVPReset,
    updateCVPCardsfuture1,
} from "./thunks";

interface CVP {
    data: any[];
    loading: boolean;
    error: string | undefined;
    conversation: any[];
}
const initialState: CVP = {
    data: [],
    loading: true,
    error: "",
    conversation: [],
};

export const Future1CVPSlice = createSlice({
    name: "Future1CVPSlice",
    initialState,
    reducers: {
        updateChat(state, action: PayloadAction<string>) {
            const selectedCardIndex = state.data.findIndex((c) => c.selected);
            if (selectedCardIndex !== -1) {
                const updatedCVPCard: any = { ...state.data[selectedCardIndex] };
                if (updatedCVPCard?.chat?.length > 0) {
                    const lastMessage = updatedCVPCard?.chat?.[updatedCVPCard?.chat?.length - 1];
                    lastMessage.content += action.payload;
                }
                state.data[selectedCardIndex].chat = updatedCVPCard.chat;
                return state;
            }
            return state;
        },
        updateKeyPoints: (state, action: PayloadAction<string>) => {
            const selectedCardIndex = state.data.findIndex((c) => c.selected);
            state.data[selectedCardIndex].loadingKeyPoints = false;
            if (selectedCardIndex !== -1) {
                const updatedCVPCard = { ...state.data[selectedCardIndex] };
                updatedCVPCard.keyPoints += action.payload;
                state.data[selectedCardIndex] = updatedCVPCard;
            }
        },
        updateSingleById: (state, action: PayloadAction<any>) => {
            const card: any = action.payload;
            const cardIndex = state.data.findIndex((singleCard) => singleCard.id === card?.id);
            if (cardIndex !== -1) {
                const updatedCard = {
                    ...state.data[cardIndex],
                    ...card,
                };
                state.data[cardIndex] = updatedCard;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCVPCardsfuture1.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCVPCardsfuture1.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchCVPCardsfuture1.rejected, (state) => {
                state.loading = false;
            })
            .addCase(updateCVPCardsfuture1.fulfilled, (state, action) => {
                state.data = state?.data.map((card) =>
                    card.id === action.payload.id ? action.payload : card
                );
            })
            .addCase(fetchCVPCardsfuture1Chat.fulfilled, (state, action) => {
                state.conversation = action.payload;
            })
            .addCase(Future1CVPPrefill.fulfilled, (state, action) => {
                state.data = action.payload;
            })
            .addCase(Future1CVPReset.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(Future1CVPReset.rejected, (state, action) => {
                state.loading = false;
            })
            .addCase(Future1CVPReset.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            });
    },
});
