import { PaletteMode } from "@mui/material";
import { createSlice } from "@reduxjs/toolkit";

interface AppState {
    mode: PaletteMode;
    BobOpen: boolean;
    CanvasCardModalOpen: boolean;
    BobPrefillingOpen: boolean;
    ThinkBeyondModalOpen: boolean;
    ThinkBeyondSettingsOpen: boolean;
    leftSidebarOpen: boolean;
    rightSidebarOpen: boolean;
    bobThinking: boolean;
    NotificationMenu: boolean;
    profileMenu: boolean;
    NewProjectModal: boolean;
    projectShareModal: boolean;
    projectShareSearchOpen: boolean;
    confirmationModalOpen: boolean;
    globalSnackBar: any;
    activeProfileTab: String;
    personaConfirmationModal: boolean;
}

const initialState: AppState = {
    mode: "light",
    BobOpen: false,
    CanvasCardModalOpen: false,
    ThinkBeyondModalOpen: false,
    ThinkBeyondSettingsOpen: false,
    BobPrefillingOpen: false,
    leftSidebarOpen: false,
    rightSidebarOpen: false,
    bobThinking: false,
    NotificationMenu: false,
    profileMenu: false,
    NewProjectModal: false,
    projectShareModal: false,
    projectShareSearchOpen: false,
    confirmationModalOpen: false,
    globalSnackBar: {
        open: false,
        content: "",
    },
    activeProfileTab: "profile",
    personaConfirmationModal: false,
};

export const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        toggleTheme: (state) => {
            state.mode = state.mode === "dark" ? "light" : "dark";
        },

        toggleBobOpen: (state, action) => {
            state.BobOpen = action.payload;
        },

        toggleCanvasCardModal: (state, action) => {
            state.CanvasCardModalOpen = action.payload;
        },

        toggleBobPrefillingOpen: (state, action) => {
            state.BobPrefillingOpen = action.payload;
        },
        toggleThinkBeyondModalOpen: (state, action) => {
            state.ThinkBeyondModalOpen = action.payload;
        },

        toggleThinkBeyondSettingsOpen: (state, action) => {
            state.ThinkBeyondSettingsOpen = action.payload;
        },

        toggleLeftSidebar: (state, action) => {
            state.leftSidebarOpen = action.payload;
        },

        toggleRightSidebar: (state, action) => {
            state.rightSidebarOpen = action.payload;
        },
        toggleBobThinking: (state, action) => {
            state.bobThinking = action.payload;
        },
        toggleNotificationMenu: (state, action) => {
            state.NotificationMenu = action.payload;
        },
        toggleProfileMenu: (state, action) => {
            state.profileMenu = action.payload;
        },
        toggleNewProjectModal: (state, action) => {
            state.NewProjectModal = action.payload;
        },
        toggleProjectShareModal: (state, action) => {
            state.projectShareModal = action.payload;
        },
        toggleProjectShareSearchOpen: (state, action) => {
            state.projectShareSearchOpen = action.payload;
        },
        setGlobalSnackBar: (state, action) => {
            state.globalSnackBar = action.payload;
        },
        toggleConfirmationModalOpen: (state, action) => {
            state.confirmationModalOpen = action.payload;
        },
        toggleActiveProfileTab: (state, action) => {
            state.activeProfileTab = action.payload;
        },
        togglePersonaConfirmationModal: (state, action) => {
            state.personaConfirmationModal = action.payload;
        }
    },
});
