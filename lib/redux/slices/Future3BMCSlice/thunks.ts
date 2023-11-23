import { APIfetchFuture3BMC, APIFuture3BMCNextCard, APIUpdateCard, APIPrefillFuture3BMC, APIResetFuture3BMC } from "../../apiCalls";
import { createAppAsyncThunk } from "../../createAppAsyncThunk";

export const fetchBMCCardsfuture3 = createAppAsyncThunk(
    'Future3BMCSlice/fetchBMCCardsfuture3',
    async () => {
        try {
            const response = await APIfetchFuture3BMC();
            return response;
        } catch (error) {
            throw error;
        }
    }
);
export const fetchBMCCardsfuture3Chat = createAppAsyncThunk(
    'Future3BMCSlice/fetchBMCCardsfuture3Chat',
    async () => {
        try {
            const response = await APIfetchFuture3BMC();
            return response;
        } catch (error) {
            throw error;
        }
    }
);


export const updateBMCCardsfuture3 = createAppAsyncThunk(
    'Future3BMCSlice/updateBMCCardsfuture3',
    async (card: any) => {
        try {
            const response = await APIUpdateCard(card);
            return response;
        } catch (error) {
            throw error;
        }
    }
)

export const Future3BMCNextCard = createAppAsyncThunk(
    'Future3BMCSlice/Future3BMCNextCard',
    async (cardId: any) => {
        try {
            const response = await APIFuture3BMCNextCard(cardId);
            return response;
        } catch (error) {
            throw error;
        }
    }
)

export const Future3BMCPrefill = createAppAsyncThunk(
    'Future3BMCSlice/Future3BMCPrefill',
    async (data: any) => {
        try {
            const response = await APIPrefillFuture3BMC(data);
            return response;
        } catch (error) {
            throw error;
        }
    }
)
export const Future3BMCReset = createAppAsyncThunk(
    'Future3BMCSlice/Future3BMCReset',
    async () => {
        try {
            const response = await APIResetFuture3BMC();
            return response;
        } catch (error) {
            throw error;
        }
    }
)


