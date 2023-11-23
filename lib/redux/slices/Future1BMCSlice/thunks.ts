import { APIfetchFuture1BMC, APIFuture1BMCNextCard, APIUpdateCard, APIPrefillFuture1BMC, APIResetFuture1BMC } from "../../apiCalls";
import { createAppAsyncThunk } from "../../createAppAsyncThunk";

export const fetchBMCCardsfuture1 = createAppAsyncThunk(
    'Future1BMCSlice/fetchBMCCardsfuture1',
    async () => {
        try {
            const response = await APIfetchFuture1BMC();
            return response;
        } catch (error) {
            throw error;
        }
    }
);
export const fetchBMCCardsfuture1Chat = createAppAsyncThunk(
    'Future1BMCSlice/fetchBMCCardsfuture1Chat',
    async () => {
        try {
            const response = await APIfetchFuture1BMC();
            return response;
        } catch (error) {
            throw error;
        }
    }
);


export const updateBMCCardsfuture1 = createAppAsyncThunk(
    'Future1BMCSlice/updateBMCCardsfuture1',
    async (card: any) => {
        try {
            const response = await APIUpdateCard(card);
            return response;
        } catch (error) {
            throw error;
        }
    }
)

export const Future1BMCNextCard = createAppAsyncThunk(
    'Future1BMCSlice/Future1BMCNextCard',
    async (cardId: any) => {
        try {
            const response = await APIFuture1BMCNextCard(cardId);
            return response;
        } catch (error) {
            throw error;
        }
    }
)

export const Future1BMCPrefill = createAppAsyncThunk(
    'Future1BMCSlice/Future1BMCPrefill',
    async (data: any) => {
        try {
            const response = await APIPrefillFuture1BMC(data);
            return response;
        } catch (error) {
            throw error;
        }
    }
)
export const Future1BMCReset = createAppAsyncThunk(
    'Future1BMCSlice/Future1BMCReset',
    async () => {
        try {
            const response = await APIResetFuture1BMC();
            return response;
        } catch (error) {
            throw error;
        }
    }
)


