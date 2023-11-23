import { CVPCards } from "@/app/Interfaces";
import { createAppAsyncThunk } from "../../createAppAsyncThunk";
import { APIUpdateCard, APIfetchFuture1CVP, APIfetchFuture1CVPChat, PrefillFuture1CVP, APIResetFuture1CVP } from "../../apiCalls";

export const fetchCVPCardsfuture1 = createAppAsyncThunk(
    'Future1CVPSlice/fetchCVPCardsfuture1',
    async () => {
        try {
            const response = await APIfetchFuture1CVP();
            return response;
        } catch (error) {
            throw error;
        }
    }
);

export const fetchCVPCardsfuture1Chat = createAppAsyncThunk(
    'Future1CVPSlice/fetchCVPCardsfuture1Chat',
    async () => {
        try {
            const response = await APIfetchFuture1CVPChat();
            return response;
        } catch (error) {
            throw error;
        }
    }
);

export const updateCVPCardsfuture1 = createAppAsyncThunk(
    'Future1CVPSlice/updateCVPCardsfuture1',
    async (card: any) => {
        try {
            const response = await APIUpdateCard(card);
            return response;
        } catch (error) {
            throw error;
        }
    }
)

export const Future1CVPPrefill = createAppAsyncThunk(
    'Future1CVPSlice/Future1CVPPrefill',
    async (data: any) => {
        try {
            const response = await PrefillFuture1CVP(data);
            return response;
        } catch (error) {
            throw error;
        }
    }
)
export const Future1CVPReset = createAppAsyncThunk(
    'Future1CVPSlice/Future1CVPReset',
    async () => {
        try {
            const response = await APIResetFuture1CVP();
            return response;
        } catch (error) {
            throw error;
        }
    }
)

