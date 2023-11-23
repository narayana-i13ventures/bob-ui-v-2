import type { ReduxState } from '@/lib/redux'

export const selectChatBotModal = (state: ReduxState) => state.App.ChatModalOpen;
export const selectThinkBeyondModal = (state: ReduxState) => state.App.ThinkBeyondModal;
export const selectAltPressed = (state: ReduxState) => state.App.altPressed;
export const selectBobOpen = (state: ReduxState) => state.App.bobOpen;
export const selectBobThinking = (state: ReduxState) => state.App.bobThinking;
export const selectDarkTheme = (state: ReduxState) => state.App.darkTheme;
export const selectMessageModal = (state: ReduxState) => state.App.messageModal;
export const selectNotificationModal = (state: ReduxState) => state.App.NotificationModal;


