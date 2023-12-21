import { createSlice } from '@reduxjs/toolkit';
import { apiSlice, usePrefillFuture1BMCMutation } from '../../Api';

const initialState: any = {
    notifications: [{
        id: 1,
        content: 'This is Test Notification',
        read: false,
        action: ''
    }],
};

export const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        createNotification: (state, action) => {
            state.notifications.push({
                id: state.notifications.length + 1,
                content: action.payload.content,
                read: false,
                action: action.payload.action,
            });
        },
        deleteNotification: (state, action) => {
            const notificationIdToDelete = action.payload;
            state.notifications = state.notifications.filter(
                (notification: any) => notification.id !== notificationIdToDelete
            );
        },
        updateNotification: (state, action) => {
            const notificationIdToDelete = action.payload;
            state.notifications = state.notifications.map((notification: any) => {
                if (notification.id === notificationIdToDelete) {
                    notification.read = true;
                }
            });
        },
        markAllRead: (state, action) => {
            state.notifications.forEach((notification: any) => {
                notification.read = true;
            });
        },
        clearAll: (state, action) => {
            state.notifications = [];
        },
    },
    extraReducers(builder) {
        builder.addMatcher(apiSlice.endpoints.prefillFuture1BMC.matchFulfilled, (state, action) => {
            state.notifications.push({
                id: state.notifications.length + 1,
                content: 'You Have Unlocked Future 1 BMC Canvas',
                read: false,
                action: 'Future1/BMC',
            });
        })
    },
});

export const {
    createNotification,
    deleteNotification,
    markAllRead,
    clearAll,
} = notificationSlice.actions;

export default notificationSlice.reducer;
