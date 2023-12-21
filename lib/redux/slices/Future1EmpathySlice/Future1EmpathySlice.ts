import { apiSlice } from "../../Api";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: any = {
    selectedCard: {
        cardCanvas: "Empathy",
        future: 1,
        cardNumber: 0,
        cardName: "Who are we Empathizing with?",
        selected: true,
        keyPoints: "",
        locked: false,
        loadingKeyPoints: false,
        chat: [],
        size: "full",
        labelHeading: "",
        label: [],
        surety: 0,
        userLock: false,
        shared: [],
        color: "#fff",
        comments: [],
        id: "655a8d0e03bce43fdecadec1",
    },
    canvasCompleted: false,
    canvasColors: {

    }
};

export const Future1EmpathySlice = createSlice({
    name: "Future1Empathy",
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
        setCanvasCompleted: (state, action) => {
            state.canvasCompleted = action.payload;
        },
    },
    extraReducers: (builder) => { },
});
