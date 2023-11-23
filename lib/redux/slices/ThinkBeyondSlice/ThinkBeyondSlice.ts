import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { fetchThinkBeyond, nextCardThinkBeyond, ThinkBeyondReset, updateThinkBeyond } from './thunks';

interface thinkBeyond {
    data: any[],
    loading: Boolean,
    error: string | undefined,
    cardLoading: boolean
}
const initialState: thinkBeyond = {
    data: [],
    loading: true,
    error: '',
    cardLoading: false
}

export const thinkBeyondSlice = createSlice({
    name: 'thinkBeyond',
    initialState,
    reducers: {
        updateText: (state, action: PayloadAction<{ heading: string; text: string }>) => {
            const { heading, text } = action.payload;
            const selectedCardIndex = state.data.findIndex((c) => c.selected);

            if (selectedCardIndex !== -1) {
                state.data[selectedCardIndex] = {
                    ...state.data[selectedCardIndex],
                    started: true,
                    cardInfo: state?.data?.[selectedCardIndex]?.cardInfo?.map((info: any) => {
                        if (info.heading === heading) {
                            return { ...info, text };
                        }
                        return info;
                    }),
                };

                const anyEmpty = state?.data?.[selectedCardIndex]?.cardInfo?.some((info: any) => info.text === '');
                state.data[selectedCardIndex].complete = !anyEmpty;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchThinkBeyond.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchThinkBeyond.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchThinkBeyond.rejected, (state, action) => {
                state.loading = false;
                state.error = action?.error?.message;
            })
            .addCase(updateThinkBeyond.fulfilled, (state, action) => {
                state.data = state?.data.map((card) =>
                    card.id === action.payload.id ? action.payload : card
                );
            })
            .addCase(nextCardThinkBeyond.pending, (state) => {
                state.cardLoading = true
            })
            .addCase(nextCardThinkBeyond.fulfilled, (state, action) => {
                state.cardLoading = false;
                const response = action.payload;
                state.data = state.data.map((card) =>
                    card.id === response[0]?.id ? response[0] : card.id === response[1]?.id ? response[1] : card
                );
            })
            .addCase(nextCardThinkBeyond.rejected, (state) => {
                state.cardLoading = false
            })
            .addCase(ThinkBeyondReset.pending, (state) => {
                state.loading = true
            })
            .addCase(ThinkBeyondReset.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload
            })
            .addCase(ThinkBeyondReset.rejected, (state) => {
                state.loading = false
            })
    },
})
