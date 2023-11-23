/* Core */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { fetchBMCCardsfuture1, fetchBMCCardsfuture1Chat, Future1BMCNextCard, Future1BMCPrefill, Future1BMCReset, updateBMCCardsfuture1 } from './thunks';

interface BMC {
    data: any[],
    loading: boolean,
    error: string | undefined,
    conversation: any[],
}
const initialState: BMC = {
    data: [],
    loading: true,
    error: '',
    conversation: []
}

export const Future1BMCSlice = createSlice({
    name: 'Future1BMCSlice',
    initialState,
    reducers: {
        updateChat(state, action: PayloadAction<string>) {
            const selectedCardIndex = state.data.findIndex((c) => c.selected);
            if (selectedCardIndex !== -1) {
                const updatedBMCCard: any = { ...state.data[selectedCardIndex] };
                if (updatedBMCCard?.chat?.length > 0) {
                    const lastMessage = updatedBMCCard?.chat?.[updatedBMCCard?.chat?.length - 1];
                    lastMessage.content += action.payload;
                }
                state.data[selectedCardIndex].chat = updatedBMCCard.chat;
                return state;
            }
            return state;
        },
        updateKeyPoints: (state, action: PayloadAction<string>) => {
            const selectedCardIndex = state.data.findIndex((c) => c.selected);
            state.data[selectedCardIndex].loadingKeyPoints = false;
            if (selectedCardIndex !== -1) {
                const updatedBMCCard = { ...state.data[selectedCardIndex] };
                updatedBMCCard.keyPoints += action.payload;
                state.data[selectedCardIndex] = updatedBMCCard;
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
            .addCase(fetchBMCCardsfuture1.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchBMCCardsfuture1.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchBMCCardsfuture1.rejected, (state) => {
                state.loading = false;
            })
            .addCase(updateBMCCardsfuture1.fulfilled, (state, action) => {
                state.data = state?.data.map((card) =>
                    card.id === action.payload.id ? action.payload : card
                );
            })
            .addCase(Future1BMCNextCard.fulfilled, (state, action) => {
                const response = action.payload;
                state.data = state.data.map((card) =>
                    card.id === response[0]?.id ? response[0] : card.id === response[1]?.id ? response[1] : card
                );
            })
            .addCase(Future1BMCPrefill.fulfilled, (state, action) => {
                state.data = action.payload;
            })
            .addCase(fetchBMCCardsfuture1Chat.fulfilled, (state, action) => {
                state.conversation = action.payload;
            })
            .addCase(Future1BMCReset.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(Future1BMCReset.rejected, (state, action) => {
                state.loading = false;
            })
            .addCase(Future1BMCReset.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
    },
})
