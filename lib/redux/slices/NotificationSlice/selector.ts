import { createSelector } from 'reselect';
import type { ReduxState } from '@/lib/redux';

// Selector to get all notifications
export const selectNotifications = (state: ReduxState) =>
    state.notifications.notifications;

// Selector to get all unread notifications
export const selectUnreadNotifications = createSelector(
    [selectNotifications],
    (notifications) => {
        return notifications.filter((notification: any) => !notification.read);
    }
);

