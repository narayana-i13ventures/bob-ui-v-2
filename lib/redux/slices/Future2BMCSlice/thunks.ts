import { APIfetchFuture2BMC, APIFuture2BMCNextCard, APIUpdateCard, APIPrefillFuture2BMC, APIResetFuture2BMC } from "../../apiCalls";
import { createAppAsyncThunk } from "../../createAppAsyncThunk";

export const fetchBMCCardsfuture2 = createAppAsyncThunk(
    'Future2BMCSlice/fetchBMCCardsfuture2',
    async () => {
        try {
            const response = await APIfetchFuture2BMC();
            return response;
        } catch (error) {
            throw error;
        }
    }
);
export const fetchBMCCardsfuture2Chat = createAppAsyncThunk(
    'Future2BMCSlice/fetchBMCCardsfuture2Chat',
    async () => {
        try {
            const response = await APIfetchFuture2BMC();
            return response;
        } catch (error) {
            throw error;
        }
    }
);


export const updateBMCCardsfuture2 = createAppAsyncThunk(
    'Future2BMCSlice/updateBMCCardsfuture2',
    async (card: any) => {
        try {
            const response = await APIUpdateCard(card);
            return response;
        } catch (error) {
            throw error;
        }
    }
)

export const Future2BMCNextCard = createAppAsyncThunk(
    'Future2BMCSlice/Future2BMCNextCard',
    async (cardId: any) => {
        try {
            const response = await APIFuture2BMCNextCard(cardId);
            return response;
        } catch (error) {
            throw error;
        }
    }
)

export const Future2BMCPrefill = createAppAsyncThunk(
    'Future2BMCSlice/Future2BMCPrefill',
    async (data: any) => {
        try {
            const response = await APIPrefillFuture2BMC(data);
            return response;
        } catch (error) {
            throw error;
        }
    }
)
export const Future2BMCReset = createAppAsyncThunk(
    'Future2BMCSlice/Future2BMCReset',
    async () => {
        try {
            const response = await APIResetFuture2BMC();
            return response;
        } catch (error) {
            throw error;
        }
    }
)


