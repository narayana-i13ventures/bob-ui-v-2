import type { ReduxState } from "@/lib/redux";

export const selectedFuture1Empathy = (state: ReduxState) =>
    state?.Future1EMpathy?.selectedCard;


export const selectFuture1EmpathyCompleted = (state: ReduxState) => state?.Future1EMpathy?.canvasCompleted;