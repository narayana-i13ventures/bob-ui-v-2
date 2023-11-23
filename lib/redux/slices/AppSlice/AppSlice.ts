import { createSlice } from '@reduxjs/toolkit';

interface App {
    bobThinking: boolean;
    altPressed: boolean;
    ChatModalOpen: boolean;
    bobOpen: boolean;
    ThinkBeyondModal: boolean;
    darkTheme: boolean,
    messageModal: boolean,
    NotificationModal: boolean
}

const initialState: App = {
    bobThinking: false,
    altPressed: false,
    ChatModalOpen: false,
    bobOpen: false,
    ThinkBeyondModal: false,
    darkTheme: false,
    messageModal: false,
    NotificationModal: false
}

export const AppSlice = createSlice({
    name: 'App',
    initialState,
    reducers: {
        toggleBobThinking: (state, action) => {
            state.bobThinking = action.payload;
        },
        toggleAltPressed: (state, action) => {
            state.altPressed = action.payload;
        },
        toggleBobOpen: (state, action) => {
            state.bobOpen = action.payload;
        },
        toggleThinkBeyondModal: (state, action) => {
            state.ThinkBeyondModal = action.payload;
        },
        toggleChatModal: (state, action) => {
            state.ChatModalOpen = action.payload;
        },
        toggleMessageModal: (state, action) => {
            state.messageModal = action.payload;
        },
        toggleNotificationModal: (state, action) => {
            state.NotificationModal = action.payload;
        },
    },
});