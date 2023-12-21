import type { ReduxState } from "@/lib/redux";

export const selectedThinkBeyondCard = (state: ReduxState) =>
    state?.ThinkBeyond?.selectedCard;


export const selectBobMessages = (state: ReduxState) => state?.ThinkBeyond?.BobMessages;