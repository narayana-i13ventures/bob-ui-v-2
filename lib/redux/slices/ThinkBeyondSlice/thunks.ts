import { createAppAsyncThunk } from "../../createAppAsyncThunk";
import {
    APIResetThinkBeyond,
    APIThinkBeyondNextCard,
    APIfetchThinkBeyondCards,
    APIupdateThinkBeyondCard,
} from "../../apiCalls";

export const fetchThinkBeyond = createAppAsyncThunk(
    "thinkBeyond/fetchThinkBeyond",
    async () => {
        try {
            const response = await APIfetchThinkBeyondCards();
            return response;
        } catch (error) {
            throw error;
        }
    }
);

export const ThinkBeyondReset = createAppAsyncThunk(
    "thinkBeyond/ThinkBeyondReset",
    async () => {
        try {
            const response = await APIResetThinkBeyond();
            return response;
        } catch (error) {
            throw error;
        }
    }
);

export const updateThinkBeyond = createAppAsyncThunk(
    "thinkBeyond/updateThinkBeyond",
    async (data: any) => {
        try {
            const response = await APIupdateThinkBeyondCard(data);
            return response;
        } catch (error) {
            throw error;
        }
    }
);

export const nextCardThinkBeyond = createAppAsyncThunk(
    "thinkBeyond/nextCardThinkBeyond",
    async (cardId: any) => {
        try {
            const response = await APIThinkBeyondNextCard(cardId);
            return response;
        } catch (error) {
            throw error;
        }
    }
);
